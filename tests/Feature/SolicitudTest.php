<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Faker\Generator as faker;
use Illuminate\Foundation\Testing\WithoutMiddleware;

use App\Models\Emprendimiento;
use App\Models\Producto;
use App\Models\User;

class SolicitudTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use DatabaseTransactions, WithFaker, WithoutMiddleware;

    public function test_load_solicitud_emprendedor()
    {
         $us = \App\Models\User::where('email', 'emmerich.trudie@example.org')->where('state', 'Inactivo')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us); 
        $this->assertAuthenticatedAs($us);
        // Acceder a la página de editorial
        $response = $this->get('/EnviarSolicitud');
        $response->assertStatus(200);
 
        $response->assertSee('Focepni');
     
    }

    public function test_post_create_solicitud_emp()
    {
        //        
        $us = \App\Models\User::where('state', 'Inactivo')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Generar datos aleatorios para el nuevo post
        $data = [
           
            'api_token' => $us->api_token,
            'fecha_Nac'   => '2001-03-14',
            'sexo'  => 'Masculino',
            'nacionalidad'  => 'costarricense',
            'nContacto'  => '88888888',
            'distrito'  => 'Nicoya',
            'estadoCivil'  => 'Union Libre',
            'escolaridad'  => 'Primaria',
            'profesion'  => 'Ninguna',
            'nPersonasDependientes'  => '2',
            'nDosis'  => 'Segunda',
            'nombreEmprendimiento'  => 'EmprendimientoXd',
            'direccion'  => 'Nicoya Centro',
            'categoria'  => 'Producto',
            'productoServicio'  => 'Empanadas',
            'cantPersonasLaboran'  => '3',
            'anioInicio'  => '2018',
            'descripcion'  => 'Pequenio emprendmientos de empanadas',
            'activos'  => 'si',
            'estado'  => 'Espera',
            'descLugarEmprendimiento'  => 'Casa de Habitacion',
            'planTrabajoAnual' => 'si',
            'asesoria'  => 'no',
            'reqFormalizacion'  => 'si',
            'administracion'  => 'Propia',
            'idUsuario' => $us->id,
            
        ]; 

        // Enviar una solicitud POST para crear el nuevo post
        $response = $this->postJson('/api/v1/emprendimiento/enviar', $data);

        // Asegurarse de que la solicitud sea exitosa
         //$response->assertStatus(200);

        // Asegurarse de que el post exista en la base de datos
       /*  $this->assertDatabaseHas('emprendimientos', [
            'nombreEmprendimiento' => $data['nombreEmprendimiento']
        ]);  */
    }

/*   public function test_index_()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 imagenes
        $prod = Producto::factory(3)->create();
        // Acceder a la página principal de galeria
        $response = $this->get('/productEm/listar');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
        
    }  */
    
    public function test_solicitud_acept()
    {
       /*  $this->withoutMiddleware(); */

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $soli = Emprendimiento::factory()->create();

        $data = [
            //'Observacion' => 'Ninguna',
            'api_token' => '9PZyeEZIVsekz34j7xPMaF6EOxoLUgO1D3RDUsyz8lSlPNtMmGkMQlFfVf4fikXN8y7OUkTYoc3Ryz9b',
            'id' => $soli->idUsuario,
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/emprendimiento/accept', $data);

        //$response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
        /*  $this->assertDatabaseHas('emprendimientos', [
            'idE' =>  $soli->idUsuario,
            'estado' => 'Activo'
        ]); */
    
    } 

    public function test_solicitud_deny()
    {
       /*  $this->withoutMiddleware(); */

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $soli = Emprendimiento::factory()->create();

        $data = [
            //'Observacion' => 'Ninguna',
            'api_token' => '9PZyeEZIVsekz34j7xPMaF6EOxoLUgO1D3RDUsyz8lSlPNtMmGkMQlFfVf4fikXN8y7OUkTYoc3Ryz9b',
            'id' => $soli->idUsuario,
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/emprendimiento/accept', $data);

        //$response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
        /*  $this->assertDatabaseHas('emprendimientos', [
            'idE' =>  $soli->idUsuario,
            'estado' => 'Activo'
        ]); */
    
    } 

}
