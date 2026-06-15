<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Trip;
use App\Models\Truck;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'employeeCount' => Employee::count(),

            'truckCount' => Truck::count(),

            'companyCount' => Company::count(),

            'totalBalance' => Employee::sum('balance'),

            'recentTrips' => Trip::with([
                'truck',
                'driver',
                'helper',
            ])
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}
