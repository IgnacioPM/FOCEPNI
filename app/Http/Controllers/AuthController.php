<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Validator;
use App\Mail\Mailpass;
use DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function index(Request $request)
    {
        return view('Admin.login');
    }

   /* public function redirectToIndex()
    {
        return Redirect(route('Login'));
    }*/
    
    public function signup(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error'
            ], 401);
        }

        $user = User::create([
            'nombre' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'api_token' => Str::random(80),
        ]);
        $user->save();
        
        $token = Str::random(80);

        $user->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();

        $credentials = request(['email', 'password']);
        
        if(!Auth::guard('users')->attempt($credentials))
            return response()->json([
                'message' => 'Invalid email or password',
                'status' => 'error'
            ], 401);
        
        return response()->json([
            'message' => $user->api_token,
            'status' => 'success'
        ], 201);
    }
  
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error'
            ], 401);
        }

        $credentials = request(['email', 'password']);
        
        if(!Auth::guard('users')->attempt($credentials))
            return response()->json([
                'message' => 'Invalid email or password',
                'status' => 'error'
            ], 401);
        $user = $request->user();
        
        return response()->json([
            'message' => $user->api_token,
            'status' => 'success'
        ], 201);
    }
  
    public function logout(Request $request)
    {
    }
  
    
    public function user(Request $request)
    {
        return response()->json([
            'message' => $request->user(),
            'status' => 'success'
        ]);
    }

    public function sendEmail (Request $request)
    {
        $currenturl = $request->root();

        $requestData = $request->all();
        $validator = Validator::make($requestData,[
            'email' => 'email|required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $exists = User::where('email', '=', $request->email)->first();
        if($exists !== null){
            $token = Str::random(64);
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
            $url = "$currenturl/clave/$token";
            $email = $request->email;
            $messages = "Ingrese al link para cambiar la contraseña";
    
            Mail::to($email)->send(new Mailpass($email,$messages,$url));
            //return response()->json(['success' => true, 'message' => 'Email send!']);
            return redirect()->to('login')->with('do', 'Link enviado a su correo');
        }else{
            return response()->json(['success' => false, 'message' => 'Email not exists!']);
        }
    
        }
        
        public function clave($token)
        {
            return view('auth.passwords.reset', ['token' => $token]);
        }


        public function changepassword(Request $request)
        {
        $currentToken = $request->token;

        $exists = DB::table('password_resets')->where('token', $currentToken)->first();
        if($exists !== null){
            return redirect()->to('auth.passwords.reset');
        }else{
            return response()->json(['success' => false, 'message' => 'token not exists!']);
        }
        }

        public function cambiar(Request $request)
        {

            $request->validate([
                'email' => 'required|email|exists:users',
                'password' => 'required|min:8|max:16|',
                'new_password' => 'required_with:password|same:password|min:8'
            ]);
    
            $verificationToken = DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->token])->first();
            if(!$verificationToken){
                return redirect()->to('login')->with('error', 'no se pudo cambiar, el link ha expirado :(');
            }    
            if( $request->password != $request->new_password){
                return response()->json(['success' => false, 'message' => 'error, contraseñas diferentes']);
            }

            User::where('email', $request->email)->update(['password' => Hash::make($request->password)]);
    
            //Borro token para que no se pueda volver a usar
            DB::table('password_resets')->where(['email'=> $request->email])->delete();
            //Retorno
            return redirect()->to('login')->with('change', 'Contraseña cambiada correctamente :)');
        }
}
