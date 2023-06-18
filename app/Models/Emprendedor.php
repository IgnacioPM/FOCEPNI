<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprendedor extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecNacimiento',
        'sexo',
        'nacionalidad',
        'telefonoContacto',
        'distrito',
        'estadoCivil',
        'escolaridad',
        'profesion',
        'nPersonasDependientes',
        'nDosis',
        'usuario_identificacion'
    ];

}

    