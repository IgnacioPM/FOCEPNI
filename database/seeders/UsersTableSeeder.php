<?php


namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            'identificacion' => '101110111',
            'nombre' => 'Super',
            'primerApellido' => 'Administrador',
            'segundoApellido' => ' ',
            'tipo_usuario' => 'SuperAdmin',
            'state' => 'Activo',
            'imagen' => 'admin.jpg',
            'email' => 'superadmin@focepni.com',
            'password' => bcrypt('12345'),
            'api_token' => Str::random(80)
        ]);
        /* DB::table('users')->insert([
            'name' => 'Usuario',
            'email' => 'usuario@gmail.com',
            'image' => 'profile.png',
            'password' => bcrypt('123456'),
            'type' => 'user',
        ]); */
    }
}