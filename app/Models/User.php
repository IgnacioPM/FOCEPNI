<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use \Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\Roles;

class User extends Authenticatable 
{
    use Notifiable; 
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

     use HasFactory;
     
    protected $fillable = [
        'identificacion',
        'nombre',
        'primerApellido'
        ,'segundoApellido',
        'tipo_usuario',
        'imagen',
        'state', 
        'email', 
        'password', 
        'api_token'
    ];


   protected $hidden = [
       'password', 
       'remember_token',
   ];


   protected $casts = [
       'email_verificado' => 'datetime',
   ];


   public function getPhotoAttribute()
   {
       return 'https://www.gravatar.com/avatar/' . md5(strtolower($this->email)) . '.jpg?s=200&d=mm';
   }

   public function roles()
   {
       return $this->belongsToMany(Roles::class);
   }


   public function assignRole(Roles $roles)
   {
       return $this->roles()->save($roles);
   }

   public function isSuperAdmin()
   {
       return $this->roles()->where('nombre', 'SuperAdmin')->exists();
   }

   public function isAdmin()
   {
       return $this->roles()->where('nombre', 'Admin')->exists();
   }

   public function isEmprendedor()
   {
       return $this->roles()->where('nombre', 'Emprendedor')->exists();
   }
   public function isUsuario()
   {
       return $this->roles()->where('nombre', 'Usuario')->exists();
   }

}