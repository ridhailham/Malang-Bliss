<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminHotelController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminWisataController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderHotelController;
use App\Http\Controllers\OrderWisataController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WisataController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::fallback(function () {
    return Inertia::render('Fallback')->toResponse(request());
});


Route::get('/', function () {
    return Redirect::to('/home');
});


Route::prefix('/')->group(function () {
    
    Route::get('/home', [HomeController::class, 'index'])->name('account.index');


    Route::get('/hotel', [HotelController::class, 'index']);
    Route::get('/hotel/asc', [HotelController::class, 'ascHarga']);
    Route::get('/hotel/desc', [HotelController::class, 'descHarga']);
    Route::get('/hotel/{id}', [HotelController::class, 'show']);
    Route::post('/hotel/filter', [HotelController::class, 'filterHarga']);

    Route::get('/hotel/order/{id}', [OrderHotelController::class, 'bayar']);
    Route::post('/hotel/order', [OrderHotelController::class, 'store']);
    Route::get('/hotel/order/riwayat', [OrderHotelController::class, 'index']);
    Route::get('/hotel/order/riwayat/{id}', [OrderHotelController::class, 'show']);

    Route::get('/destinasi', [WisataController::class, 'index']);
    Route::get('/destinasi/asc', [WisataController::class, 'ascHarga']);
    Route::get('/destinasi/desc', [WisataController::class, 'descHarga']);
    Route::get('/destinasi/{id}', [WisataController::class, 'show']);
    Route::post('/destinasi/filter', [WisataController::class, 'filterHarga']);
    
    Route::get('/destinasi/order/{id}', [OrderWisataController::class, 'bayar']);
    Route::post('/destinasi/order', [OrderWisataController::class, 'store']);
    Route::get('/destinasi/order/riwayat', [OrderWisataController::class, 'index']);
    Route::get('/destinasi/order/riwayat/{id}', [OrderWisataController::class, 'show']);
    Route::middleware('user.guest')->group(function () {
        
        
        Route::get('/login', [LoginController::class, 'index'])->name('account.login');
        Route::post('/authenticate', [LoginController::class, 'authenticate'])->name('account.authenticate');

        Route::get('/register', [RegisterController::class, 'index'])->name('account.register');
        Route::post('/process-register', [RegisterController::class, 'store'])->name('account.processRegister');
    });

    Route::middleware('user.auth')->group(function () {

        // Route::get('/auth/user-data', [User::class, 'userData']);
        Route::get('/profile/{id}', [UserController::class, 'show'])->name('auth.user.show');
        Route::get('/editnama/{id}', [UserController::class, 'editNama'])->name('auth.user.editNama');
        Route::get('/editpassword/{id}', [UserController::class, 'editPassword'])->name('auth.user.editPassword');
        Route::post('/updatenama/{id}', [UserController::class, 'updateNama'])->name('auth.user.updateNama');
        Route::post('/updatepassword/{id}', [UserController::class, 'updatePassword'])->name('auth.user.updatePassword');
        Route::get('/riwayatorder/{id}', [UserController::class, 'showRiwayatOrder'])->name('auth.user.riwayatOrder');
        Route::get('/logout', [LoginController::class, 'logout'])->name('auth.logout');
    });
});



Route::prefix('/admin')->group(function () {

    Route::group(['middleware' => 'admin.guest'], function () {
        // middleware('admin.guest')->
        Route::get('/login', [AdminLoginController::class, 'index'])->name('admin.login');
        Route::post('/authenticate', [AdminLoginController::class, 'authenticate'])->name('admin.authenticate');
    });

    Route::middleware(['middleware' => 'admin.auth'])->group(function () {
        // middleware('auth')
        Route::get('/home', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');

        Route::get('/user', [AdminUserController::class, 'index'])->name('admin.user.index');
        Route::get('/user/create', [AdminUserController::class, 'create'])->name('admin.user.create');
        Route::post('/user/store', [AdminUserController::class, 'store'])->name('admin.user.store');
        Route::get('/user/{id}', [AdminUserController::class, 'edit'])->name('admin.user.edit');
        Route::post('/user/{id}', [AdminUserController::class, 'update'])->name('admin.user.update');
        Route::delete('/user/{id}', [AdminUserController::class, 'destroy'])->name('admin.user.destroy');

        Route::get('/wisata', [AdminWisataController::class, 'index'])->name('admin.wisata.index');
        Route::get('/wisata/create', [AdminWisataController::class, 'create'])->name('admin.wisata.create');
        Route::post('/wisata/store', [AdminWisataController::class, 'store'])->name('admin.wisata.store');
        Route::get('/wisata/{id}', [AdminWisataController::class, 'edit'])->name('admin.wisata.edit');
        Route::post('/wisata/{id}', [AdminWisataController::class, 'update'])->name('admin.wisata.update');
        Route::delete('/wisata/{id}', [AdminWisataController::class, 'destroy'])->name('admin.wisata.destroy');

        Route::get('/hotel', [AdminHotelController::class, 'index'])->name('admin.hotel.index');
        Route::get('/hotel/create', [AdminHotelController::class, 'create'])->name('admin.hotel.create');
        Route::post('/hotel/store', [AdminHotelController::class, 'store'])->name('admin.hotel.store');
        Route::get('/hotel/{id}', [AdminHotelController::class, 'edit'])->name('admin.hotel.edit');
        Route::post('/hotel/{id}', [AdminHotelController::class, 'update'])->name('admin.hotel.update');
        Route::delete('/hotel/{id}', [AdminHotelController::class, 'destroy'])->name('admin.hotel.destroy');

        Route::get('/reset', [AdminController::class, 'edit'])->name('admin.hotel.edit');
        Route::put('/reset/{id}', [AdminController::class, 'update'])->name('admin.reset');
    });
    
});



// Rute yang dilindungi oleh middleware auth dan admin
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->name('admin.dashboard');
});
