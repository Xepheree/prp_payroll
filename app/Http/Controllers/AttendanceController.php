<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Inertia\Inertia;
use App\Models\Attendance;
use App\Models\AttendanceItem;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{

public function index(Request $request)
{
    $attendances = Attendance::query();

    if ($request->filled('start_date')) {
        $attendances->whereDate(
            'period_start',
            '>=',
            $request->start_date
        );
    }

    if ($request->filled('end_date')) {
        $attendances->whereDate(
            'period_end',
            '<=',
            $request->end_date
        );
    }

    return Inertia::render('attendance/index', [
        'breadcrumbs' => [
            ['title' => 'Attendance', 'href' => '/attendance'],
        ],

        'employees' => Employee::where(
            'status',
            'active'
        )->get(),

        'attendances' => $attendances
            ->withCount([
                'items as employees_count' => function ($query) {
                    $query->select(DB::raw('count(distinct employee_id)'));
                }
            ])
            ->latest()
            ->get(),

        'filters' => [
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ],
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'period_start' => ['required', 'date'],
            'period_end' => ['required', 'date', 'after_or_equal:period_start'],
            'employee_ids' => ['required', 'array', 'min:1'],
            'employee_ids.*' => ['exists:employees,id'],
        ]);

        $overlappingAttendance = Attendance::where(
            'period_start',
            '<=',
            $validated['period_end']
        )
            ->where(
                'period_end',
                '>=',
                $validated['period_start']
            )
            ->exists();

        if ($overlappingAttendance) {
            return back()->withErrors([
                'period_start' => 'Attendance period overlaps an existing attendance.',
            ]);
        }

        DB::transaction(function () use ($validated) {

            $attendance = Attendance::create([
                'period_start' => $validated['period_start'],
                'period_end' => $validated['period_end'],
            ]);

            $period = CarbonPeriod::create(
                $validated['period_start'],
                $validated['period_end']
            );

            $items = [];

            foreach ($validated['employee_ids'] as $employeeId) {

                foreach ($period as $date) {

                    $items[] = [
                        'attendance_id' => $attendance->id,
                        'employee_id' => $employeeId,
                        'attendance_date' => $date->format('Y-m-d'),
                        'work_hours' => 0,
                        'overtime_hours' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            AttendanceItem::insert($items);
        });

        return redirect()
            ->back()
            ->with(
                'success',
                'Attendance created successfully.'
            );
    }

    public function show(Attendance $attendance)
    {
        $attendance->load([
            'items.employee',
            'payroll',
        ]);

        $dates = collect(
            CarbonPeriod::create(
                $attendance->period_start,
                $attendance->period_end
            )
        )->map(
            fn(Carbon $date) => $date->format('Y-m-d')
        )->values();

        $employees = $attendance->items
            ->groupBy('employee_id')
            ->map(function ($items) {

                $employee = $items->first()->employee;

                return [
                    'id' => $employee->id,
                    'name' => $employee->name,
                    'designation' => $employee->designation,

                    'attendance' => $items
                        ->keyBy('attendance_date')
                        ->map(fn($item) => [
                            'id' => $item->id,
                            'work_hours' => $item->work_hours,
                            'overtime_hours' => $item->overtime_hours,
                        ]),
                ];
            })
            ->values();

        return Inertia::render('attendance/show', [
            'attendance' => $attendance,
            'dates' => $dates,
            'employees' => $employees,
            'is_locked' =>
            $attendance->payroll &&
                $attendance->payroll->status === 'finalized',
            'breadcrumbs' => [
                [
                    'title' => 'Attendance',
                    'href' => '/attendance',
                ],
                [
                    'title' => Carbon::parse($attendance->period_start)->format('M d')
                        . ' → ' .
                        Carbon::parse($attendance->period_end)->format('M d'),
                ],
            ],
        ]);
    }

    public function update(
        Request $request,
        Attendance $attendance
    ) {
        $validated = $request->validate([
            'items' => ['required', 'array'],
        ]);

        foreach ($validated['items'] as $itemId => $hours) {

            AttendanceItem::where(
                'id',
                $itemId
            )->update([
                'work_hours' => (float) ($hours ?: 0),
            ]);
        }

        return back()->with(
            'success',
            'Attendance updated successfully.'
        );
    }
}
