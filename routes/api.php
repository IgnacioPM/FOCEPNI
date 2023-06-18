<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmprendedorController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('version', function () {
    return response()->json(['version' => config('app.version')]);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    Log::debug('User:' . serialize($request->user()));
    return $request->user();
});

/*
Route::group(['middleware' => ['auth:api'], 'prefix' => 'v1'], function () {
    Route::get('/lead/list', 'Api\LeadController@listData');
    Route::post('/lead/create', 'Api\LeadController@create');
    Route::post('/lead/update', 'Api\LeadController@update');
    Route::post('/lead/destroy', 'Api\LeadController@destroy');
    
    Route::get('/usuario/listar', 'Api\AdminApi\UsersController@listData');
    Route::post('/usuario/crear', 'Api\AdminApi\UsersController@create');
    Route::post('/usuario/actualizar', 'Api\AdminApi\UsersController@update');
    Route::post('/usuario/eliminar', 'Api\AdminApi\UsersController@destroy');

});*/

Route::group(['namespace' => 'App\\Http\Controllers', 'prefix' => 'v1', 'middleware' => 'auth:api'], function() {
    
    //all other api routes goes here
    Route::get('/lead/list', 'Api\LeadController@listData');
    Route::post('/lead/create', 'Api\LeadController@create');
    Route::post('/lead/update', 'Api\LeadController@update');
    Route::post('/lead/destroy', 'Api\LeadController@destroy');

    Route::apiResources([
        ////RUTAS ADMIN API
    ]);

});

Route::group(['namespace' => 'App\\Http\\Controllers\\API\ClienteAPI', 'prefix' => 'v1'], function() {
    
    //all other api routes goes here
       
    Route::get('/galery/show', 'GaleriaShowController@show');
    Route::get('/news/show', 'NoticiaShowController@show');
    Route::get('/products/show', 'ProductosShowController@show');
    Route::get('/services/show', 'ServicesShowController@show');

    Route::apiResources([
        ////RUTAS CLLIENTE API
        'galery' => 'GaleriaShowController',
        'news' => 'NoticiaShowController',
        'products' => 'ProductosShowController',
        'services' => 'ServicesShowController',
    ]);

});


Route::group(['namespace' => 'App\\Http\\Controllers\\API\AdminAPI', 'prefix' => 'v1', 'middleware' => 'auth:api'], function() {
    
    //all other api routes goes here 
    
    Route::get('/usuario/listar', 'UsersController@listData');//
    Route::get('/usuario/listarEmp', 'UsersController@listDataEmp');//
    Route::get('/usuario/listDataGeo', 'UsersController@listDataGeo');//
    Route::post('/usuario/crear', 'UsersController@create');//
    Route::post('/usuario/actualizar', 'UsersController@update');
    Route::post('/usuario/eliminar', 'UsersController@destroy');
    Route::get('/usuario/show', 'UsersController@show');
    Route::get('/usuario/showAll', 'UsersController@showAll');
    Route::get('/usuario/getPDF', 'UsersController@getPDF');
    Route::post('/usuario/block', 'UsersController@blockUser');
    Route::post('/usuario/unblock', 'UsersController@unblockUser');

    Route::get('/galeria/listar', 'GaleriaController@index');
    Route::post('/galeria/guardar', 'GaleriaController@store');
    Route::post('/galeria/actualizar', 'GaleriaController@update');
    Route::post('/galeria/eliminar', 'GaleriaController@destroy');
    Route::post('/galeria/active', 'GaleriaController@habilitar');

    Route::get('/emprendimiento/listar', 'EmprendimientoController@index');
    Route::get('/emp/ver', 'EmprendimientoController@indexView');
    Route::post('/emprendimiento/enviar', 'EmprendimientoController@store');
    Route::post('/emprendimiento/eliminar', 'EmprendimientoController@destroy');
    Route::get('/emprendimiento/showDash', 'EmprendimientoController@showDash');
    Route::post('/emprendimiento/accept', 'EmprendimientoController@update');
    Route::post('/emprendimiento/deny', 'EmprendimientoController@deny');
    Route::post('/emprendimiento/addDataGeo', 'EmprendimientoController@addDataGeo');
    Route::post('/empredimiento/delGeo', 'EmprendimientoController@delGeo');

    Route::get('/documents/listar', 'RepositorioController@index');
    Route::post('/documents/guardar', 'RepositorioController@store');
    Route::put('/documents/actualizar', 'RepositorioController@update');
    Route::post('/documents/eliminar', 'RepositorioController@destroy');
    Route::post('/documents/delete', 'RepositorioController@delete');
    Route::post('/documents/active', 'RepositorioController@habilitar');

    Route::get('/noticias/listar', 'NoticiaController@index');
    Route::post('/noticias/guardar', 'NoticiaController@store');
    Route::put('/noticias/actualizar', 'NoticiaController@update');
    Route::post('/noticias/eliminar', 'NoticiaController@destroy');
    Route::post('/noticias/active', 'NoticiaController@habilitar');

    Route::get('/sugerencias/Emlistar', 'SugerenciasController@show');
    Route::get('/sugerencias/showDash', 'SugerenciasController@showDash');
    Route::get('/sugerencias/listar', 'SugerenciasController@index');
    Route::post('/sugerencias/guardar', 'SugerenciasController@store');
    Route::post('/sugerencias/eliminar', 'SugerenciasController@destroy');

    Route::get('/productsEm/listar', 'ProductoController@index');
    Route::get('/productsEm/listarP', 'ProductoController@showP');
    Route::get('/productsEm/ver', 'ProductoController@indexView');
    Route::get('/products/category', 'ProductoController@showCategory');
    Route::get('/products/listar', 'ProductoController@show');
    Route::post('/products/guardar', 'ProductoController@store');
    Route::put('/products/actualizar', 'ProductoController@update');
    Route::post('/products/eliminar', 'ProductoController@destroy');
    Route::post('/products/active', 'ProductoController@habilitar');
    Route::post('/producto/accept', 'ProductoController@acept');
    Route::post('/producto/deny', 'ProductoController@deny');

    
    Route::apiResources([
        ////RUTAS ADMIN API
        'usuario' => 'UsersController',
        'galeria' => 'GaleriaController',
        'documents' => 'RepositorioController',
        'noticias' => 'NoticiaController',
        'sugerencias' => 'SugerenciasController',
        'products' => 'ProductoController',
        'producto' => 'ProductoController',
        'emprendimiento' => 'EmprendimientoController'
    ]);



});