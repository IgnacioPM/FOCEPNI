<?php

namespace App\Http\Controllers\API\ClienteAPI;

use App\Models\Producto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ServicesShowController extends Controller
{

public function show()
{
    //
    $productos = DB::table('emprendimientos')
    ->select('productos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 
    'users.identificacion', 'users.email','emprendimientos.idUsuario', 'emprendimientos.nombreEmprendimiento', 'emprendimientos.distrito' ,
    'emprendimientos.nContacto', 'emprendimientos.direccion', 'emprendimientos.categoria','emprendimientos.nacionalidad','emprendimientos.productoServicio','emprendimientos.latitud','emprendimientos.longitud')
    ->join('productos', 'emprendimientos.idUsuario' , '=', 'productos.idUser')
    ->join('users','productos.idUser', '=', 'users.id')
    ->where('users.state','=', 'Activo')
    ->where('productos.pState', '=', "Aceptado")
    ->where('productos.categoriaP','=', 'Servicios')
    ->get();

    return $productos;

}

}