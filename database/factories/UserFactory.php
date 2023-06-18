<?php
namespace Database\Factories;

use Illuminate\Support\Str;
use App\Models\User;
use Faker\Generator as faker;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'identificacion' => Str::random(9),
            'nombre' => $this->faker->name,
            'primerApellido' => $this->faker->lastName,
            'segundoApellido' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'tipo_usuario' => 'Emprendedor',
            'state' => 'Activo',
            'imagen' => 'imagen.jpg',
            'password' => bcrypt('password'), // password
            'api_token' => Str::random(80)
        ];
    }

}

/** @var \Illuminate\Database\Eloquent\Factory $factory */
/* 
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str; */

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

/* $factory->define(User::class, function (Faker $faker) {

    return [
        'identificacion' => Str::random(9),
        'nombre' => $faker->name,
        'primerApellido' => $faker->name,
        'segundoApellido' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'tipo_usuario' => 'SuperAdmin',
        'tipo_usuario' => 'SuperAdmin',
        'state' => 'Activo',
        'imagen' => 'admin.jpg',
        'password' => bcrypt('password'), // password
        'remember_token' => Str::random(10),
    ];

});
 */