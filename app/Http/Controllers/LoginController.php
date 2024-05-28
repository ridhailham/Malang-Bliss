<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index() {
        return Inertia::render('Login');
    }

    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return Inertia::location('/');
            } else {
                return back()->withErrors([
                    'email' => 'Email atau password salah.',
                ])->onlyInput('email');
            }
        } catch (\Throwable $th) {
            // Log the error
            dd($th);
            logger()->error('Error occurred while attempting to authenticate: ' . $th->getMessage());

            // Redirect back with a generic error message
            return back()->withErrors([
                'email' => 'An error occurred while attempting to authenticate. Please try again later.',
            ])->onlyInput('email');
        }
    }

    public function register() {
        return Inertia::render('Register');
    }

    public function logout() {
        Auth::logout();
        return redirect()->route('account.login');
    }
}
