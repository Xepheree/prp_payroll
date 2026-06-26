<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Deduction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeductionController extends Controller
{
    public function index()
    {
        return Inertia::render('deductions/index', [
            'deductions' => Deduction::with('employee')
                ->latest('date')
                ->get(),

            'employees' => Employee::where(
                'status',
                'active'
            )->get(),
            'breadcrumbs' => request('from') === 'payroll'
                ? [
                    ['title' => 'Payroll', 'href' => '/payroll'],
                    ['title' => 'Deductions', 'href' => '/deductions?from=payroll'],
                ]
                : [
                    ['title' => 'Outstanding Balances', 'href' => '/obs'],
                    ['title' => 'Deductions', 'href' => '/deductions?from=obs'],
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
}
