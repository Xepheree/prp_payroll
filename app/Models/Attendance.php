<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{

    protected $fillable = [
        'period_start',
        'period_end',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(AttendanceItem::class);
    }
}
