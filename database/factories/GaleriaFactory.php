<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Galeria;
use Faker\Generator as faker;
use Illuminate\Http\UploadedFile;

class GaleriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

     protected $model = Galeria::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->sentence,
            'fecha' => $this->faker->date,
            'imagen' => $this->faker->imageUrl,
            'descripcion' => $this->faker->sentence,
            'estadoI' => $this->faker->randomElement(['Activo', 'Inactivo']),
        ];
    }
}
