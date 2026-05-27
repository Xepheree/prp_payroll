<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OBController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

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
});

require __DIR__ . '/settings.php';
