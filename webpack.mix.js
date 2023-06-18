const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.js('resources/js/app.js', 'public/js','resources/assets/js/app.js', 'public/js')
 .react().js('resources/js/views/Principal.js', 'public/js/views').react()//La vista cliente
 .react().js('resources/js/views/Dashboard.js', 'public/js/views').react()//La vista administrativa
 .react().js('resources/js/views/Login.js', 'public/js/views').react()//La vista de login
 .sass('resources/sass/app.scss', 'public/css', [
 //
 ]);
