<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class WisataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $user = Auth::user();
            $wisata = Wisata::orderBy('id', 'desc')->get();
            
            if ($user) {
                return Inertia::render('Wisata', [
                    'user' => $user,
                    'wisata' => $wisata,
                ]);
            } else {
                return Inertia::render('Wisata', [
                    'wisata' => $wisata,
                ]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function ascHarga() {
        try {
            $user = Auth::user();
            $wisata = Wisata::orderBy('harga', 'asc')->get();
            
            if ($user) {
                return Inertia::render('Wisata', [
                    'user' => $user,
                    'wisata' => $wisata,
                ]);
            } else {
                return Inertia::render('Wisata', [
                    'wisata' => $wisata,
                ]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function descHarga() {
        try {
            $user = Auth::user();
            $wisata = Wisata::orderBy('harga', 'desc')->get();
            
            if ($user) {
                return Inertia::render('Wisata', [
                    'user' => $user,
                    'wisata' => $wisata,
                ]);
            } else {
                return Inertia::render('Wisata', [
                    'wisata' => $wisata,
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
            $wisata = Wisata::whereBetween('harga', [$minPrice, $maxPrice])->get();
            
            
            if ($user) {
                return Inertia::render('Wisata', [
                    'user' => $user,
                    'wisata' => $wisata,
                ]);
            } else {
                return Inertia::render('Wisata', [
                    'wisata' => $wisata,
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
        try {
            // Implement create logic
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create resource'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Implement store logic
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to store resource'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();
        $wisata = Wisata::findOrFail($id);


        return Inertia::render('DetailWisata', [
            'id' => $id,
            'user' => $user,
            'wisata' => $wisata,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            // Implement edit logic
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to edit resource'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Implement update logic
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update resource'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Implement destroy logic
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete resource'], 500);
        }
    }
}
