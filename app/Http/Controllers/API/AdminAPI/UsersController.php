<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Validator;
use Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    protected $users = '';

    public function __construct(User $users)
    {
        $this->middleware('auth:api');
        $this->users = $users;
    }

    public function show(Request $request){

        $user = User::where('api_token', $request['api_token'])->first();

        $users = User::where('tipo_usuario','SuperAdmin')
        ->orWhere('tipo_usuario','Admin')
        ->get();
        //$users = User::all();
        return $users;

    }

    public function showAll(Request $request){

        $user = User::where('api_token', $request['api_token'])->first();

        $users = User::all();
        return $users;

    }

    public function listData(Request $request)
    {
        $user = User::where('api_token', $request['api_token'])->first();

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $users = User::where('users.tipo_usuario','like', '%' . 'admin' . '%')->orderBy($sortBy, $sortType);

        if ($request['query'] != '') {
            $users->where('state', '=', $request['query'] )
            ->orWhere('identificacion', 'like', '%' . $request['query'] . '%')
            ->orWhere('nombre', 'like', '%' . $request['query'] . '%')
            ->orWhere('email', 'like', '%' . $request['query'] . '%')
            ->orWhere('primerApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('segundoApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('tipo_usuario', 'like', '%' . $request['query'] . '%');
        }
        
        return response()->json([
            'message' => $users->paginate($perPage),
            'status' => 'success',
        ]);

    }

    public function listDataEmp(Request $request)
    {
        $user = User::where('api_token', $request['api_token'])->first();

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $users = DB::table('emprendimientos')
        ->select('emprendimientos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'users.identificacion', 'users.email', 'users.tipo_usuario', 'users.state')
        ->join('users','users.id' , "=" ,'emprendimientos.idUsuario')
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $users->where('state', '=', $request['query'] )
            ->orWhere('identificacion', 'like', '%' . $request['query'] . '%')
            ->orWhere('nombre', 'like', '%' . $request['query'] . '%')
            ->orWhere('email', 'like', '%' . $request['query'] . '%')
            ->orWhere('primerApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('segundoApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('tipo_usuario', 'like', '%' . $request['query'] . '%');
        }
        
        return response()->json([
            'message' => $users->paginate($perPage),
            'status' => 'success',
        ]);

    }

    public function listDataGeo(Request $request)
    {
        $user = User::where('api_token', $request['api_token'])->first();

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];


        $users = DB::table('emprendimientos')
        ->select('emprendimientos.*', 'users.id', 'users.nombre', 'users.primerApellido', 'users.segundoApellido', 'users.identificacion', 'users.email')
        ->join('users','users.id' , "=" ,'emprendimientos.idUsuario')
        ->where( 'users.state', '=', "Activo" )
        ->orderBy($sortBy ,$sortType);

        if ($request['query'] != '') {
            $users->where('state', '=', $request['query'] )
            ->orWhere('identificacion', 'like', '%' . $request['query'] . '%')
            ->orWhere('nombre', 'like', '%' . $request['query'] . '%')
            ->orWhere('email', 'like', '%' . $request['query'] . '%')
            ->orWhere('primerApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('segundoApellido', 'like', '%' . $request['query'] . '%')
            ->orWhere('tipo_usuario', 'like', '%' . $request['query'] . '%');
        }
        
        return response()->json([
            'message' => $users->paginate($perPage),
            'status' => 'success',
        ]);

    }

    public function create(Request $request)
    {
        $user = User::where('api_token', $request['api_token'])->first();


       $validate = Validator::make($request->all(), [
            'identificacion' => 'required|string|unique:users',
            'nombre' => 'required|string',
            'primerApellido' => 'required|string',
            'segundoApellido' => 'required|string',
            'tipo_usuario' => 'required|string',
            'state' => 'required|string',
            'imagen' => 'string|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

        
        if ($request['imagen']) {
            $name = time() . '.' . explode('/', explode(':', substr($request['imagen'], 0, strpos ($request['imagen'], ';')))[1])[1];
            (!file_exists(public_path().'/assets/img/profiles/')) ? mkdir(public_path().'/assets/img/profiles/',0777,true) : null;

            \Image::make($request['imagen'])->save(public_path('assets/img/profiles/') . $name);
            $request->merge(['imagen' => $name]);

        }
        try{
            $filtro = $request->identificacion;
        $existencia = User::where('identificacion', '=' , $filtro)->first();

            if($existencia === null){
                $usuarioNuevo = User::create([
                'identificacion' => $request['identificacion'],
                'nombre' => $request['nombre'],
                'primerApellido' => $request['primerApellido'],
                'segundoApellido' => $request['segundoApellido'],
                'tipo_usuario' => $request['tipo_usuario'],
                'imagen' => $request['imagen'],
                'state' => $request['state'],
                'email' => $request['email'],
                'password' => bcrypt($request->password),
                'api_token' => Str::random(80),
        ]);
        $usuarioNuevo->save();

        $token = Str::random(80);

        $usuarioNuevo->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();

        return response()->json([
            'message' => 'Usuario Creado!',
            'status' => 'success',
        ]);
            }else{
                return response()->json([
                    'message' => 'Ocurrio un problema, ya existe un usuario con esa identificación!',
                    'status' => 'error',
                ]);
            }
       
        } catch (\Exception $e) {
            return $e->getMessage();
        }
        
    }

    public function update(Request $request)
    {
        $user = User::where('api_token',$request['api_token'])->first();

        $users = User::where('id',$request['id'])->first();

        if(auth()->user()->tipo_usuario == "SuperAdmin"){
        

        if (empty($users)) {
            return response()->json([
                'message' => 'Error al actualizar el usuario',
                'status' => 'error'
            ]);
        }
        $validate = Validator::make($request->all(), [
            'identificacion' => 'required|string',
            'nombre' => 'required|string',
            'primerApellido' => 'required|string',
            'tipo_usuario' => 'required|string',
            'state' => 'required|string',
            'imagen' => 'string',
            'email' => 'required|email|unique:users,email,' . $users->id . ',id',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        }

  /*       $currentImagen = $users->imagen;
        if ($request->imagen != $currentImagen) {
            $name = time().'.' . explode('/', explode(':', substr($request->imagen, 0, strpos($request->imagen, ';')))[1])[1];
            \Image::make($request->imagen)->save(public_path('/assets/img/profiles/').$name);
            $request->merge(['imagen' => $name]);
            $userPhoto = public_path('/assets/img/profiles/') . $currentImagen;
            if (file_exists($userPhoto)) {
                @unlink($userPhoto);
            }
        }  */

        if (!empty($request->password)) {
            $request->merge(['password' => bcrypt($request['password'])]);
        }


        $actualizarUsuario = $users->update([
            'identificacion' => $request['identificacion'],
            'nombre' => $request['nombre'],
            'primerApellido' => $request['primerApellido'],
            'segundoApellido' => $request['segundoApellido'],
            'tipo_usuario' => $request['tipo_usuario'],
            'imagen' => $request['imagen'],
            'state'  => $request['state'],
            'email' => $request['email']
        ]);

        return response()->json([
            'message' => 'Usuario Actualizado!',
            'status' => 'success',
        ]);

        $users->update($request->all());

        }else{
            return response()->json([
                'message' => 'Para editar un usuario debe ser Super Administrador!',
                'status' => 'error',
            ]);
        }

    }

    public function destroy(Request $request)
    {
        
        $users = User::where('api_token', $request['api_token'])->first();

        $post = User::FindOrFail($request['id']);

        if(auth()->user()->tipo_usuario == "SuperAdmin" )
        {

            if (empty($post)) {
                return response()->json([
                    'message' => 'Error al eliminar el usuario',
                    'status' => 'error',
                ]);
            }
    
            if(file_exists('assets/img/profiles/'.$post->imagen) AND !empty($post->imagen)){
                unlink('assets/img/profiles/'.$post->imagen);
             }
             try{
    
                $eliminarUsuario = $post->delete();
                $bug = 0;
            }
            catch(\Exception $e){
                $bug = $e->errorInfo[1];
            }
    
            if ($eliminarUsuario) {
                return response()->json([
                    'message' => 'Usuario eliminado correctamente',
                    'status' => 'success',
                ]);
    
            } else {
                return response()->json([
                    'message' => 'Ocurrio un problema!',
                    'status' => 'error',
                ]);
            }
        }else{
            return response()->json([
                'message' => 'No se puede eliminar, tienes una sesión iniciada con este usuario o no tienes permisos para hacerlo',
                'status' => 'error',
            ]);
        }
        
    }

    public function getPDF(Request $request)
    {
        $users = User::all();
        return $users;
    }

    public function blockUser(Request $request)
    {
        $exists = DB::table('users')->where('id', $request['id']);

        if(auth()->user()->tipo_usuario == "SuperAdmin"){

        if($exists->where('state', '=', 'Activo'))
        {
            $exists->update(['state' => 'Bloqueado']);

                return response()->json([
                
                    'message' => 'Usuario bloqueado',
                    'status' => 'success',
            ]);
        }

        }else{
            return response()->json([
                'message' => 'Para bloquear un usuario debe ser Super Administrador!',
                'status' => 'error',
            ]);
        }
    }

    public function unblockUser(Request $request)
    {
        
        $exists = DB::table('users')->where('id', $request['id']);

        if(auth()->user()->tipo_usuario == "SuperAdmin"){

        if($exists->where('state', '=', 'Bloqueado'))
        {
            $exists->update(['state' => 'Activo']);

                return response()->json([
                
                    'message' => 'Usuario desbloqueado',
                    'status' => 'success',
            ]);
        }

        }else{
            return response()->json([
                'message' => 'Para desbloquear un usuario debe ser Super Administrador!',
                'status' => 'error',
            ]);
        }
    }

}
