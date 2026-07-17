<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $events = CalendarEvent::with([
            'creator',
            'permissions',
        ])
            ->where(function ($query) use ($user) {

                // Public events
                $query->where('visibility', 'public')

                    // Private events (owner only)
                    ->orWhere(function ($query) use ($user) {
                        $query->where('visibility', 'private')
                            ->where('created_by', $user->id);
                    })

                    // Custom events
                    ->orWhere(function ($query) use ($user) {
                        $query->where('visibility', 'custom')
                            ->whereHas('permissions', function ($permission) use ($user) {
                                $permission->where('permission_type', 'role')
                                    ->where('permission_value', $user->role);
                            });
                    });
            })
            ->latest('start_date')
            ->get();

        return Inertia::render('calendar/index', [
            'events' => $events,
            'breadcrumbs' => [
                [
                    'title' => 'Calendar',
                    'href' => '/calendar',
                ],
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'title' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],

                'start_date' => ['required', 'date'],
                'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

                'all_day' => ['required', 'boolean'],

                'visibility' => [
                    'required',
                    'in:public,private,custom',
                ],

                'permissions' => [
                    'nullable',
                    'array',
                ],

                'permissions.*.permission_type' => [
                    'required_with:permissions',
                    'in:role,user',
                ],

                'permissions.*.permission_value' => [
                    'required_with:permissions',
                    'string',
                ],

                'type' => [
                    'required',
                    'in:event,holiday,leave,birthday,announcement',
                ],

                'color' => ['required', 'string'],

                'recurrence_type' => [
                    'required',
                    'in:none,daily,weekly,monthly,yearly',
                ],

                'repeat_interval' => [
                    'required',
                    'integer',
                    'min:1',
                ],

                'monthly_repeat_mode' => [
                    'nullable',
                    'in:day_of_month,weekday_of_month',
                ],

                'week_of_month' => [
                    'nullable',
                    'integer',
                    'between:1,5',
                ],

                'day_of_week' => [
                    'nullable',
                    'integer',
                    'between:0,6',
                ],
            ],
        );

        if ($validated['recurrence_type'] !== 'monthly') {
            $validated['monthly_repeat_mode'] = null;
            $validated['week_of_month'] = null;
            $validated['day_of_week'] = null;
        }

        $validated['created_by'] = auth()->id();

        $permissions = $validated['permissions'] ?? [];

        unset($validated['permissions']);

        DB::transaction(function () use ($validated, $permissions) {

            $event = CalendarEvent::create($validated);

            if (
                $validated['visibility'] === 'custom' &&
                !empty($permissions)
            ) {
                $event->permissions()->createMany($permissions);
            }
        });

        return back()->with(
            'success',
            'Event created successfully.'
        );
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            'all_day' => ['required', 'boolean'],

            'visibility' => ['required', 'in:public,private,custom'],

            'permissions' => [
                'nullable',
                'array',
            ],

            'permissions.*.permission_type' => [
                'required_with:permissions',
                'in:role,user',
            ],

            'permissions.*.permission_value' => [
                'required_with:permissions',
                'string',
            ],

            'type' => [
                'required',
                'in:event,holiday,leave,birthday,announcement',
            ],

            'color' => ['required', 'string'],

            'recurrence_type' => [
                'required',
                'in:none,daily,weekly,monthly,yearly',
            ],

            'repeat_interval' => [
                'required',
                'integer',
                'min:1',
            ],

            'monthly_repeat_mode' => [
                'nullable',
                'in:day_of_month,weekday_of_month',
            ],

            'week_of_month' => [
                'nullable',
                'integer',
                'between:1,5',
            ],

            'day_of_week' => [
                'nullable',
                'integer',
                'between:0,6',
            ],
        ]);

        if ($validated['recurrence_type'] !== 'monthly') {
            $validated['monthly_repeat_mode'] = null;
            $validated['week_of_month'] = null;
            $validated['day_of_week'] = null;
        }

        return back()->with(
            'success',
            'Event created successfully.'
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
