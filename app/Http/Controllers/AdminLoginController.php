<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminLoginController extends Controller
{
    public function index() {
        return Inertia::render('admin/AdminLogin');
    }

    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
 
        if (Auth::guard('admin')->attempt($credentials)) {
            // $request->session()->regenerate();
 
            // return redirect()->intended('dashboard');

            if(Auth::guard('admin')->user()->role != "admin") {
                Auth::guard('admin')->logout();
                return Inertia::location('/admin/login');
            }

            return Inertia::location('/admin/home');
        } 
 
        return Inertia::location('/admin/login');

    }

    public function logout() {
        Auth::guard('admin')->logout();
        return Inertia::location('/admin/login');
    }
}
