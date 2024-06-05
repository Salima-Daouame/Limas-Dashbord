<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable = [
        'categoriename',
        'image',
    ];
    public function products()
    {
        return $this->hasMany(Product::class, 'categorie_id');
    }
}
