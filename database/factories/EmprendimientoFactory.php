<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Emprendimiento;
use App\Models\User;
use Faker\Generator as faker;
use Illuminate\Http\UploadedFile;

class EmprendimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Emprendimiento::class;

    public function definition()
    {
        $us = User::factory()->create();

        return [
            //
            'fecha_Nac'   => '2001-03-14',
            'sexo'  => $this->faker->randomElement(['Masculino', 'Femenino']),
            'nacionalidad'  => 'costarricense',
            'nContacto'  => $this->faker->phoneNumber,
            'distrito'  => $this->faker->randomElement(['Nicoya', 'Quebrada Honda', 'Mansión']),
            'estadoCivil'  => $this->faker->randomElement(['Soltero', 'Casado', 'Union Libre']),
            'escolaridad'  => $this->faker->randomElement(['Primaria', 'Secundaria', 'bachillerato Universitario']),
            'profesion'  => 'Ninguna',
            'nPersonasDependientes'  => $this->faker->randomNumber,
            'nDosis'  => $this->faker->randomElement(['Primera', 'Segunda', 'Tercera']),
    
            'nombreEmprendimiento'  => $this->faker->name,
            'direccion'  => $this->faker->sentence,
            'categoria'  => $this->faker->randomElement(['Producto', 'Servicio']),
            'productoServicio'  => $this->faker->name,
            'cantPersonasLaboran'  => $this->faker->randomNumber,
            'anioInicio'  => $this->faker->randomNumber(4, false),
            'descripcion'  => $this->faker->sentence,
            'activos'  => $this->faker->randomElement(['no', 'si']),
            'estado'  => 'Espera',
            'descLugarEmprendimiento'  => 'Casa de Habitacion',
            'planTrabajoAnual'  =>$this->faker->randomElement(['no', 'si']),
            'asesoria'  => $this->faker->randomElement(['no', 'si']),
            'reqFormalizacion'  => $this->faker->randomElement(['no', 'si']),
            'administracion'  => $this->faker->randomElement(['Compartida', 'Propia']),
            'idUsuario' => $us->id

        ];
    }
}
