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
        $user = User::all();
        return Inertia::render('admin/user/AllUser', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/user/AddUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi request
        $valid = $request->validate([
            'temail' => 'required',
            'tname' => 'required|max:255',
            'tpassword' => 'required|confirmed',

        ]);



        try {
            DB::beginTransaction();

            $user = new User();
            $user->name = $valid['tname'];
            $user->email = $valid['temail'];
            $user->password = Hash::make($valid['tpassword']);
            $user->role = 'user';

            $user->save();



            Cache::forget('users');

            DB::commit();

            return Inertia::location('/admin/user');
        } catch (\Throwable $th) {
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
    }

    /** 
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);

        return Inertia::render('admin/user/EditUser', [
            'id' => $id,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate request
        $valid = $request->validate([
            'name' => 'required|max:255',
            'password' => 'sometimes|confirmed',
        ]);

        try {
            DB::beginTransaction();

            $user = User::findOrFail($id);
            $user->name = $valid['name'];

            if (!empty($valid['password'])) {
                $user->password = Hash::make($valid['password']);
            }

            $user->save();

            Cache::forget('users');

            DB::commit();

            return Inertia::location('/admin/user');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while updating user: ' . $th->getMessage());
            return redirect()->back()->withErrors(['error' => 'Data gagal ditambahkan']);
        }
    }



    //     /**
    //      * Remove the specified resource from storage.
    //      */

    public function destroy(string $id)
    {
        try {

            DB::beginTransaction();

            $user = User::findOrFail($id);
            $user->delete();

            Cache::forget('users');

            DB::commit();



            session()->flash('message', 'User berhasil dihapus');

            return Inertia::location('/admin/user');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while deleting user: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'User gagal dihapus');
        }
    }
    // public function destroy(string $slug)
    // {
    //     try {
    //         DB::beginTransaction();

    //         $lab = User::where('slug', $slug)->firstOrFail();
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
