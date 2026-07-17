<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $fillable = [
        'title',
        'description',

        'start_date',
        'end_date',

        'all_day',

        'visibility',

        'type',

        'color',

        'recurrence_type',

        'repeat_interval',

        'monthly_repeat_mode',

        'week_of_month',

        'day_of_week',

        'created_by',
    ];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',

        'all_day' => 'boolean',

        'repeat_interval' => 'integer',
        'week_of_month' => 'integer',
        'day_of_week' => 'integer',
    ];

    public function isRecurring(): bool
    {
        return $this->recurrence_type !== 'none';
    }

    public function isMonthlyByWeekday(): bool
    {
        return $this->recurrence_type === 'monthly'
            && $this->monthly_repeat_mode === 'weekday_of_month';
    }

    public function isMonthlyByDate(): bool
    {
        return $this->recurrence_type === 'monthly'
            && $this->monthly_repeat_mode === 'day_of_month';
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function permissions()
    {
        return $this->hasMany(CalendarEventPermission::class);
    }
}
