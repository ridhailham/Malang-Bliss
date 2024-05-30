<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    


    public function index() {
        try {
            $user = Auth::user();
            $hotel = Hotel::orderBy('id', 'desc')->get();
            
            if ($user) {
                return Inertia::render('Hotel', [
                    'user' => $user,
                    'hotel' => $hotel,
                ]);
            } else {
                return Inertia::render('Hotel', [
                    'hotel' => $hotel,
                ]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function ascHarga() {
        try {
            $user = Auth::user();
            $hotel = Hotel::orderBy('harga', 'asc')->get();
            
            if ($user) {
                return Inertia::render('Hotel', [
                    'user' => $user,
                    'hotel' => $hotel,
                ]);
            } else {
                return Inertia::render('Hotel', [
                    'hotel' => $hotel,
                ]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function descHarga() {
        try {
            $user = Auth::user();
            $hotel = Hotel::orderBy('harga', 'desc')->get();
            
            if ($user) {
                return Inertia::render('Hotel', [
                    'user' => $user,
                    'hotel' => $hotel,
                ]);
            } else {
                return Inertia::render('Hotel', [
                    'hotel' => $hotel,
                ]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function filterHarga(Request $request) {
        try {
            $user = Auth::user();
            $minPrice = $request->min_price;
            $maxPrice = $request->max_price;
            $hotel = Hotel::whereBetween('harga', [$minPrice, $maxPrice])->get();
            
            
            if ($user) {
                return Inertia::render('Hotel', [
                    'user' => $user,
                    'hotel' => $hotel,
                ]);
            } else {
                return Inertia::render('Hotel', [
                    'hotel' => $hotel,
                ]);
            }
        } catch (Exception $e) {
            
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hotel = Hotel::findOrFail($id);

        return Inertia::render('DetailHotel', [
            'id' => $id,
            'hotel' => $hotel
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
