<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'attendance_id',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function attendance()
    {
        return $this->belongsTo(
            Attendance::class
        );
    }

    public function items()
    {
        return $this->hasMany(PayrollItem::class);
    }
}
