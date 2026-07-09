<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render('calendar/index', [
            'events' => CalendarEvent::all(),
            'breadcrumbs' => [
                [
                    'title' => 'Calendar',
                    'href' => '/calendar',
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'title' => ['required'],
            'description' => ['nullable'],
            'color' => ['required'],
        ]);

        CalendarEvent::create($validated);

        return back();
    }
}
