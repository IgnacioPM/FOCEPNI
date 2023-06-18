<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\Sugerencias;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Validator;


class SugerenciasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $sugerencias = DB::table('sugerencias')
        ->select('sugerencias.*', 'users.nombre', 'users.primerApellido','users.segundoApellido')
        ->join('users','users.id' , "=" ,'sugerencias.idUsuario')
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $sugerencias->where('fecha', '=', $request['query'] )
            ->orWhere('fecha', 'like', '%' . $request['query'] . '%')
            ->orWhere('nombre', 'like', '%' . $request['query'] . '%');
        }

       return response()->json([
        'message' => $sugerencias->paginate($perPage),
        'status' => 'success',
    ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
          //
        $user = User::where('api_token', $request['api_token'])->first();

        $validate = Validator::make($request->all(), [

            'fecha' => 'required|string',
            'sugerencia' => 'required|string|max:100|min:10',
           
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

    
        
        try{
            $usuario = auth()->user()->id;
            
            $registros = DB::table('sugerencias')
            ->join('users','users.id' , "=" ,'sugerencias.idUsuario')
            ->where('sugerencias.idUsuario', "=" , $usuario)
            ->count();

            if($registros < 3){
                $NuevaSugerencia = Sugerencias::create([
                    'fecha' => $request['fecha'],
                    'sugerencia' => $request['sugerencia'],
                    'idUsuario' => $request['idUsuario']
                ]);
                $NuevaSugerencia->save();

                return response()->json([
                    'message' => 'Sugerencia enviada correctamente!',
                    'status' => 'success',
                ]);

            }else{
                return response()->json([
                    'message' => 'No se pudo enviar la sugerencia, solo puede enviar 3',
                    'status' => 'error',
                ]);
            }

        } catch (\Exception $e) {
            return $e->getMessage();
        }
          
    }
    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sugerencias  $sugerencias
     * @return \Illuminate\Http\Response
     */
    public function show(Sugerencias $sugerencias, Request $request)
    {
        //
        $usuario = auth()->user()->id;

        return DB::table('sugerencias')
        ->join('users','users.id' , "=" ,'sugerencias.idUsuario')
        ->where('sugerencias.idUsuario', "=" , $usuario)
        ->get();

    }

    public function showDash(){
        
        $Sugerencias = Sugerencias::all();
        return $Sugerencias;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sugerencias  $sugerencias
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sugerencias $sugerencias)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sugerencias  $sugerencias
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sugerencias $sugerencias, Request $request)
    {
        //
        $post = Sugerencias::FindOrFail($request['id']);

        if (empty($post)) {
            return response()->json([
                'message' => 'Error al eliminar la sugerencia',
                'status' => 'error',
            ]);
        }
         try{

            $eliminarSugerencia = $post->delete();
            $bug = 0;
        }
        catch(\Exception $e){
            $bug = $e->errorInfo[1];
        }

        if ($eliminarSugerencia) {
            return response()->json([
                'message' => 'Sugerencia eliminada correctamente',
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
