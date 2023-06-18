<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\Noticia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Validator;

class NoticiaController extends Controller
{
    protected $news = '';

    public function __construct(Noticia $news)
    {
        $this->middleware('auth:api');
        $this->news = $news;
    }
    
    public function index(Request $request)
    {
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];

        $news = Noticia::orderBy($sortBy, $sortType);
        if ($request['query'] != '') {
            $news->where('nombre', 'like', '%' . $request['query'] . '%');
        }

        return response()->json([
            'message' => $news->paginate($perPage),
            'status' => 'success',
        ]);
    }

    public function store(Request $request)
    {
        //
        $validate = Validator::make($request->all(), [
            'nombre' => 'required|string|max:15|min:5',
            'fecha' => 'required|string',
            'imagen' => 'required|string',
            'descripcion' => 'required|string|max:75|min:15',
            'ubicacion' => 'required|string',
    
            ]);
            if ($validate->fails()) {
                return response()->json([
                    'message' => $validate->errors(),
                    'status' => 'validation-error',
                ], 401);
            }

        if ($request['imagen']) {
            
            $name = time() . '.' . explode('/', explode(':', substr($request['imagen'], 0, strpos ($request['imagen'], ';')))[1])[1];

            (!file_exists(public_path().'/assets/img/noticias/')) ? mkdir(public_path().'/assets/img/noticias/',0777,true) : null;

            \Image::make($request['imagen'])->save(public_path('assets/img/noticias/') . $name);
            $request->merge(['imagen' => $name]);
        }

        try{
            $filtro = $request->nombre;
            $existencia = Noticia::where('nombre', '=' , $filtro)->first();

            if($existencia === null){
                $noticiaNueva = Noticia::create([
                    'nombre' => $request['nombre'],
                    'fecha' => $request['fecha'],
                    'imagen' => $request['imagen'],
                    'descripcion' => $request['descripcion'],
                    'ubicacion' => $request['ubicacion'],
                    'estadoN' => 'Activo',
                ]);
                $noticiaNueva->save();

                return response()->json([
                    'message' => 'Noticia publicada correctamente!',
                    'status' => 'success',
                ]);

            }else{
                return response()->json([
                    'message' => 'No se pudo publicar la noticia!',
                    'success' => false,
                    
                ]);
            }

        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function show(Noticia $noticia)
    {
        //
    }

    public function update(Request $request, Noticia $noticia)
    {
        //
        $news = Noticia::where('id',$request['id'])->first();
        
        if (empty($news)) {
            return response()->json([
                'message' => 'Error al actualizar la noticia',
                'status' => 'error'
            ]);
        }

        $validate = Validator::make($request->all(), [
        'nombre' => 'required|string|max:15|min:5',
        'fecha' => 'required|string',
        'imagen' => 'required|string',
        'descripcion' => 'required|string|max:75|min:15',
        'ubicacion' => 'required|string',

        ]);
        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

        $currentImagen = $news->imagen;
        if ($request->imagen != $currentImagen) {
            $name = time().'.' . explode('/', explode(':', substr($request->imagen, 0, strpos($request->imagen, ';')))[1])[1];
            \Image::make($request->imagen)->save(public_path('/assets/img/noticias/').$name);
            $request->merge(['imagen' => $name]);
            $newsPhoto = public_path('/assets/img/noticias/') . $currentImagen;
            if (file_exists($newsPhoto)) {
                @unlink($newsPhoto);
            }
        }

        $actualizarNoticia = $news->update([
            'nombre' => $request['nombre'],
            'fecha' => $request['fecha'],            
            'imagen' => $request['imagen'],
            'descripcion' => $request['descripcion'],
            'ubicacion' => $request['ubicacion'],

        ]);

        return response()->json([
            'message' => 'Noticia Actualizada!',
            'status' => 'success',
        ]);

        $news->update($request->all());


    }

    public function destroy(Noticia $noticia, Request $request)
    {
        //
        $post =  DB::table('noticias')->where('id','=', $request['id'])->update(['estadoN' => "Inactivo"]);

        if ($post) {
            return response()->json([
                'message' => 'Noticia desactivado correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

    }

    public function habilitar(Noticia $noticia, Request $request)
    {
        //
        $post =  DB::table('noticias')->where('id','=', $request['id'])->update(['estadoN' => "Activo"]);

        if ($post) {
            return response()->json([
                'message' => 'Noticia activada correctamente',
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
