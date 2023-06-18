<?php

namespace App\Http\Controllers\API\ClienteAPI;

use App\Models\Galeria;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GaleriaShowController extends Controller
{

public function show()
{
    //
    $imagenes = Galeria::where('estadoI','Activo')->get();
        return $imagenes;

}

}