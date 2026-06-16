<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceItem extends Model

{
    protected $fillable = [
        'attendance_id',
        'employee_id',
        'attendance_date',
        'work_hours',
        'overtime_hours',
    ];

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
