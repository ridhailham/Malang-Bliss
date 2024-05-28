<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class User extends Controller
{
    public function userData()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }
}
