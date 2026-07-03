<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeTransaction;
use App\Models\PaymentVoucher;
use App\Models\PaymentVoucherItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentVoucherController extends Controller
{
    public function create()
    {
        $employees = Employee::with('transactions')
            ->get()
            ->map(function ($employee) {

                $employee->outstanding = $employee
                    ->transactions()
                    ->whereNull('payment_voucher_id')
                    ->sum('amount');

                return $employee;
            })
            ->filter(fn($employee) => $employee->outstanding < 0)
            ->values();

        return Inertia::render('payment-vouchers/create', [
            'employees' => $employees,
        ]);
    }

    public function preview(Request $request)
    {
        $validated = $request->validate([
            'employee_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'employee_ids.*' => [
                'exists:employees,id',
            ],
        ]);

        $employees = Employee::with([
            'transactions',
        ])
            ->whereIn('id', $validated['employee_ids'])
            ->get();

        $employees->each(function ($employee) {

            $employee->transactions = $employee
                ->transactions()
                ->whereNull('payment_voucher_id')
                ->orderBy('created_at')
                ->get();
        });

        $employees->each(function ($employee) {

            $employee->transactions = $employee
                ->transactions()
                ->whereNull('payment_voucher_id')
                ->orderBy('created_at')
                ->get();
        });


        return Inertia::render(
            'payment-vouchers/preview',
            [
                'employees' => $employees,
            ]
        );
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'transaction_ids.*' => [
                'exists:employee_transactions,id',
            ],

            'payment_method' => [
                'required',
                'string',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],
        ]);

        DB::transaction(function () use ($validated, &$voucher) {

            $voucher = PaymentVoucher::create([
                'voucher_number' => 'PV-' . now()->format('Y') . '-' . str_pad(
                    PaymentVoucher::count() + 1,
                    6,
                    '0',
                    STR_PAD_LEFT
                ),

                'payment_date' => now(),

                'payment_method' => $validated['payment_method'],

                'remarks' => $validated['remarks'] ?? null,

                'status' => 'released',
            ]);

            $transactions = EmployeeTransaction::with('employee')
                ->whereIn('id', $validated['transaction_ids'])
                ->get();

            foreach ($transactions as $transaction) {

                PaymentVoucherItem::create([
                    'payment_voucher_id' => $voucher->id,
                    'employee_transaction_id' => $transaction->id,
                ]);

                $transaction->update([
                    'payment_voucher_id' => $voucher->id,
                ]);
            }

            /*
        |--------------------------------------------------------------------------
        | Create Payment Transactions
        |--------------------------------------------------------------------------
        */

            $transactions
                ->groupBy('employee_id')
                ->each(function ($employeeTransactions, $employeeId) use ($voucher) {

                    $total = abs($employeeTransactions->sum('amount'));

                    EmployeeTransaction::create([
                        'employee_id' => $employeeId,

                        'type' => 'payment',

                        // Positive because this reduces what the company owes
                        'amount' => $total,

                        'description' => sprintf(
                            'Salary released (%s)',
                            $voucher->voucher_number
                        ),

                        'payment_voucher_id' => $voucher->id,
                    ]);
                });
        });

        return redirect()
            ->route('payment-vouchers.show', $voucher)
            ->with(
                'success',
                'Payment Voucher generated successfully.'
            );
    }

    public function show(PaymentVoucher $paymentVoucher)
    {
        $paymentVoucher->load([
            'items.transaction.employee',
        ]);

        return Inertia::render('payment-vouchers/show', [
            'voucher' => $paymentVoucher,
        ]);
    }

    public function index(Request $request)
    {
        $vouchers = PaymentVoucher::with([
            'items.transaction.employee',
        ]);

        if ($request->filled('start_date')) {
            $vouchers->whereDate(
                'payment_date',
                '>=',
                $request->start_date
            );
        }

        if ($request->filled('end_date')) {
            $vouchers->whereDate(
                'payment_date',
                '<=',
                $request->end_date
            );
        }

        $vouchers = $vouchers
            ->latest('payment_date')
            ->get()
            ->map(function ($voucher) {

                $transactions = $voucher->items
                    ->pluck('transaction');

                $voucher->employees_count = $transactions
                    ->pluck('employee_id')
                    ->unique()
                    ->count();

                $voucher->total_amount = $transactions
                    ->sum(fn($transaction) => abs($transaction->amount));

                return $voucher;
            });

        return Inertia::render('payment-vouchers/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Payment Vouchers',
                    'href' => '/payment-vouchers',
                ],
            ],

            'vouchers' => $vouchers,

            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }
}
