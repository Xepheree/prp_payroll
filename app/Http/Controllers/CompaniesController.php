<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function index()
    {
        return Inertia::render('companies/index', [
            'companies' => Company::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20240',

            'name' => 'required|string|max:255',

            'specialization' => 'nullable|string|max:255',

            'contact_person_name' => 'nullable|string|max:255',

            'contact_person_number' => 'nullable|string|max:255',

            'address' => 'nullable|string|max:5000',

            'details' => 'nullable|string|max:10000',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('companies', 'public');
        }

        Company::create([
            'image' => $imagePath,

            'name' => $request->name,

            'specialization' => $request->specialization,

            'contact_person_name' => $request->contact_person_name,

            'contact_person_number' => $request->contact_person_number,

            'address' => $request->address,

            'details' => $request->details,
        ]);

        return redirect()
            ->route('companies.index')
            ->with('message', 'Company added successfully.');
    }

    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('companies.index')->with('message', 'Company removed successfully.');
    }
}
