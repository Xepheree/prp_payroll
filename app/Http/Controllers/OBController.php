<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OBController extends Controller
{
    public function index()
    {
        return Inertia::render('obs/index', [
            'employees' => Employee::latest()
                ->get(),
        ]);
    }

    public function update(
        Request $request,
        Employee $employee
    ) {
        $request->validate([
            'balance' =>
            'required|numeric|min:0',
        ]);

        $employee->update([
            'balance' =>
            $request->balance,
        ]);

        return back();
    }
}
