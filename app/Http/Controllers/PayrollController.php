<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Payroll;
use App\Actions\Payroll\PayrollCalculator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        return Inertia::render('payroll/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Payroll',
                    'href' => '/payroll',
                ],
            ],

            'payrolls' => Payroll::latest()->get(),

            'availableAttendances' => Attendance::doesntHave('payroll')
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

        $attendance = Attendance::findOrFail(
            $validated['attendance_id']
        );

        Payroll::create([
            'attendance_id' => $attendance->id,
            'start_date' => $attendance->period_start,
            'end_date' => $attendance->period_end,
            'status' => 'draft',
        ]);

        return redirect()
            ->route('payroll.index')
            ->with(
                'success',
                'Payroll draft created successfully.'
            );
    }

    public function show(
        Payroll $payroll,
        PayrollCalculator $calculator
    ) {
        if ($payroll->status === 'draft') {

            $preview = $calculator->preview($payroll);

            return Inertia::render(
                'payroll/show',
                [
                    'payroll' => $payroll,
                    'items' => $preview['items'],
                    'summary' => $preview['summary'],
                ]
            );
        }

        $payroll->load([
            'items.employee',
            'attendance',
        ]);

        return Inertia::render(
            'payroll/show',
            [
                'payroll' => $payroll,
                'items' => $payroll->items,
            ]
        );
    }

    public function finalize(
        Payroll $payroll,
        PayrollCalculator $calculator
    ) {
        if ($payroll->status === 'finalized') {
            return back()->withErrors([
                'payroll' => 'Payroll has already been finalized.',
            ]);
        }

        DB::transaction(function () use (
            $payroll,
            $calculator
        ) {

            $calculator->finalize($payroll);
        });

        return back()->with(
            'success',
            'Payroll finalized successfully.'
        );
    }
}
