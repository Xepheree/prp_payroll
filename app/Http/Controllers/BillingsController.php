<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingsController extends Controller
{
    public function index()
    {
        return Inertia::render('billings/index', []);
    }
}
