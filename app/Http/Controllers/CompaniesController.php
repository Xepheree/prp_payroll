<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function index()
    {
        return Inertia::render('companies/index', []);
    }
}
