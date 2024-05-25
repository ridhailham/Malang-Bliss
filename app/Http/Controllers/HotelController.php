<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */ 
    public function index()
    {
        $hotel = Hotel::all();
        
        return Inertia::render('admin/hotel/AllHotel', [
            'hotel' => $hotel
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/hotel/AddHotel');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi request
        $request->validate([
            'name' => 'required|max:225',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
            'lokasi' => 'required|max:255',
            'kontak' => 'required|max:50',
            'instagram' => 'required|max:50',
            'deskripsi' => 'required|max:225',
            'harga' => 'required'

        ]);

        
        try {
            DB::beginTransaction();

            $hotel = new Hotel();
            $hotel->name = $request->name;
            $hotel->lokasi = $request->lokasi;
            $hotel->kontak = $request->kontak;
            $hotel->instagram = $request->instagram;
            $hotel->deskripsi = $request->deskripsi;
            $hotel->harga = $request->harga;
            $imageName = hash('sha256', uniqid(rand(), true)) . '.' . $request->file('image')->getClientOriginalExtension();
            $hotel->image = $imageName;
            $hotel->save();
            
            $request->file('image')->storeAs('hotel', $imageName, 'public');
            // Storage::disk('public')->put('wisata/' . $imageName, file_get_contents($request->wisata));
            
            
            Cache::forget('hotels');
            
            DB::commit();
            
            session()->flash('message', 'Hotel berhasil ditambah');
            
            // return Inertia::location('/admin/wisata');
        } catch (\Throwable $th) {
            
            DB::rollback();
            logger()->error('Error occurred while adding wisata: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'Data gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /** 
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $hotel = Hotel::findOrFail($id);

        return Inertia::render('admin/hotel/EditHotel', [
            'id' => $id,
            'hotel' => $hotel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        
        $request->validate([
            'name' => 'required|max:225',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
            'lokasi' => 'required|max:255',
            'kontak' => 'required|max:50',
            'instagram' => 'required|max:50',
            'deskripsi' => 'required|max:225',
            'harga' => 'required'
        ]);
        
        
        
        try {
            DB::beginTransaction();

            $hotel = Hotel::findOrFail($id);
            $hotel->name = $request->name;
            $hotel->lokasi = $request->lokasi;
            $hotel->kontak = $request->kontak;
            $hotel->instagram = $request->instagram;
            $hotel->deskripsi = $request->deskripsi;
            $hotel->harga = $request->harga;

            if ($request->hasFile('image')) {
                $imageName = hash('sha256', uniqid(rand(), true)) . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->storeAs('hotel', $imageName, 'public');
                $hotel->image = $imageName;
            }
            
            $hotel->save();
            
            // $request->file('image')->storeAs('wisata', $imageName, 'public');
            // Storage::disk('public')->put('wisata/' . $imageName, file_get_contents($request->wisata));

            
            
            Cache::forget('hotels');
            
            DB::commit();
            
            session()->flash('message', 'Hotel berhasil ditambah');
            
            return Inertia::location('/admin/hotel');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            logger()->error('Error occurred while adding wisata: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'Data gagal ditambahkan');
        }
    }

    //     /**
    //      * Remove the specified resource from storage.
    //      */

    public function destroy(string $id)
    {
        try {

            DB::beginTransaction();

            $hotel = Hotel::findOrFail($id);
            $hotel->delete();

            Cache::forget('hotels');

            DB::commit();

            session()->flash('message', 'Hotel berhasil dihapus');

            return Inertia::location('/admin/hotel');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while deleting wisata: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'User gagal dihapus');
        }
    }
    
}
