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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20240',
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'rate' => 'required|numeric',
            'ot_rate' => 'required|numeric',
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
            'status' => $request->status,
            'description' => $request->description,
        ]);
        return redirect()->route('employees.index')->with('message', 'Employee added successfully.');
    }

    public function destroy(Employee $id)
    {
        $id->delete();
        return redirect()->route('employees.index')->with('message', 'Employee removed successfully.');
    }
}
