<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/clearapp', function () {
  Artisan::call('config:clear');
  Artisan::call('cache:clear');
  Artisan::call('view:clear');
  Session::flush();
  return redirect('/');
});



Route::get('/', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('*', [App\Http\Controllers\ClienteController::class, 'index']);


//GRUPO DE RUTAS NO PROTEGIDAS
Route::group(['middleware' => ['guest', 'web']], function () {


  //rutas react js sin seguridad
  Route::get('/login', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('/register', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('/recuperar', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('/email/verify', [App\Http\Controllers\AuthController::class, 'index']);

Route::get('clave/{token}', [App\Http\Controllers\AuthController::class, 'clave'])->name('clave');
Route::post('/sendEmail', [App\Http\Controllers\AuthController::class, 'sendEmail']);
Route::post('/cambiar', [App\Http\Controllers\AuthController::class, 'cambiar']);
Route::post('/register', [App\Http\Controllers\AuthController::class, 'signup']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);


});

//GRUPO DE RUTAS PROTEGIDAS
Route::group(['middleware' => ['auth']], function () {
//rutas react js con seguridad

 

    Route::get('/geo/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/geo/agregar/{id}', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/geo/actualizar/{id}', [App\Http\Controllers\AdminController::class, 'index']);
//listo
    Route::get('/usuario/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/usuario/listarEmp', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/usuario/crear', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/usuario/actualizar/{id}', [App\Http\Controllers\AdminController::class, 'index'])->name('usuario.edit');
//
//listo
    Route::get('/galeria/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/galeria/store', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/galeria/update/{id}', [App\Http\Controllers\AdminController::class, 'index'])->name('galery.edit');
//
//listo
    Route::get('/documents/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/documents/store', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/documents/update/{id}', [App\Http\Controllers\AdminController::class, 'index'])->name('documents.edit');
//
//listo
    Route::get('/noticias/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/noticias/store', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/noticias/update/{id}', [App\Http\Controllers\AdminController::class, 'index'])->name('news.edit');
//
    Route::get('/reportes', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/EnviarSolicitud', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/usuarioEspera', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/verSolicitud', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/solicitud/gestion', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/solicitud/update/{id}', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/emprendimientos/ver', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/emprendimientos/view/{id}', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/emp/view/{id}', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/sugerenciasEm/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/sugerencias/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/sugerencias/store', [App\Http\Controllers\AdminController::class, 'index']);

    Route::get('/productEm/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/productos/listar', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/productos/ver', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/product/store', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/product/update/{id}', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/product/solicitud/{id}', [App\Http\Controllers\AdminController::class, 'index']);
    Route::get('/product/ver/{id}', [App\Http\Controllers\AdminController::class, 'index']);

});

Auth::routes();

Route::get('/dashboard', [App\Http\Controllers\AdminController::class, 'index'])->name('dashboard');
Route::get('/dashEmprendedor', [App\Http\Controllers\AdminController::class, 'index'])->name('dashEmprendedor');
Route::post("/logout",[App\Http\Controllers\AdminController::class,"logout"])->name("logout");

Route::get('/acerca', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/unirse', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/registroEm', [App\Http\Controllers\ClienteController::class, 'index']);  
Route::get('/emRegis', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/galeria', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/galery', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/noticia', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/productos', [App\Http\Controllers\ClienteController::class, 'index']);
Route::get('/servicios', [App\Http\Controllers\ClienteController::class, 'index']);


