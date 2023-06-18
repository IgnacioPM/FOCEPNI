<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        /**
         * Defining the user Roles
         */
        Gate::define('isSuperAdmin', function ($user) {
            // if ($user->isAdmin()) {
            //     return true;
            // }

            // for simplicity
            return $user->tipo_usuario === 'SuperAdmin';
        });

        Gate::define('isAdmin', function ($user) {
            // if ($user->isAdmin()) {
            //     return true;
            // }

            // for simplicity
            return $user->tipo_usuario === 'Admin';
        });

        Gate::define('isUser', function ($user) {
            // if ($user->isUser()) {
            //     return true;
            // }

            // for simplicity
            return $user->tipo_usuario === 'User';
        });

        Gate::define('isEmprendedor', function ($user) {
            // if ($user->isUser()) {
            //     return true;
            // }

            // for simplicity
            return $user->tipo_usuario === 'Emprendedor';
        });
    }
}