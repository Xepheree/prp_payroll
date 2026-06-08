<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'trip_date',
        'truck_id',
        'driver_id',
        'helper_id',
        'trip_type',
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
}
