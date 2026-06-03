<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Truck extends Model
{
    protected $fillable = [
        'image',
        'plate',
        'alias',
        'make',
        'category',
        'status',
    ];
}
