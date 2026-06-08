<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'image',
        'name',
        'designation',
        'rate',
        'ot_rate',
        'status',
        'description',
    ];

    public function drivenTrips()
    {
        return $this->hasMany(Trip::class, 'driver_id');
    }

    public function assistedTrips()
    {
        return $this->hasMany(Trip::class, 'helper_id');
    }
}
