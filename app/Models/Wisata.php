<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wisata extends Model
{
    use HasFactory;

    protected $table = 'wisatas';

    
    protected $fillable = [
        'name',
        'lokasi',
        'kontak',
        'instagram',
        'harga',
        'image',
        'deskripsi',
       
    ];

    public function orderWisata()
    {
        return $this->hasMany(OrderWisata::class, 'wisata_id', 'id');
    }
}
