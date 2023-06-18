<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\User;
use App\Models\Emprendimiento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Mail\MailSolicitudEm;
use App\Mail\MailSolicitudEmAcept;
use Illuminate\Support\Facades\Mail;

class EmprendimientoController extends Controller
{
    protected $emprendimiento = '';

    public function __construct(Emprendimiento $emprendimiento)
    {
        $this->middleware('auth:api');
        $this->emprendimiento = $emprendimiento;
    }
    
    public function index(Request $request)
    {
        //
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $emprendimientos = DB::table('emprendimientos')
        ->select('emprendimientos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'users.identificacion', 'users.email')
        ->join('users','users.id' , "=" ,'emprendimientos.idUsuario')
        ->where( 'users.state', '=', "Espera" )
        ->where( 'emprendimientos.estado', '=', "Espera" )
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $emprendimientos->where('productoServicio', '=', $request['query'] )
            ->orWhere('anioInicio', '=', $request['query'])
           ->orWhere('distrito', '=', $request['query']);
        }

       return response()->json([
        'message' => $emprendimientos->paginate($perPage),
        'status' => 'success',
        ]);

    }

    public function indexView(Request $request)
    {
        //
        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $emprendimientos = DB::table('emprendimientos')
        ->select('emprendimientos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'users.identificacion', 'users.email')
        ->join('users','users.id' , "=" ,'emprendimientos.idUsuario')
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $emprendimientos->where('productoServicio', '=', $request['query'] )
            ->orWhere('anioInicio', '=', $request['query'])
           ->orWhere('distrito', '=', $request['query']);
        }

       return response()->json([
        'message' => $emprendimientos->paginate($perPage),
        'status' => 'success',
        ]);

    }

