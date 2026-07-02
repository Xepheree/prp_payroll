<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('employees/index', [
            'breadcrumbs' => [
                ['title' => 'Employees', 'href' => '/employees'],
            ],
            'employees' => Employee::orderBy('id', 'asc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('employees/create', []);
    }

    public function show(Employee $employee)
    {
        $employee->load([
            // 'drivenTrips.truck',
            // 'assistedTrips.truck',
            'payrollItems.payroll',
            'deductions',
            'transactions',
        ]);

        return Inertia::render('employees/show', [
            'breadcrumbs' => [
                ['title' => 'Employees', 'href' => '/employees'],
                ['title' => $employee->name],
            ],

            'employee' => $employee,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20240',
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'rate' => 'required|numeric',
            'ot_rate' => 'required|numeric',
            'trip_rate' => 'required|numeric',
            'status' => 'required|string',
            'description' => 'nullable|string',
        ]);

        // create the employee record and store image
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('employees', 'public');
        }

        Employee::create([
            'image' => $imagePath,
            'name' => $request->name,
            'designation' => $request->designation,
            'rate' => $request->rate,
            'ot_rate' => $request->ot_rate,
            'trip_rate' => $request->trip_rate,
            'status' => $request->status,
            'description' => $request->description,
        ]);
        return redirect()->route('employees.index')->with('message', 'Employee added successfully.');
    }

    public function destroy(Employee $employee)
    {
        if (
            $employee->image &&
            basename($employee->image) !== 'employee_placeholder.png' // protect the placeholder image
        ) {
            Storage::disk('public')->delete($employee->image);
        } // delete image upon deleting record

        $employee->delete(); // before deleting record

        return redirect()
            ->route('employees.index')
            ->with('message', 'Employee removed successfully.');
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'image' => 'nullable|image|max:5120',
            'name' => 'required',
            'designation' => 'required',
            'rate' => 'required',
            'ot_rate' => 'required',
            'trip_rate' => 'required',
            'status' => 'required',
        ]);

        if ($request->hasFile('image')) { // overrwrite existing image so it wont accumulate

            if (
                $employee->image &&
                Storage::disk('public')->exists($employee->image)
            ) {
                Storage::disk('public')->delete($employee->image);
            }

            $employee->image = $request->file('image')
                ->store('employees', 'public');
        }

        $employee->update([
            'name' => $request->name,
            'designation' => $request->designation,
            'rate' => $request->rate,
            'ot_rate' => $request->ot_rate,
            'trip_rate' => $request->trip_rate,
            'status' => $request->status,
        ]);

        return redirect()->back();
    }
}
