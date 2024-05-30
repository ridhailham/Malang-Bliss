<?php

namespace App\Http\Controllers;

use App\Models\OrderWisata;
use App\Models\Wisata;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderWisataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function bayar(Request $request, string $id)
    {
        try {
            $user = Auth::user();
            $wisata = Wisata::findOrFail($id);

            return Inertia::render('OrderWisata', [
                'user' => $user,
                'wisata' => $wisata,

            ]);
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
        // Validasi request
        $valid = $request->validate([
            'bukti_pembayaran' => 'required',
            'kontak' => 'required',
            'user_id' => 'required',
            'wisata_id' => 'required',

        ]);

        try {
            $user = Auth::user();
            $wisata = Wisata::findOrFail($request->wisata_id);
            DB::beginTransaction();

            $orderWisata = new OrderWisata();
            // $orderWisata->status = 'belum tervalidasi';
            $orderWisata->bukti_pembayaran = $request->bukti_pembayaran;
            $orderWisata->kontak = $request->kontak;
            $orderWisata->user_id = $user->id;
            $orderWisata->wisata_id = $wisata->id;

            $orderWisata->save();


            Cache::forget('order_wisatas');

            DB::commit();


            return Inertia::location('/home');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            logger()->error('Error occurred while adding labs: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'Data gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
