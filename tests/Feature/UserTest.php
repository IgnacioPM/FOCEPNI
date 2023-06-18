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
use App\Models\User;
use Illuminate\Support\Str;
use Faker\Generator as faker;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class UserTest extends TestCase
{
 
    use DatabaseTransactions, WithFaker, WithoutMiddleware;
   

    public function test_user_can_login_with_correct_credentials()
    {
        // Visitar la página de inicio de sesión
        $response = $this->post('/login', [
            'email' => 'superadmin@focepni.com',
            'password' => '12345',
        ]);

        $user = \App\Models\User::where('email', 'superadmin@focepni.com')->first();

        // Asegurarse de que se redirige a la página de inicio después del inicio de sesión
        $response = $this->get('/dashboard');

        // Asegurarse de que el usuario se haya autenticado correctamente
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_incorrect_password()
    {
        
        // Visitar la página de inicio de sesión
        $response = $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        // Asegurarse de que no se redirige a la página de inicio después del inicio de sesión
        $response->assertSessionHasErrors('email');

        // Asegurarse de que el usuario no se haya autenticado
        $this->assertGuest();
    }

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
    
    public function test_index_usuario()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Crear 3 editorial
        $usuario = User::factory(3)->create();
        // Acceder a la página principal de temas
        $response = $this->get('/usuario/listar');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_index_usuario_listar()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Crear 3 editorial
        $usuario = User::factory(3)->create();
        // Acceder a la página principal de temas
        $response = $this->getJson('api/v1/usuario/listar?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_index_usuario_listar_Emp()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Crear 3 editorial
        $usuario = User::factory(3)->create();
        // Acceder a la página principal de temas
        $response = $this->getJson('api/v1/usuario/listarEmp?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_index_usuario_listar_Geo()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Crear 3 editorial
        $usuario = User::factory(3)->create();
        // Acceder a la página principal de temas
        $response = $this->getJson('api/v1/usuario/listDataGeo?page=1&api_token=C07DY7ldDp9gs5bM5Ozz265O7799OINwYqPOOaarPRtmW5KAwmyRzU3dn3Ttmp4axyn7ZRekhFddwb8i&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);
    }

    public function test_revision_datos_users()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Acceder a la página de usuario
        $response = $this->get('/usuario/listar');
        $response->assertStatus(200);


       
    }

    public function test_load_create_users_page()
    {
       
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Acceder a la página de crear usuario
        $response = $this->get('/usuario/crear');
        $response->assertStatus(200);

       
    }
    
    public function test_post_create_user()
    {
        $this->withoutMiddleware();
        
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
        // Generar datos aleatorios para el nuevo post
        $data = [
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
            'identificacion' => '123456789',
            'nombre' => 'Juan',
            'primerApellido' => 'Xddddd',
            'segundoApellido' =>'Xddd',
            'email' => 'juajuan@gmail.com',
            'tipo_usuario' => 'SuperAdmin',
            'state' => 'Activo',
            'password' => '12345678', // password
            'api_token' => Str::random(80)
            
        ]; 

        // Enviar una solicitud POST para crear el nuevo post
        $response = $this->postJson('/api/v1/usuario/crear', $data);

        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Asegurarse de que el post exista en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'juajuan@gmail.com',
        ]);
    }

    public function test_load_update_users_page()
    {
        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        $user = User::factory()->create();

        $response = $this->get(route('usuario.edit', $user->id));

        $response->assertStatus(200);
    }

    public function test_can_update_user()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);
       
        // Crear un nuevo tipo de artículo
        $user = User::factory()->create();

        // Enviamos los datos actualizados en un arreglo
        $datos = [
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
            'id' => $user->id,            
            'identificacion' => $user->identificacion,
            'nombre' => 'breinerrr',
            'primerApellido' => 'barrantes',
            'segundoApellido' => 'trejos',
            'tipo_usuario' => $user->tipo_usuario,
            'state'  => $user->state,
            'email' => $user->email
        ]; 

        // Hacemos la petición post al endpoint correspondiente
        $response = $this->postJson('/api/v1/usuario/actualizar', $datos);
        // Asegurarse de que la solicitud sea exitosa
        $response->assertStatus(200);

        // Verificamos que el usuario se haya actualizado correctamente en la base de datos
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'identificacion' => $datos['identificacion'],
            'nombre' => $datos['nombre'],
            'primerApellido' => $datos['primerApellido'],
            'segundoApellido' => $datos['segundoApellido'],
            'tipo_usuario' => $datos['tipo_usuario'],
            'state'  => $datos['state'],
            'email' => $datos['email']

        ]);

      
    }

     public function test_can_delete_user()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $user = User::factory()->create();

        $data = [
            'id' => $user->id,
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/usuario/eliminar', $data);

        $response->assertStatus(200);
    
        // Verificar que se haya eliminado correctamente de la base de datos
        $this->assertDeleted($user);

         // Asegurarse de que el recurso no exista en la base de datos
         $this->assertDatabaseMissing('users', ['id' => $user->id]);
    
    } 

    public function test_admin_can_block_user()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $user = User::factory()->create();

        $data = [
            'id' => $user->id,
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/usuario/block', $data);

        $response->assertStatus(200);

         // Asegurarse de que el estado haya cambiado a inactivo
         $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'state' => 'Bloqueado']);
    
    } 

    public function test_admin_can_unblock_user()
    {
        $this->withoutMiddleware();

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear un nuevo usuario
        $user = User::factory()->create();

        $data = [
            'id' => $user->id,
            //'api_token' => '700lwIY3yMxVGvaTy7BCd6FcmbaIx0xY2zS3WxksREMPNZYFvRoXtmM0BeKvh6VDtCmOuSzQ2CzlxiHE',
        ]; 
    
        // Hacer la petición DELETE al endpoint correspondiente
        $response = $this->postJson('/api/v1/usuario/unblock', $data);

        $response->assertStatus(200);

         // Asegurarse de que el estado haya cambiado a inactivo
         $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'state' => 'Activo']);
    
    } 

    

}
