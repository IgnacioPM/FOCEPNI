<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Repositorio;
use Faker\Generator as faker;
use Illuminate\Http\UploadedFile;

class RepositorioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Repositorio::class;

    public function definition()
    {


        return [
            //
            'nombre' => $this->faker->sentence,
            'estadoD' => $this->faker->randomElement(['Activo', 'Inactivo']),
            'fecha'  => $this->faker->date,
            'archivo' => 'documento.pdf',
        ];
    }
}
