<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderWisata extends Model
{
    use HasFactory;

    protected $table = 'order_wisatas';

    protected $fillable = [
        'status',
        'user_id',
        'wisata_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function wisata()
    {
        return $this->belongsTo(Wisata::class, 'wisata_id', 'id');
    }
}
