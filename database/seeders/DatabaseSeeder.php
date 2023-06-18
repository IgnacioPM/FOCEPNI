<?php

use Database\Seeders\UsersTableSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

  public function run()
  {
      // $this->truncateTables([
      //     'statuses',

      // ]); LLAVES FORANEAS

    $this->call([
      //PersonSeeder::class,
      // AreaSeeder::class,
      UsersTableSeeder::class,

    ]);
  }

  public function truncateTables(array $tables){
      DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
      foreach($tables as $table)
      {
          DB::table($table)->truncate();
      }
      DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
  }
}