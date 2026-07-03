<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BillingsController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CashFlowController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OBController;
use App\Http\Controllers\PaymentVoucherController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\TrucksController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
// anyone authenticated
Route::middleware(['auth'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // -- Employees
    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )->name('dashboard');
});

// admin access only
Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {

    // -- Employees -- //
    Route::resource('employees', EmployeeController::class);

    // -- Trips -- //
    Route::resource('trips', TripController::class);

    // -- Outstanding -- //
    // Route::resource('obs', OBController::class);
    Route::get('/obs', [OBController::class, 'index'])
        ->name('obs.index');
    Route::patch(
        '/obs/{employee}',
        [OBController::class, 'update']
    )->name('obs.update');

    // -- Deductions -- //
    Route::resource('deductions', DeductionController::class);
    Route::post(
        '/deductions/{deduction}/balance',
        [DeductionController::class, 'addToBalance']
    )->name('deductions.balance');

    // -- Payroll -- //
    Route::resource('payroll', PayrollController::class);
    Route::post(
        '/payroll/{payroll}/finalize',
        [PayrollController::class, 'finalize']
    )->name('payroll.finalize');
    // Generate Payslip
    Route::get(
        '/payroll/{payroll}/employees/{employee}/payslip',
        [PayrollController::class, 'payslip']
    )->name('payroll.payslip');

    // -- Payment Voucher -- //
    Route::resource('payment-vouchers', PaymentVoucherController::class);
    Route::post(
        '/payment-vouchers/preview',
        [PaymentVoucherController::class, 'preview']
    )->name('payment-vouchers.preview');
    Route::post(
        '/payment-vouchers',
        [PaymentVoucherController::class, 'store']
    )->name('payment-vouchers.store');
    Route::get(
        '/payment-vouchers/{paymentVoucher}',
        [PaymentVoucherController::class, 'show']
    )->name('payment-vouchers.show');

    // -- Billings -- //
    Route::resource('billings', BillingsController::class);

    // -- Trucks -- //
    Route::resource('trucks', TrucksController::class);

    // -- Companies -- //
    Route::resource('companies', CompaniesController::class);

    // -- Inventory -- //
    Route::resource('inventory', InventoryController::class);

    // -- Cash Flow -- //
    Route::resource('cash-flow', CashFlowController::class);

    // -- Budget -- //
    Route::resource('budget', BudgetController::class);

    // -- Attendance -- //
    Route::resource('attendance', AttendanceController::class);
    Route::patch(
        '/attendance/{attendance}/publish',
        [AttendanceController::class, 'publish']
    )->name('attendance.publish');
});

require __DIR__ . '/settings.php';
