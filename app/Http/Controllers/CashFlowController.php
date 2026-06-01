<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CashFlowController extends Controller
{
    public function index()
    {
        return Inertia::render('cash-flow/index', []);
    }
}
