<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarEventPermission extends Model
{
    protected $fillable = [
        'calendar_event_id',
        'permission_type',
        'permission_value',
    ];

    public function event()
    {
        return $this->belongsTo(CalendarEvent::class);
    }
}
