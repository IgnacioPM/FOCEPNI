<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprendimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_Nac',
        'edad',
        'sexo',
        'nacionalidad',
        'nContacto',
        'distrito',
        'estadoCivil',
        'escolaridad',
        'profesion',
        'nPersonasDependientes',
        'nDosis',
    
        'nombreEmprendimiento',
        'direccion',
        'categoria',
        'productoServicio',
        'cantPersonasLaboran',
        'anioInicio',
        'descripcion',
        'activos',
        'estado',
        'descLugarEmprendimiento',
        'planTrabajoAnual',
        'asesoria',
        'reqFormalizacion',
        'administracion',
        'idUsuario',
        'latitud',
        'longitud',
        'observacion'


    ];

}
