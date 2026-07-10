<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $casts = [
        'employee_paid' => 'boolean',
    ];

    protected $fillable = [
        'trip_date',
        'truck_id',
        'company_id',
        'driver_id',
        'helper_id',
        'trip_type',
        'description',
        'employee_paid',
        'status',
        'payroll_id',
    ];

    public function truck()
    {
        return $this->belongsTo(Truck::class);
    }

    public function driver()
    {
        return $this->belongsTo(Employee::class, 'driver_id');
    }

    public function helper()
    {
        return $this->belongsTo(Employee::class, 'helper_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }
}
