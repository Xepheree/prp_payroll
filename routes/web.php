<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BillingsController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CashFlowController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OBController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\TrucksController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
// anyone authenticated
Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// admin access only
Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {

    // Employees
    Route::resource('employees', EmployeeController::class);

    // Trips
    Route::resource('trips', TripController::class);

    // Outstanding
    // Route::resource('obs', OBController::class);
    Route::get('/obs', [OBController::class, 'index'])
        ->name('obs.index');

    Route::patch(
        '/obs/{employee}',
        [OBController::class, 'update']
    )->name('obs.update');

    // Payroll
    Route::resource('payroll', PayrollController::class);

    // Billings
    Route::resource('billings', BillingsController::class);

    // Trucks
    Route::resource('trucks', TrucksController::class);

    // Companies
    Route::resource('companies', CompaniesController::class);

    // Inventory
    Route::resource('inventory', InventoryController::class);

    // Cash Flow
    Route::resource('cash-flow', CashFlowController::class);

    // Budget
    Route::resource('budget', BudgetController::class);

    // Attendance
    Route::resource('attendance', AttendanceController::class);
});

require __DIR__ . '/settings.php';
