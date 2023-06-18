<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\Producto;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use App\Mail\MailSolicitud;
use App\Mail\MailSolicitudAcept;
use Illuminate\Support\Facades\Mail;

class ProductoController extends Controller
{
    protected $products = '';

    public function __construct(Producto $products)
    {
        $this->middleware('auth:api');
        $this->products = $products;
    }
   
    public function index(Request $request)
    {
        //
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $productos = DB::table('emprendimientos')
        ->select('productos.*', 'users.id AS uid', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'emprendimientos.profesion',
        'users.identificacion', 'users.email','emprendimientos.idUsuario', 'emprendimientos.nombreEmprendimiento', 'emprendimientos.distrito' ,
        'emprendimientos.nContacto', 'emprendimientos.direccion', 'emprendimientos.categoria','emprendimientos.nacionalidad','emprendimientos.productoServicio')
        ->join('productos', 'emprendimientos.idUsuario' , '=', 'productos.idUser')
        ->join('users','productos.idUser', '=', 'users.id')
        ->where('users.state','=', 'Activo')
        ->where( 'productos.pState', '=', "Espera")
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $productos->where('productos.nombreP', '=', $request['query'] );
            $productos->orWhere('categoriaP', '=', $request['query'] );
            $productos->orWhere('pState', '=', $request['query'] );
        }

