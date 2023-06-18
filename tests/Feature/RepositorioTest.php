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

use App\Models\Repositorio;
use App\Models\User;

class RepositorioTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
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

    public function test_index_documents()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 noticas
        $repo = Repositorio::factory(3)->create();
        // Acceder a la página principal de galeria
        $response = $this->get('/documents/listar');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
        
    } 

    public function test_index_documents_listar()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 noticias
        $repo = Repositorio::factory(3)->create();

        // Acceder a la página principal de Noticias
        $response = $this->getJson('api/v1/documents/listar?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_revision_datos_documents()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de noticias
        $response = $this->get('/documents/listar');
        $response->assertStatus(200);


       
    }

    public function test_load_create_documents_page()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de crear usuario
        $response = $this->get('/documents/store');
        $response->assertStatus(200);

       
    }
//reparar
/*     public function test_post_create_document()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba

        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Generar datos aleatorios para el nuevo post

        $data = [
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
            'nombre' => 'PruebaPostDoc',
            'fecha' =>'2023/05/23',
            'archivo' => 'documento.pdf',
        ]; 

        // Enviar una solicitud POST para crear el nuevo post
        $response = $this->postJson('/api/v1/documents/guardar', $data);

        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Asegurarse de que el post exista en la base de datos
      $this->assertDatabaseHas('repositorios', [
            'nombre' => $data['nombre'],
        ]);


    }  */

    public function test_load_update_document_page()
    {
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        $repo = Repositorio::factory()->create();

        $response = $this->get(route('documents.edit', $repo->id));

        $response->assertStatus(200);
    }

    public function test_can_update_documents()
    {
       
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
       
        // Crear un nuevo tipo de artículo
        $repo = Repositorio::factory()->create();

        // Enviamos los datos actualizados en un arreglo
        $datos = [
            //'api_token' => '9PZyeEZIVsekz34j7xPMaF6EOxoLUgO1D3RDUsyz8lSlPNtMmGkMQlFfVf4fikXN8y7OUkTYoc3Ryz9b',
            'id' => $repo->id,          
            'archivo' => 'breinerrr.pdf',
        ]; 

        // Hacemos la petición post al endpoint correspondiente
        $response = $this->putJson('/api/v1/documents/actualizar', $datos);
        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Verificamos que el usuario se haya actualizado correctamente en la base de datos
        $this->assertDatabaseHas('repositorios', [
            'id' => $repo->id,
            'nombre' => $repo->nombre,

        ]);

    } 

    public function test_admin_can_delete_doc()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $repo = Repositorio::factory()->create();

        $data = [
            'id' => $repo->id,
            //'api_token' => 'C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/documents/delete', $data);

        $response->assertStatus(200);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseMissing('noticias', ['id' => $repo->id]);
    
    } 

}
