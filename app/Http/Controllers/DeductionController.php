<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Deduction;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EmployeeTransaction;


class DeductionController extends Controller
{
    public function index()
    {
        $deductions = Deduction::with([
            'employee',
            'payroll',
        ])
            ->latest('created_at')
            ->get()
            ->map(function ($deduction) {

                $deduction->can_add_to_balance =
                    $deduction->payroll_id === null &&
                    Payroll::where('status', 'finalized')
                    ->whereDate(
                        'start_date',
                        '<=',
                        $deduction->date
                    )
                    ->whereDate(
                        'end_date',
                        '>=',
                        $deduction->date
                    )
                    ->exists();

                return $deduction;
            });

        return Inertia::render('deductions/index', [
            'deductions' => $deductions,

            'employees' => Employee::where(
                'status',
                'active'
            )->get(),

            'breadcrumbs' => request('from') === 'payroll'
                ? [
                    [
                        'title' => 'Payroll',
                        'href' => '/payroll',
                    ],
                    [
                        'title' => 'Deductions',
                        'href' => '/deductions?from=payroll',
                    ],
                ]
                : [
                    [
                        'title' => 'Outstanding Balances',
                        'href' => '/obs',
                    ],
                    [
                        'title' => 'Deductions',
                        'href' => '/deductions?from=obs',
                    ],
                ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => [
                'required',
                'exists:employees,id',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'type' => [
                'required',
                'in:cash_advance,tax,benefits,others',
            ],

            'date' => [
                'required',
                'date',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],
        ]);

        Deduction::create($validated);

        return redirect()
            ->route('deductions.index')
            ->with(
                'success',
                'Deduction created successfully.'
            );
    }

    public function update(
        Request $request,
        Deduction $deduction
    ) {

        if ($deduction->payroll_id !== null) {
            return back()->withErrors([
                'deduction' => 'This deduction has already been included in a payroll and can no longer be modified.',
            ]);
        }


        $validated = $request->validate([
            'employee_id' => [
                'required',
                'exists:employees,id',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'type' => [
                'required',
                'in:cash_advance,tax,benefits,others',
            ],

            'date' => [
                'required',
                'date',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],
        ]);

        $deduction->update($validated);

        return redirect()
            ->back()
            ->with(
                'success',
                'Deduction updated successfully.'
            );
    }

    public function destroy(Deduction $deduction)
    {
        if ($deduction->payroll_id !== null) {
            return back()->withErrors([
                'deduction' => 'This deduction has already been included in a payroll and can no longer be deleted.',
            ]);
        }

        $deduction->delete();

        return back()->with(
            'success',
            'Deduction deleted successfully.'
        );
    }


    public function addToBalance(Deduction $deduction)
    {
        if ($deduction->added_to_balance) {
            return back()->withErrors([
                'deduction' => 'This deduction has already been added to the employee balance.',
            ]);
        }

        $coveredByPayroll = Payroll::where('status', 'finalized')
            ->whereDate('start_date', '<=', $deduction->date)
            ->whereDate('end_date', '>=', $deduction->date)
            ->exists();

        $filingStatus = $coveredByPayroll
            ? 'Late Filing'
            : 'Early Filing';

        EmployeeTransaction::create([
            'employee_id' => $deduction->employee_id,

            'type' => 'deduction',

            'amount' => $deduction->amount,

            'description' => sprintf(
                '%s - %s',
                $filingStatus,
                str_replace('_', ' ', $deduction->type)
            ),

            'deduction_id' => $deduction->id,
        ]);

        $deduction->update([
            'added_to_balance' => true,
            'added_to_balance_at' => now(),
        ]);

        return back()->with(
            'success',
            'Deduction added to employee transaction history.'
        );
    }
}
