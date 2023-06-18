<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Producto;
use Faker\Generator as faker;
use Illuminate\Http\UploadedFile;

class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    protected $model = Producto::class;

    public function definition()
    {
        return [
            //
            'nombreP' => $this->faker->sentence,
            'descripcion' => $this->faker->date,
            'imagenP' => $this->faker->image(),
            'categoriaP' => $this->faker->sentence,
            'idUser' => '398',
            'pState' => $this->faker->randomElement(['Activo', 'Inactivo']),
        ];
    }
}
