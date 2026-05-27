<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('employees/index', [
            'employees' => Employee::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('employees/create', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'rate' => 'required|numeric',
            'description ' => 'nullable|string',
        ]);

        Employee::create($request->all());
        return redirect()->route('employees.index')->with('message', 'Employee added successfully.');
    }
}
