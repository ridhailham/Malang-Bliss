<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WisataController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/Dashboard');
})->name('admin.dashboard');

Route::get('/admin/product', function () {
    return Inertia::render('admin/Pages/Product');
})->name('admin.product');



Route::get('/admin/user', [UserController::class, 'index'])->name('admin.user.index');
Route::get('/admin/user/create', [UserController::class, 'create'])->name('admin.user.create');
Route::post('/admin/user/store', [UserController::class, 'store'])->name('admin.user.store');
Route::get('/admin/user/{id}', [UserController::class, 'edit'])->name('admin.user.edit');
Route::post('/admin/user/{id}', [UserController::class, 'update'])->name('admin.user.update');
Route::delete('/admin/user/{id}', [UserController::class, 'destroy'])->name('admin.user.destroy');



Route::get('/admin/wisata', [WisataController::class, 'index'])->name('admin.wisata.index');
Route::get('/admin/wisata/create', [WisataController::class, 'create'])->name('admin.wisata.create');
Route::post('/admin/wisata/store', [WisataController::class, 'store'])->name('admin.wisata.store');
Route::get('/admin/wisata/{id}', [WisataController::class, 'edit'])->name('admin.wisata.edit');
Route::post('/admin/wisata/{id}', [WisataController::class, 'update'])->name('admin.wisata.update');
Route::delete('/admin/wisata/{id}', [WisataController::class, 'destroy'])->name('admin.wisata.destroy');



Route::get('/admin/hotel', [HotelController::class, 'index'])->name('admin.hotel.index');
Route::get('/admin/hotel/create', [HotelController::class, 'create'])->name('admin.hotel.create');
Route::post('/admin/hotel/store', [HotelController::class, 'store'])->name('admin.hotel.store');
Route::get('/admin/hotel/{id}', [HotelController::class, 'edit'])->name('admin.hotel.edit');
Route::post('/admin/hotel/{id}', [HotelController::class, 'update'])->name('admin.hotel.update');
Route::delete('/admin/hotel/{id}', [HotelController::class, 'destroy'])->name('admin.hotel.destroy');


Route::get('/admin/reset', [AdminController::class, 'edit'])->name('admin.hotel.edit');
Route::put('/admin/reset/{id}', [AdminController::class, 'update'])->name('admin.reset');