    public function store(Request $request)
    {
        //
        $validate = Validator::make($request->all(), [
            
            'fecha_Nac' => 'required|date',
            'edad' => 'required|int|between:18,99',
            'sexo' => 'required|string',
            'nacionalidad' => 'required|string',
            'nContacto' => 'required|string',
            'distrito' => 'required|string',
            'estadoCivil' => 'required|string',
            'escolaridad' => 'required|string',
            'profesion' => 'required|string',
            'nPersonasDependientes' => 'required|integer',
            'nDosis'=> 'required|string',
            'nombreEmprendimiento'=> 'required|string',
            'direccion'=> 'required|string',
            'categoria'=> 'required|string',
            'productoServicio'=> 'required|string',
            'cantPersonasLaboran'=> 'required|integer',
            'anioInicio'=> 'required|string',
            'descripcion'=> 'required|string|max:30|min:15',
            'activos'=> 'required|string',
            'estado'=> 'required|string',
            'descLugarEmprendimiento'=> 'required|string',
            'planTrabajoAnual'=> 'required|string',
            'asesoria'=> 'required|string',
            'reqFormalizacion'=> 'required|string',
            'administracion'=> 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

        try{

            $usuario = auth()->user()->id;

            $registros = DB::table('emprendimientos')
            ->join('users','users.id' , "=" ,'emprendimientos.idUsuario')
            ->where('emprendimientos.idUsuario', "=" , $usuario)
            ->count(); 
            
            if($registros < 3){

                $NuevoEmprendedor = Emprendimiento::create([
                'fecha_Nac' => $request['fecha_Nac'],
                'sexo' => $request['sexo'],
                'nacionalidad' => $request['nacionalidad'],
                'nContacto' => $request['nContacto'],
                'distrito' => $request['distrito'],
                'estadoCivil' => $request['estadoCivil'],
                'escolaridad' => $request['escolaridad'],
                'profesion' => $request['profesion'],
                'nPersonasDependientes' => $request['nPersonasDependientes'],
                'nDosis' => $request['nDosis'],
                'nombreEmprendimiento' => $request['nombreEmprendimiento'],
                'direccion' => $request['direccion'],
                'categoria' => $request['categoria'],
                'productoServicio' => $request['productoServicio'],
                'cantPersonasLaboran' => $request['cantPersonasLaboran'],
                'anioInicio' => $request['anioInicio'],
                'descripcion' => $request['descripcion'],
                'activos' => $request['activos'],
                'estado' => $request['estado'],
                'descLugarEmprendimiento' => $request['descLugarEmprendimiento'],
                'planTrabajoAnual' => $request['planTrabajoAnual'],
                'asesoria' => $request['asesoria'],
                'reqFormalizacion' => $request['reqFormalizacion'],
                'administracion' => $request['administracion'],
                'idUsuario' => $request['idUsuario']
            ]);
    
            $NuevoEmprendedor->save();

            $usuario = auth()->user()->id;

            $us = DB::table('users')->where('id', $usuario)->update(['state' => "Espera"]);
                                   
            return response()->json([
                
                'message' => 'Solicitud enviada correctamente!',
                'status' => 'success',
            ]);
            
            }else{
                return response()->json([
                    'message' => 'Solo puedes enviar una solicitud',
                    'status' => 'error',
                ]);
            }
    
            
        }catch (\Exception $e) {
            return $e->getMessage();
        }
       

        if ($NuevoEmprendedor) {
            return response()->json([
                'message' => 'Solicitud enviada correctamente!',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

    }

    public function addDataGeo(Request $request)
    {

        $validate = Validator::make($request->all(), [
            
            'latitud' => 'required|string',
            'longitud' => 'required|string',
          
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

       $lat = DB::table('emprendimientos')->where('idE','=', $request['id'])->update(['latitud' => $request['latitud']]);
       $long = DB::table('emprendimientos')->where('idE','=', $request['id'])->update(['longitud' => $request['longitud']]);

        if ($lat) {
            return response()->json([
                'message' => 'Georreferenciación guardada correctamente',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }

        if ($long) {
            return response()->json([
                'message' => 'Guardado correctamente',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }

    }

    public function delGeo(Request $request)
    {


       $lat = DB::table('emprendimientos')->where('idE','=', $request['idE'])->update(['latitud' => null]);
       $long = DB::table('emprendimientos')->where('idE','=', $request['idE'])->update(['longitud' => null]);

        if ($lat) {
            return response()->json([
                'message' => 'Georreferenciación georreferenciación eliminada',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }

        if ($long) {
            return response()->json([
                'message' => 'Georreferenciación eliminada',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }

    }

    public function showDash(Emprendimiento $emprendimiento)
    {
        //
        $Emprendedores = User::where('users.tipo_usuario', '=', 'emprendedor')->where('users.state', '=', 'Activo')->get();
        return $Emprendedores;

    }

    public function show(Emprendimiento $emprendimiento)
    {
        //
    }

    public function update(Request $request, Emprendimiento $emprendimiento)
    {
        //
        

        $validate = Validator::make($request->all(), [
            
            'Observacion' => 'required|string|max:100|min:5',
            
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

        $Datos = DB::table('users')
        ->join('emprendimientos', 'users.id', '=', 'emprendimientos.idUsuario')
        ->select('users.*')->where('id','=', $request['id'])
        ->first();
        
        $email = $Datos->email;
        $messages = $request['Observacion'];

            $us = DB::table('users')->where('id','=', $request['id'])->update(['state' => "Activo"]);
            $emp = DB::table('emprendimientos')->where('idUsuario','=', $request['id'])->update(['estado' => "Activo"]);
            $emp = DB::table('emprendimientos')->where('idUsuario','=', $request['id'])->update(['observacion' => $request['Observacion']]);

        if ($us && $emp) {
            Mail::to($email)->send(new MailSolicitudEmAcept($email,$messages));
            return response()->json([
                'message' => 'Solicitud aceptada',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => 'Ocurrió un problema',
                'status' => 'error',
            ]);
        }
       

    }

    public function deny(Request $request, Emprendimiento $emprendimiento)
    {
        //

        $Datos = DB::table('users')
        ->join('emprendimientos', 'users.id', '=', 'emprendimientos.idUsuario')
        ->select('users.*')->where('id','=', $request['id'])
        ->first();
        
        $email = $Datos->email;
        $messages = $request['Observacion'];

            $us = DB::table('users')->where('id','=', $request['id'])->update(['state' => "Rechazado"]);
            $emp = DB::table('emprendimientos')->where('idUsuario','=', $request['id'])->update(['estado' => "Rechazado"]);
            $del = Emprendimiento::where('idUsuario','=', $request['id'])->delete();

           


        if ($us && $emp && $del) {
            Mail::to($email)->send(new MailSolicitudEm($email,$messages));

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
       

    }


    public function destroy(Emprendimiento $emprendimiento)
    {
        //
    }
}
