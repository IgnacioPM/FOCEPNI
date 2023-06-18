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

use App\Models\Galeria;
use App\Models\User;

class GaleryTest extends TestCase
{
 
    use DatabaseTransactions, WithFaker, WithoutMiddleware;
   
    public function test_carga_dashboard()
    {
         $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us); 
        $this->assertAuthenticatedAs($us);
        // Acceder a la página de editorial
        $response = $this->get('/dashboard');
        $response->assertStatus(200);
        $response->assertSee('Dashboard');
        $response->assertSee('Usuarios');
        $response->assertSee('Solicitudes');
        $response->assertSee('Emprendimientos');
        $response->assertSee('Productos/Servicios');
        $response->assertSee('Galería');
        $response->assertSee('Repositorio');
        $response->assertSee('Noticias');
        $response->assertSee('Sugerencias');
    }
    
     public function test_index_galery()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 imagenes
        $galeria = Galeria::factory(3)->create();
        // Acceder a la página principal de galeria
        $response = $this->get('/galeria/listar');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
        
    } 

    public function test_index_galeria_listar()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 imagenes
        $galeria = Galeria::factory(3)->create();

        // Acceder a la página principal de galeria
        $response = $this->getJson('api/v1/usuario/listar?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }


    public function test_revision_datos_galery()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de galeria
        $response = $this->get('/galeria/listar');
        $response->assertStatus(200);


       
    }

    public function test_load_create_galery_page()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de crear usuario
        $response = $this->get('/galeria/store');
        $response->assertStatus(200);

       
    }

    //si y no -consultar
 /*    public function test_post_create_image()
    {
        
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Generar datos aleatorios para el nuevo post

        $data = [
            'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
            'nombre' => 'Prueba Post Img',
            'fecha' =>'2023/05/23',
            'descripcion' => 'Esta es una imagen de prueba de postJson',
            'imagen' => 'imagen.jpeg',
        ]; 

        // Enviar una solicitud POST para crear el nuevo post
        $response = $this->postJson('/api/v1/galeria/guardar', $data);

        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Asegurarse de que el post exista en la base de datos
        $this->assertDatabaseHas('galerias', [
            'nombre' => 'Prueba Post Img',
        ]);
    } */

    public function test_load_update_galery_page()
    {
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        $galeria = Galeria::factory()->create();

        $response = $this->get(route('galery.edit', $galeria->id));

        $response->assertStatus(200);
    }

 /*     //no -consultar
    public function test_can_update_galery()
    {
       
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
       
        // Crear un nuevo tipo de artículo
        $galeria = Galeria::factory()->create();

        // Enviamos los datos actualizados en un arreglo
        $datos = [
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
            'id' => $galeria->id,  
            'fecha' => $galeria->fecha,          
            'nombre' => 'breinerrr',
            'descripcion' => 'xdxdxdxdxdxdxdx',
        ]; 

        // Hacemos la petición post al endpoint correspondiente
        $response = $this->postJson('/api/v1/galeria/actualizar', $datos);
        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Verificamos que el usuario se haya actualizado correctamente en la base de datos
        $this->assertDatabaseHas('galerias', [
            'id' => $galeria->id,
            'fecha' => $datos['fecha'],
            'nombre' => $datos['nombre'],
            'descripcion' => $datos['descripcion'],

        ]);

    } */

    public function test_admin_can_disable_image()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $galery = Galeria::factory()->create();

        $data = [
            'id' => $galery->id,
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/galeria/eliminar', $data);

        $response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseHas('galerias', ['estadoI' => 'Inactivo']);
    
    } 

    public function test_admin_can_able_image()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $galery = Galeria::factory()->create();

        $data = [
            'id' => $galery->id,
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/galeria/active', $data);

        $response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseHas('galerias', ['estadoI' => 'Activo']);
    
    } 


}
