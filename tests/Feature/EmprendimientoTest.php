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
use App\Models\User;

class EmprendimientoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_index_emp_listar()
    {

        $us = \App\Models\User::where('email', 'superadmin@focepni.com')->first();
        // Simular el inicio de sesión del usuario de prueba
        $this->actingAs($us);
        $this->assertAuthenticatedAs($us);

        // Crear 3 emprendimientos
        $emp = Emprendimiento::factory(3)->create();

        // Acceder a la página principal de Noticias
        $response = $this->getJson('api/v1/emprendimiento/listar?page=1&api_token=9PZyeEZIVsekz34j7xPMaF6EOxoLUgO1D3RDUsyz8lSlPNtMmGkMQlFfVf4fikXN8y7OUkTYoc3Ryz9b&per_page=5&query=&sort_by=created_at&sort_type=desc');
        // Verificar que la respuesta tenga un status 200
        $response->assertStatus(200);




    }
}
