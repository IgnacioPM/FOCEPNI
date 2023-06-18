<?php

namespace App\Http\Controllers\API\ClienteAPI;

use App\Models\Noticia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NoticiaShowController extends Controller
{

public function show()
{
    //
    $noticias = Noticia::where('estadoN','Activo')->get();
        return $noticias;

}

}