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

use App\Models\Noticia;
use App\Models\User;

class NoticiasTest extends TestCase
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
    
     public function test_index_news()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 noticas
        $noticia = Noticia::factory(3)->create();
        // Acceder a la página principal de galeria
        $response = $this->get('/noticias/listar');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
        
    } 

    public function test_index_news_listar()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 noticias
        $noticia = Noticia::factory(3)->create();

        // Acceder a la página principal de Noticias
        $response = $this->getJson('api/v1/noticias/listar?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_revision_datos_news()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de noticias
        $response = $this->get('/noticias/listar');
        $response->assertStatus(200);


       
    }

    public function test_load_create_news_page()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de crear usuario
        $response = $this->get('/noticias/store');
        $response->assertStatus(200);

       
    }

    //si y no -consultar
/*     public function test_post_create_image()
    {
        
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Generar datos aleatorios para el nuevo post

        $data = [
            'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
            'nombre' => 'PruebaPost New',
            'fecha' =>'2023/05/23',
            'descripcion' => 'Esta es una noticia de prueba de postJson',
            'ubicacion' => 'Parque nicoya Guanacaste',
            'imagen' => $this->faker->imageUrl,
        ]; 

        // Enviar una solicitud POST para crear el nuevo post
        $response = $this->postJson('/api/v1/noticias/guardar', $data);

        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Asegurarse de que el post exista en la base de datos
        $this->assertDatabaseHas('noticias', [
            'nombre' => 'PruebaPost New',
        ]);
    } */

    public function test_load_update_news_page()
    {
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

       $noticia = Noticia::factory()->create();

        $response = $this->get(route('news.edit', $noticia->id));

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

     public function test_admin_can_disable_new()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $noticia = Noticia::factory()->create();

        $data = [
            'id' => $noticia->id,
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/noticias/eliminar', $data);

        $response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseHas('noticias', ['estadoN' => 'Inactivo']);
    
    } 

    public function test_admin_can_able_new()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $noticia = Noticia::factory()->create();

        $data = [
            'id' => $noticia->id,
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/noticias/active', $data);

        $response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseHas('noticias', ['estadoN' => 'Activo']);
    
    } 


}
