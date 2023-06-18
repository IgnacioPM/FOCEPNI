<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
   
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('idP');
            $table->string('nombreP');
            $table->string('descripcion');
            $table->string('categoriaP');
            $table->string('imagenP');
            $table->string('pState');
            $table->string('observacion')->nullable();


            $table->unsignedBigInteger('idUser');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
