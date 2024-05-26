<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function edit()
    {
        $user = User::where('role', 'admin')->first(); // Fetch the first user with admin role
        
        if ($user) {
            return Inertia::render('admin/ResetPassword', [
                'id' => $user->id,
                'user' => $user
            ]);
        } else {
            return Inertia::location('/admin/dashboard');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate request
        $valid = $request->validate([
            'password' => 'sometimes|confirmed',
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

            
            return Inertia::location('/admin/dashboard');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while updating user: ' . $th->getMessage());
            return redirect()->back()->withErrors(['error' => 'Data gagal ditambahkan']);
        }
    }
}
