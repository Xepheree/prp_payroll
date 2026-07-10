<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'image',
        'name',
        'specialization',
        'contact_person_name',
        'contact_person_number',
        'address',
        'details',
    ];

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
