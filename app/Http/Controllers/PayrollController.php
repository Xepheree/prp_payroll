<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Payroll;
use App\Models\PayrollItem;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        return Inertia::render('payroll/index', [
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
            ])->findOrFail(
                $validated['attendance_id']
            );

            $payroll = Payroll::create([
                'attendance_id' => $attendance->id,
                'start_date' => $attendance->period_start,
                'end_date' => $attendance->period_end,
                'status' => 'draft',
            ]);

            $employees = $attendance->items
                ->groupBy('employee_id');

            foreach ($employees as $employeeItems) {

                $employee = $employeeItems
                    ->first()
                    ->employee;

                $deliveryCount = Trip::whereBetween(
                    'trip_date',
                    [
                        $attendance->period_start,
                        $attendance->period_end,
                    ]
                )
                    ->where('trip_type', 'deliver')
                    ->where(function ($query) use ($employee) {

                        $query->where(
                            'driver_id',
                            $employee->id
                        )
                            ->orWhere(
                                'helper_id',
                                $employee->id
                            );
                    })
                    ->count();
                /*
            |--------------------------------------------------------------------------
            | Attendance Computation
            |--------------------------------------------------------------------------
            */

                $daysWorked = 0;
                $workHours = 0;
                $overtimeHours = 0;

                foreach ($employeeItems as $item) {

                    $hours = $item->work_hours;

                    // Days Worked
                    if ($hours >= 8) {
                        $daysWorked += 1;
                    } elseif ($hours > 0) {
                        $daysWorked += $hours / 8;
                    }

                    // Regular Hours (max 8/day)
                    $workHours += min(8, $hours);

                    // Overtime Hours
                    $overtimeHours += max(
                        0,
                        $hours - 8
                    );
                }

                /*
            |--------------------------------------------------------------------------
            | Payroll Computation
            |--------------------------------------------------------------------------
            */


                $basicPay =
                    $daysWorked *
                    $employee->rate;

                $tripPay =
                    $deliveryCount *
                    ($employee->trip_rate ?? 0);

                $overtimePay =
                    $overtimeHours *
                    $employee->ot_rate;

                $deductions = 0;

                $grossPay =
                    $basicPay +
                    $tripPay +
                    $overtimePay;

                $netPay =
                    ($grossPay + $tripPay) -
                    $deductions;

                /*
            |--------------------------------------------------------------------------
            | Payroll Item Snapshot
            |--------------------------------------------------------------------------
            */

                PayrollItem::create([
                    'payroll_id' => $payroll->id,
                    'employee_id' => $employee->id,

                    'daily_rate' => $employee->rate,
                    'trip_rate' => $employee->trip_rate,

                    'days_worked' => round($daysWorked, 2),
                    'work_hours' => $workHours,
                    'overtime_hours' => $overtimeHours,

                    'delivery_count' => $deliveryCount,

                    'basic_pay' => $basicPay,
                    'trip_pay' => $tripPay,
                    'overtime_pay' => $overtimePay,

                    'deductions' => $deductions,

                    'gross_pay' => $grossPay,
                    'net_pay' => $netPay,
                ]);
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
            ]
        );
    }
}
