<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use Illuminate\Support\Str;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::Dashboard;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [

            'identificacion' => ['required', 'string', 'max:255','unique:users'],
            'nombre' => ['required', 'string', 'max:255'],
            'primerApellido' => ['required', 'string', 'max:255'],
            'segundoApellido' => ['required', 'string', 'max:255'],
            'tipo_usuario' => ['required', 'string', 'max:255'],
            'imagen' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {

        $filtro = $data['identificacion'];
        $existencia = User::where('identificacion', '=' , $filtro)->first();

        if($existencia === null){

            return User::create([
            'identificacion' => $data['identificacion'],
            'nombre' => $data['nombre'],
            'primerApellido' => $data['primerApellido'],
            'segundoApellido' => $data['segundoApellido'],
            'tipo_usuario' => $data['tipo_usuario'],
            'imagen' => $data['imagen'],
            'state' => $data['state'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'api_token' => Str::random(80),
        ]);
        
        }

        

    }
}   