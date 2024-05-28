<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $user = User::findOrFail($id);

        
        return Inertia::render('Profile', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
    }

    public function editNama(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('EditNama', [
            'user' => $user
        ]);
    }

    public function editPassword(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('EditPassword', [
            'user' => $user
        ]);
    }

    public function showRiwayatOrder(string $id)
    {
        $user = User::findOrFail($id);
        
        return Inertia::render('RiwayatOrder', [
            'user' => $user
        ]);
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function updateNama(Request $request, string $id)
    {
        // Validate request
        $valid = $request->validate([
            'name' => 'required|max:255',
            
        ]);

        try {
            DB::beginTransaction();
            
            $user = User::findOrFail($id);
            $user->name = $valid['name'];

            $user->save();

            Cache::forget('users');

            DB::commit();

            return Inertia::location('/profile/'.$user->id);
        } catch (\Throwable $th) {
            
            DB::rollback();
            logger()->error('Error occurred while updating user: ' . $th->getMessage());
            return redirect()->back()->withErrors(['error' => 'Data gagal ditambahkan']);
        }
    }

    public function updatePassword(Request $request, string $id)
    {
        // Validate request
        $valid = $request->validate([
            
            'password' => 'required|confirmed',
        ]);

        try {
            DB::beginTransaction();

            $user = User::findOrFail($id);
            

            if (!empty($valid['password'])) {
                $user->password = Hash::make($valid['password']);
            }

            $user->save();

            Cache::forget('users');

            DB::commit();

            return Inertia::location('/profile/'.$user->id);
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            logger()->error('Error occurred while updating user: ' . $th->getMessage());
            return redirect()->back()->withErrors(['error' => 'Data gagal ditambahkan']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
