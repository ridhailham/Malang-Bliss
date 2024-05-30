<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\OrderHotel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderHotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $hotel = OrderHotel::with('hotel')
            ->where('user_id', $user->id)
            ->get();

        

        return Inertia::render('OrderHotel', [
            'user' => $user,
            'orderHotel' => $hotel,

        ]);
    }

    public function bayar(Request $request, string $id)
    {

        try {
            $user = Auth::user();
            $hotel = Hotel::findOrFail($id);

            return Inertia::render('OrderHotel', [
                'user' => $user,
                'hotel' => $hotel,

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
            'hotel_id' => 'required',


        ]);

        try {
            $user = Auth::user();
            $hotel = Hotel::findOrFail($request->hotel_id);
            DB::beginTransaction();

            $orderHotel = new OrderHotel();
            // $orderHotel->status = 'belum tervalidasi';
            $orderHotel->bukti_pembayaran = $request->bukti_pembayaran;
            $orderHotel->kontak = $request->kontak;
            $orderHotel->user_id = $user->id;
            $orderHotel->hotel_id = $hotel->id;

            $orderHotel->save();



            Cache::forget('order_hotels');

            DB::commit();

            
            return Inertia::location('/hotel/order/riwayat/'.$orderHotel->id);
        } catch (\Throwable $th) {

            DB::rollback();
            logger()->error('Error occurred while adding hotel: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'Data gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // $hotel = OrderHotel::findOrFail($id);
        $user = Auth::user();
        $hotel = OrderHotel::with(['hotel', 'user'])->findOrFail($id);

        
        return Inertia::render('DetailRiwayatOrderHotel', [
            'id' => $id,
            'hotel' => $hotel,
            'user' => $user
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
