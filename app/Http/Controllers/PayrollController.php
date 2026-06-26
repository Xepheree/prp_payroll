<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Deduction;
use App\Models\Payroll;
use App\Models\PayrollItem;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        return Inertia::render('payroll/index', [
            'breadcrumbs' => [
                ['title' => 'Payroll', 'href' => '/payroll'],
            ],
            'payrolls' => Payroll::latest()->get(),
            'availableAttendances' => Attendance::where(
                'status',
                'published'
            )
                ->whereDoesntHave('payroll')
                ->withCount([
                    'items as employees_count' => function ($query) {
                        $query->selectRaw(
                            'count(distinct employee_id)'
                        );
                    },
                ])
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'attendance_id' => [
                'required',
                'exists:attendances,id',
            ],
        ]);

        DB::transaction(function () use ($validated) {

            $attendance = Attendance::with([
                'items.employee',
            ])->findOrFail($validated['attendance_id']);

            $payroll = Payroll::create([
                'attendance_id' => $attendance->id,
                'start_date'    => $attendance->period_start,
                'end_date'      => $attendance->period_end,
                'status'        => 'draft',
            ]);

            $employees = $attendance->items->groupBy('employee_id');

            foreach ($employees as $employeeItems) {

                $employee = $employeeItems->first()->employee;

                /*
            |--------------------------------------------------------------------------
            | Attendance Summary
            |--------------------------------------------------------------------------
            */

                $daysWorked = 0;
                $workHours = 0;
                $overtimeHours = 0;

                foreach ($employeeItems as $item) {

                    $hours = $item->work_hours;

                    if ($hours >= 8) {
                        $daysWorked += 1;
                    } elseif ($hours > 0) {
                        $daysWorked += $hours / 8;
                    }

                    $workHours += min(8, $hours);

                    $overtimeHours += max(0, $hours - 8);
                }

                /*
            |--------------------------------------------------------------------------
            | Trips
            |--------------------------------------------------------------------------
            */

                $deliveries = Trip::whereNull('payroll_id')
                    ->whereBetween('trip_date', [
                        $attendance->period_start,
                        $attendance->period_end,
                    ])
                    ->where('trip_type', 'deliver')
                    ->where(function ($query) use ($employee) {
                        $query->where('driver_id', $employee->id)
                            ->orWhere('helper_id', $employee->id);
                    })
                    ->get();

                $deliveryCount = $deliveries->count();

                /*
            |--------------------------------------------------------------------------
            | Deductions
            |--------------------------------------------------------------------------
            */

                $employeeDeductions = Deduction::whereNull('payroll_id')
                    ->where('employee_id', $employee->id)
                    ->whereBetween('date', [
                        $attendance->period_start,
                        $attendance->period_end,
                    ])
                    ->get();

                $deductions = $employeeDeductions->sum('amount');

                /*
            |--------------------------------------------------------------------------
            | Payroll Computation
            |--------------------------------------------------------------------------
            */

                $basicPay = $daysWorked * $employee->rate;

                $tripPay = $deliveryCount * ($employee->trip_rate ?? 0);

                $overtimePay = $overtimeHours * $employee->ot_rate;

                $grossPay = $basicPay + $tripPay + $overtimePay;

                $netPay = $grossPay - $deductions;

                /*
            |--------------------------------------------------------------------------
            | Payroll Snapshot
            |--------------------------------------------------------------------------
            */

                PayrollItem::create([
                    'payroll_id'      => $payroll->id,
                    'employee_id'     => $employee->id,

                    'daily_rate'      => $employee->rate,
                    'trip_rate'       => $employee->trip_rate,

                    'days_worked'     => round($daysWorked, 2),
                    'work_hours'      => $workHours,
                    'overtime_hours'  => $overtimeHours,

                    'delivery_count'  => $deliveryCount,

                    'basic_pay'       => $basicPay,
                    'trip_pay'        => $tripPay,
                    'overtime_pay'    => $overtimePay,

                    'deductions'      => $deductions,

                    'gross_pay'       => $grossPay,
                    'net_pay'         => $netPay,
                ]);

                /*
            |--------------------------------------------------------------------------
            | Lock Trips & Deductions
            |--------------------------------------------------------------------------
            */

                if ($deliveries->isNotEmpty()) {
                    Trip::whereIn('id', $deliveries->pluck('id'))
                        ->update([
                            'payroll_id' => $payroll->id,
                        ]);
                }

                if ($employeeDeductions->isNotEmpty()) {
                    Deduction::whereIn('id', $employeeDeductions->pluck('id'))
                        ->update([
                            'payroll_id' => $payroll->id,
                        ]);
                }
            }
        });

        return redirect()
            ->route('payroll.index')
            ->with(
                'success',
                'Payroll created successfully.'
            );
    }

    public function show(Payroll $payroll)
    {
        $payroll->load([
            'items.employee',
            'attendance',
        ]);

        return Inertia::render(
            'payroll/show',
            [
                'payroll' => $payroll,
                'breadcrumbs' => [
                    [
                        'title' => 'Payroll',
                        'href' => '/payroll',
                    ],
                    [
                        'title' => Carbon::parse($payroll->period_start)->format('M d')
                            . ' → ' .
                            Carbon::parse($payroll->period_end)->format('M d'),
                    ],
                ],
            ],

        );
    }
}
