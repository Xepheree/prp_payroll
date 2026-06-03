<?php

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
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');

    // Trips
    Route::get('/trips', [TripController::class, 'index'])->name('trips.index');

    // Outstanding
    Route::get('/obs', [OBController::class, 'index'])->name('obs.index');

    // Payroll
    Route::get('/payroll', [PayrollController::class, 'index'])->name('payroll.index');

    // Billings
    Route::get('/billings', [BillingsController::class, 'index'])->name('billings.index');

    // Trucks
    Route::get('/trucks', [TrucksController::class, 'index'])->name('trucks.index');
    Route::post('/trucks', [TrucksController::class, 'store'])->name('trucks.store');

    // Companies
    Route::get('/companies', [CompaniesController::class, 'index'])->name('companies.index');
    Route::post('/companies', [CompaniesController::class, 'store'])->name('companies.store');

    // Inventory
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');

    // Cash Flow
    Route::get('/cash-flow', [CashFlowController::class, 'index'])->name('cash-flow.index');

    // Budget
    Route::get('/budget', [BudgetController::class, 'index'])->name('budget.index');
});

require __DIR__ . '/settings.php';
