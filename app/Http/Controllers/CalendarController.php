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

        return back()->with(
            'success',
            'Event created successfully.'
        );
    }

    public function update(Request $request, CalendarEvent $calendar)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'color' => ['required', 'string'],
        ]);

        $calendar->update($validated);

        return back()->with(
            'success',
            'Event updated successfully.'
        );
    }

    public function destroy(CalendarEvent $calendar)
    {
        $calendar->delete();

        return back()->with(
            'success',
            'Event deleted successfully.'
        );
    }
}
