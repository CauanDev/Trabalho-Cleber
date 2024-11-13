<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservasController extends Controller
{
    public function index()
    {
        return Inertia::render('Reservas');
    }
}
