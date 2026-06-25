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
        ]);
    }
}
