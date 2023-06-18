<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repositorio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'estadoD',
        'fecha',
        'archivo',
    ];

}
