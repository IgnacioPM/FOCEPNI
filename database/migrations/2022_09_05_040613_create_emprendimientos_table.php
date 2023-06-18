<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmprendimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emprendimientos', function (Blueprint $table) {
            
            $table->bigIncrements('idE');        
//Emprendedor
            $table->string('distrito');
            $table->date('fecha_Nac')->format('dd/mm/YY');           
            $table->string('estadoCivil');
            $table->string('escolaridad');
            $table->string('sexo');  
            $table->string('nacionalidad');
            $table->string('nContacto');
            $table->integer('NPersonasDependientes');
            $table->string('nDosis');
//Emprendimiento 
            $table->string('nombreEmprendimiento');
            $table->string('direccion');
            $table->string('categoria');
            $table->string('productoServicio');
            $table->integer('cantPersonasLaboran');
            $table->string('anioInicio');
            $table->string('descripcion');
            $table->string('activos');
            $table->string('estado');
            $table->string('descLugarEmprendimiento');
            $table->string('planTrabajoAnual');
            $table->string('asesoria');
            $table->string('reqFormalizacion');
            $table->string('administracion');
            $table->string('profesion');
            $table->float('longitud')->nullable();
            $table->float('latitud')->nullable();
            $table->string('observacion')->nullable();

            $table->unsignedBigInteger('idUsuario');
            $table->foreign('idUsuario')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
                       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('emprendimientos');
    }
}
