<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wisata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminWisataController extends Controller
{
    /**
     * Display a listing of the resource.
     */ 
    public function index()
    {
        $wisata = Wisata::all();
        
        return Inertia::render('admin/wisata/AllWisata', [
            'wisata' => $wisata
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/wisata/AddWisata');
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

            $wisata = new Wisata();
            $wisata->name = $request->name;
            $wisata->lokasi = $request->lokasi;
            $wisata->kontak = $request->kontak;
            $wisata->instagram = $request->instagram;
            $wisata->deskripsi = $request->deskripsi;
            $wisata->harga = $request->harga;
            $imageName = hash('sha256', uniqid(rand(), true)) . '.' . $request->file('image')->getClientOriginalExtension();
            $wisata->image = $imageName;
            $wisata->save();
            
            $request->file('image')->storeAs('wisata', $imageName, 'public');
            // Storage::disk('public')->put('wisata/' . $imageName, file_get_contents($request->wisata));
            
            
            Cache::forget('wisatas');
            
            DB::commit();
            
            session()->flash('message', 'Wisata berhasil ditambah');
            
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
        $wisata = Wisata::findOrFail($id);

        return Inertia::render('admin/wisata/EditWisata', [
            'id' => $id,
            'wisata' => $wisata
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

            $wisata = Wisata::findOrFail($id);
            $wisata->name = $request->name;
            $wisata->lokasi = $request->lokasi;
            $wisata->kontak = $request->kontak;
            $wisata->instagram = $request->instagram;
            $wisata->deskripsi = $request->deskripsi;
            $wisata->harga = $request->harga;
            
            if ($request->hasFile('image')) {
                $imageName = hash('sha256', uniqid(rand(), true)) . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->storeAs('wisata', $imageName, 'public');
                $wisata->image = $imageName;
            }
            
            $wisata->save();
            
            // $request->file('image')->storeAs('wisata', $imageName, 'public');
            // Storage::disk('public')->put('wisata/' . $imageName, file_get_contents($request->wisata));

            
            
            Cache::forget('wisatas');
            
            DB::commit();
            
            session()->flash('message', 'Wisata berhasil ditambah');
            
            return Inertia::location('/admin/wisata');
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

            $wisata = Wisata::findOrFail($id);
            $wisata->delete();

            Cache::forget('wisatas');

            DB::commit();

            session()->flash('message', 'Wisata berhasil dihapus');

            return Inertia::location('/admin/wisata');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while deleting wisata: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'User gagal dihapus');
        }
    }
    // public function destroy(string $slug)
    // {
    //     try {
    //         DB::beginTransaction();

    //         $lab = Wisata::where('slug', $slug)->firstOrFail();
    //         $lab->delete();

    //         Cache::forget('labs');

    //         DB::commit();
    //         return redirect()->route('admin.labs')->with('success', 'Laboratorium berhasil dihapus');
    //     } catch (\Throwable $th) {
    //         DB::rollback();
    //         logger()->error('Error occurred while deleting labs: ' . $th->getMessage());
    //         return redirect()->back()->withErrors('error', 'Laboratorium gagal dihapus');
    //     }
    // }
}
