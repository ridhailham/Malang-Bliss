<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        $user = Auth::user();

        $wisata = Wisata::orderBy('id', 'desc')->take(5)->get();
        $hotel = Hotel::orderBy('id', 'desc')->take(5)->get();

        
        if ($user) {
            
            return Inertia::render('Home', [
                'user' => $user,
                'wisata' => $wisata,
                'hotel' => $hotel
            ]);
        } else {
            
            return Inertia::render('Home', [
                'wisata' => $wisata,
                'hotel' => $hotel
            ]);
        }
    }
}
