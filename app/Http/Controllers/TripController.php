<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Payroll;
use App\Models\Trip;
use App\Models\Truck;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TripController extends Controller
{


    public function index(Request $request)
    {
        $trips = Trip::with([
            'truck',
            'driver',
            'helper',
            'payroll',
        ]);

        if ($request->filled('start_date')) {
            $trips->whereDate(
                'trip_date',
                '>=',
                $request->start_date
            );
        }

        if ($request->filled('end_date')) {
            $trips->whereDate(
                'trip_date',
                '<=',
                $request->end_date
            );
        }

        return Inertia::render('trips/index', [
            'breadcrumbs' => [
                ['title' => 'Trips', 'href' => '/trips'],
            ],
            'trips' => $trips
                ->latest('trip_date')
                ->get()
                ->map(function ($trip) {

                    $trip->is_late_filing =
                        $trip->payroll_id === null &&
                        in_array($trip->trip_type, ['deliver', 'backload']) &&
                        Payroll::where('status', 'finalized')
                        ->whereDate('start_date', '<=', $trip->trip_date)
                        ->whereDate('end_date', '>=', $trip->trip_date)
                        ->exists();

                    return $trip;
                }),

            'employees' => Employee::where(
                'status',
                'active'
            )->get(),

            'trucks' => Truck::where(
                'status',
                'ready'
            )->get(),

            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trip_date' => 'required|date',

            'truck_id' => 'required|exists:trucks,id',

            'driver_id' => 'required|exists:employees,id',

            'helper_id' => 'nullable|exists:employees,id',

            'trip_type' => 'required|in:deliver,pickup,transfer,backload',

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

    public function update(Request $request, Trip $trip)
    {
        if ($trip->payroll_id !== null) {
            return back()->withErrors([
                'trip' => 'This trip has already been included in a payroll and can no longer be modified.',
            ]);
        }

        $validated = $request->validate([
            'trip_date' => ['required', 'date'],
            'truck_id' => ['required', 'exists:trucks,id'],
            'driver_id' => ['required', 'exists:employees,id'],
            'helper_id' => ['nullable', 'exists:employees,id'],
            'trip_type' => ['required', 'in:pickup,transfer,deliver'],
        ]);

        $trip->update($validated);

        return back()->with(
            'success',
            'Trip updated successfully.'
        );
    }

    public function destroy(Trip $trip)
    {
        if ($trip->payroll_id !== null) {
            return back()->withErrors([
                'trip' => 'This trip has already been included in a payroll and cannot be deleted.',
            ]);
        }

        $trip->delete();

        return back()->with(
            'success',
            'Trip deleted successfully.'
        );
    }
}
