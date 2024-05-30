<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_wisatas', function (Blueprint $table) {
            $table->id();
            // $table->enum('status', ['belum tervalidasi', 'sudah tervalidasi']);
            $table->string('bukti_pembayaran');
            $table->string('kontak');
            $table->foreignId('user_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('wisata_id')->constrained('wisatas')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_wisatas');
    }
};
