<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Str;
use \Illuminate\Support\Facades\URL;
use Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        if (env('APP_ENV') === 'production' || env('APP_ENV') === 'dev') {
            \URL::forceScheme('https');
       }
    }
}
