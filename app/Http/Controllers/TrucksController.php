<?php

namespace App\Http\Controllers;

use App\Models\Truck;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrucksController extends Controller
{
    public function index()
    {
        return Inertia::render('trucks/index', [
            'trucks' => Truck::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20240',
            'plate' => 'required|string|max:255',
            'alias' => 'nullable|string|max:255',
            'make' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        // create the employee record and store image
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('trucks', 'public');
        }

        Truck::create([
            'image' => $imagePath,
            'plate' => $request->plate,
            'alias' => $request->alias,
            'make' => $request->make,
            'category' => $request->category,
            'status' => $request->status,
        ]);
        return redirect()->route('trucks.index')->with('message', 'Truck added successfully.');
    }
}
