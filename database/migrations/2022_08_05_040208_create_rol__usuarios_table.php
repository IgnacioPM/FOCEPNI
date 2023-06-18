<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolUsuariosTable extends Migration
{
    
    public function up()
    {
        Schema::create('rol__usuarios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('rol_id')->unsigned();
            $table->integer('usuario_id')->unsigned();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rol__usuarios');
    }
}
