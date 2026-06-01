<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TrucksController extends Controller
{
    public function index()
    {
        return Inertia::render('trucks/index', []);
    }
}