       return response()->json([
        'message' => $productos->paginate($perPage),
        'status' => 'success',
        ]);

    }

    public function indexView(Request $request)
    {
        //
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $products = DB::table('emprendimientos')
        ->select('productos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'emprendimientos.profesion',
        'users.identificacion', 'users.email','emprendimientos.idUsuario', 'emprendimientos.nombreEmprendimiento', 'emprendimientos.distrito' ,
        'emprendimientos.nContacto', 'emprendimientos.direccion', 'emprendimientos.categoria','emprendimientos.nacionalidad','emprendimientos.productoServicio')
        ->join('productos', 'emprendimientos.idUsuario' , '=', 'productos.idUser')
        ->join('users','productos.idUser', '=', 'users.id')
        ->where('users.state','=', 'Activo')
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $products->where('productos.nombreP', '=', $request['query'] );
            $products->orWhere('categoriaP', '=', $request['query'] );
            $products->orWhere('pState', '=', $request['query'] );
        }

       return response()->json([
        'message' => $products->paginate($perPage),
        'status' => 'success',
        ]);

    }

    public function store(Request $request)
    {
        //
        $validate = Validator::make($request->all(), [
            'nombreP' => 'required|string|max:15',
            'imagenP' => 'required|string',
            'descripcion' => 'required|string|min:10|max:20',
            'categoriaP' => 'required|string',
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

        if ($request['imagenP']) {
            $name = time() . '.' . explode('/', explode(':', substr($request['imagenP'], 0, strpos ($request['imagenP'], ';')))[1])[1];
            (!file_exists(public_path().'/assets/img/productos/')) ? mkdir(public_path().'/assets/img/productos/',0777,true) : null;

            \Image::make($request['imagenP'])->save(public_path('assets/img/productos/') . $name);
            $request->merge(['imagenP' => $name]);
        }

       

        try{
           
                $productoNuevo = Producto::create([
                    'nombreP' => $request['nombreP'],
                    'imagenP' => $request['imagenP'],
                    'descripcion' => $request['descripcion'],
                    'categoriaP' => $request['categoriaP'],
                    'idUser'  => $request['idUser'],
                    'pState' => $request['pState'],

                ]);
                $productoNuevo->save();

                return response()->json([
                    'message' => 'Producto publicada correctamente!',
                    'status' => 'success',
                ]);


        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function showP()
{
    //
    $usuario = auth()->user()->id;

    $p = Producto::where('idUser',$usuario)->get();
        return $p;

}

    public function show(Producto $producto, Request $request)
    {
        //
        $usuario = auth()->user()->id;

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];

        $emprendimientos = DB::table('productos')
        ->select('productos.*')
        ->join('users','users.id' , "=" ,'productos.idUser')
        ->where('productos.idUser', "=" , $usuario)
        ->orderBy($sortBy ,$sortType);

        return response()->json([
            'message' => $emprendimientos->paginate($perPage),
            'status' => 'success',
        ]);

    }

    public function update(Request $request, Producto $producto)
    {
        //
        $prod = Producto::where('id', $request['idP'])->first();
        
        if (empty($prod)) {
            return response()->json([
                'message' => 'Error al actualizar la imagen',
                'status' => 'error'
            ]);
        }

        $validate = Validator::make($request->all(), [
        'nombreP' => 'required|string',
        'categoriaP' => 'required|string',
        'imagenP' => 'required|string',
        'descripcion' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

        $currentImagen = $prod->imagenP;
        if ($request->imagenP != $currentImagen) {
            $name = time().'.' . explode('/', explode(':', substr($request->imagenP, 0, strpos($request->imagenP, ';')))[1])[1];
            \Image::make($request->imagenP)->save(public_path('/assets/img/producto/').$name);
            $request->merge(['imagenP' => $name]);
            $galPhoto = public_path('/assets/img/producto/') . $currentImagen;
            if (file_exists($galPhoto)) {
                @unlink($galPhoto);
            }
        }

        $actualizarImagen = $prod->update([
            'nombreP' => $request['nombreP'],
            'categoriaP' => $request['categoriaP'],            
            'imagenP' => $request['imagenP'],
            'descripcion' => $request['descripcion'],
            'pState' => 'Espera'
        ]);

        return response()->json([
            'message' => 'Imagen Actualizada!',
            'status' => 'success',
        ]);

        $prod->update($request->all());

        

    }

    public function destroy(Producto $producto, Request $request )
    {
        //
        $post =  DB::table('productos')->where('id','=', $request['idP'])->update(['pState' => "Desactivado"]);

        if ($post) {
            return response()->json([
                'message' => 'Producto desactivado correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }
    }

    public function habilitar(Producto $producto, Request $request )
    {
        //
        $post =  DB::table('productos')->where('id','=', $request['idP'])->update(['pState' => "Espera"]);

        if ($post) {
            return response()->json([
                'message' => 'Se ha enviado la solicitud de producto nuevamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }
    }

    public function acept(Request $request, Producto $producto)
    {
        //
        $Datos = DB::table('users')
        ->join('productos', 'users.id', '=', 'productos.idUser')
        ->select('users.*')->where('productos.id','=', $request['id'])
        ->first();

        
        $email = $Datos->email;
        $messages = $request['Observacion'];

        $product = DB::table('productos')->where('id','=', $request['id'])->update(['pState' => 'Aceptado']);
        $productObser = DB::table('productos')->where('id','=', $request['id'])->update(['observacion' => $messages]);
         

        if ($product && $productObser) {
            Mail::to($email)->send(new MailSolicitudAcept($email,$messages));
            return response()->json([
                'message' => 'Solicitud Aceptada',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }
       

    }

    public function deny(Request $request, Producto $producto)
    {
        //

        $Datos = DB::table('users')
        ->join('productos', 'users.id', '=', 'productos.idUser')
        ->select('users.*')->where('productos.id','=', $request['id'])
        ->first();

        
        $email = $Datos->email;
        $messages = $request['Observacion'];

        $us = DB::table('productos')->where('id','=', $request['id'])->update(['pState' => "Rechazado"]);
        $productObser = DB::table('productos')->where('id','=', $request['id'])->update(['observacion' => $messages]);

        if ($us && $productObser) {

            Mail::to($email)->send(new MailSolicitud($email,$messages));
            return response()->json([
                'message' => 'Solicitud Rechazada ',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

        /* $us = DB::table('productos')->where('id','=', $request['idP'])->update(['pState' => "Rechazado"]);

        if ($us) {
            return response()->json([
                'message' => 'Solicitud Rechazada ',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        } */
       

    }
}
