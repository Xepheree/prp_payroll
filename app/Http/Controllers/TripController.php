<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Trip;
use App\Models\Truck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        return Inertia::render('trips/index', [
            'trips' => Trip::with([
                'truck',
                'driver',
                'helper',
            ])->latest()->get(),

            'employees' => Employee::where(
                'status',
                'active'
            )->get(),

            'trucks' => Truck::where(
                'status',
                'ready'
            )->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trip_date' => 'required|date',

            'truck_id' => 'required|exists:trucks,id',

            'driver_id' => 'required|exists:employees,id',

            'helper_id' => 'nullable|exists:employees,id',

            'trip_type' => 'required|in:deliver,pickup,transfer',

        ]);

        Trip::create([
            'trip_date' => $request->trip_date,

            'truck_id' => $request->truck_id,

            'driver_id' => $request->driver_id,

            'helper_id' => $request->helper_id,

            'trip_type' => $request->trip_type,
        ]);

        return redirect()
            ->route('trips.index')
            ->with('message', 'Trip created successfully.');
    }
}
