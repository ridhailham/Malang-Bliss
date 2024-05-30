<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\User;
use App\Models\Wisata;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Wisata::factory(10)->create();

        // Hotel::factory(10)->create();


        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin'),
            'remember_token' => Str::random(10),
            'role' => 'admin'
        ]);

        
    }
}
