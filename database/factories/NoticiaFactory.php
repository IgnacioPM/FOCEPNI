<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Noticia;
use Faker\Generator as faker;
use Illuminate\Http\UploadedFile;

class NoticiaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
     protected $model = Noticia::class;

    public function definition()
    {
        return [
            //
            'nombre' => $this->faker->sentence,
            'fecha' => $this->faker->date,
            'imagen' => $this->faker->image(),
            'ubicacion' => $this->faker->sentence,
            'descripcion' => $this->faker->sentence,
            'estadoN' => $this->faker->randomElement(['Activo', 'Inactivo']),
        ];
    }
}
