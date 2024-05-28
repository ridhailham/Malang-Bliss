<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index() {
        return Inertia::render('Register');
    }

    public function store(Request $request)
    {
        // Validasi request
        $valid = $request->validate([
            'temail' => 'required',
            'tname' => 'required|max:255',
            'tpassword' => 'required',

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

            Auth::login($user);

            return Inertia::location('/home');

            if (Auth::attempt(['email' => $valid['temail'], 'password' => $valid['tpassword']])) {
                // Redirect ke /home jika autentikasi berhasil
                return Inertia::location('/home');
            } 

            return Inertia::location('/register');
        } catch (\Throwable $th) {
            DB::rollback();
            logger()->error('Error occurred while adding labs: ' . $th->getMessage());
            return redirect()->back()->withErrors('error', 'Data gagal ditambahkan');
        }
    }
}
