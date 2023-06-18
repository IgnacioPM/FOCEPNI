<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\Galeria;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Validator;

class GaleriaController extends Controller
{
    protected $images = '';

    public function __construct(Galeria $images)
    {
        $this->middleware('auth:api');
        $this->images = $images;
    }
    
    public function index(Request $request)
    {
        //

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];

        $images = Galeria::orderBy($sortBy, $sortType);
        if ($request['query'] != '') {
            $images->where('nombre', 'like', '%' . $request['query'] . '%');
        }

        return response()->json([
            'message' => $images->paginate($perPage),
            'status' => 'success',
        ]);

    }

    public function store(Request $request)
    {
        //
        
        $validate = Validator::make($request->all(), [

            'fecha' => 'required|string',
            'nombre' => 'required|string|max:20|min:10',
            'imagen' => 'required|string',
            'descripcion' => 'required|string|max:50|min:10',

           
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

        if ($request['imagen']) {

            $name = time() . '.' . explode('/', explode(':', substr($request['imagen'], 0, strpos ($request['imagen'], ';')))[1])[1];
            (!file_exists(public_path().'/assets/img/galery/')) ? mkdir(public_path().'/assets/img/galery/',0777,true) : null;

            \Image::make($request['imagen'])->save(public_path('assets/img/galery/') . $name);
            $request->merge(['imagen' => $name]);
            
        }

        try{
            $filtro = $request->Id;
            $existencia = Galeria::where('id', '=' , $filtro)->first();

            if($existencia === null){
                $imagenNueva = Galeria::create([
                    'nombre' => $request['nombre'],
                    'fecha' => $request['fecha'],
                    'imagen' => $request['imagen'],
                    'descripcion' => $request['descripcion'],
                    'estadoI' => 'Activo'
                ]);
                $imagenNueva->save();

                return response()->json([
                    'message' => 'Imagen subida correctamente!',
                    'status' => 'success',
                ]);

            }else{
                return response()->json([
                    'message' => 'No se pudo subir la imagen!',
                    'success' => false,
                    
                ]);
            }

        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }
   
    public function show(Galeria $galeria)
    {
        //
        $imagenes = Galeria::all();
        return $imagenes;
    }

    public function update(Request $request)
    {
        //
        //$user = User::where('api_token',$request['api_token'])->first();

        $images = Galeria::where('id',$request['id'])->first();
        
        if (empty($images)) {
            return response()->json([
                'message' => 'Error al actualizar la imagen',
                'status' => 'error'
            ]);
        }
        $validate = Validator::make($request->all(), [

            'fecha' => 'required|string',
            'nombre' => 'required|string|max:20|min:10',
            'imagen' => 'required|string',
            'descripcion' => 'required|string|max:50|min:10',

           
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

         $currentImagen = $images->imagen;
        if ($request->imagen != $currentImagen) {
            $name = time().'.' . explode('/', explode(':', substr($request->imagen, 0, strpos($request->imagen, ';')))[1])[1];
            \Image::make($request->imagen)->save(public_path('/assets/img/galery/').$name);
            $request->merge(['imagen' => $name]);
            $galPhoto = public_path('/assets/img/galery/') . $currentImagen;
            if (file_exists($galPhoto)) {
                @unlink($galPhoto);
            }
        } 

        $actualizarImagen = $images->update([
            'nombre' => $request['nombre'],
            'fecha' => $request['fecha'],            
            'imagen' => $request['imagen'],
            'descripcion' => $request['descripcion'],
        ]);

        return response()->json([
            'message' => 'Imagen Actualizada!',
            'status' => 'success',
        ]);

        $images->update($request->all());


    }

    public function destroy(Request $request, Galeria $galeria)
    {
        //
        $post =  DB::table('galerias')->where('id','=', $request['id'])->update(['estadoI' => "Inactivo"]);

        if ($post) {
            return response()->json([
                'message' => 'Imagen desactivado correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

    }

    public function habilitar(Galeria $galeria, Request $request )
    {
        //
        $post =  DB::table('galerias')->where('id','=', $request['id'])->update(['estadoI' => "Activo"]);

        if ($post) {
            return response()->json([
                'message' => 'Se ha habilitado la imagen correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }
    }

}
