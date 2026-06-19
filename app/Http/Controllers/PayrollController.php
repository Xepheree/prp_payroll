<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        return Inertia::render('payroll/index', [
            'payrolls' => Payroll::all(),
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

                PayrollItem::create([
                    'payroll_id' => $payroll->id,
                    'employee_id' => $employee->id,

                    'daily_rate' => $employee->rate,
                    'trip_rate' => $employee->trip_rate,

                    'days_worked' => 0,
                    'work_hours' => 0,
                    'overtime_hours' => 0,

                    'delivery_count' => 0,

                    'basic_pay' => 0,
                    'trip_pay' => 0,
                    'overtime_pay' => 0,

                    'deductions' => 0,

                    'gross_pay' => 0,
                    'net_pay' => 0,
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
}
