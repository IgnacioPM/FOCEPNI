<!DOCTYPE html>
<html lang="es">
    <head>
        
        <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Focepni</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets2/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/images/f.png') }}">
    <link href="assets2/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets2/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets2/vendor/aos/aos.css" rel="stylesheet">
    <link href="assets2/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets2/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="assets2/css/main.css" rel="stylesheet">

        @yield('styles')
    </head>

    <body>
        <!-- inject:js --> 
        @include('Cliente.topbar')
         @include('Cliente.header')
       
           <div class="container-fluid p-0">
            
       
               @yield('container')
               
               
           </div>

           @include('Cliente.footer')
           
               
           
           <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

           <div id="preloader"></div>
         
           <!-- Vendor JS Files -->
           <script src="assets2/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
           <script src="assets2/vendor/aos/aos.js"></script>
           <script src="assets2/vendor/glightbox/js/glightbox.min.js"></script>
           <script src="assets2/vendor/purecounter/purecounter_vanilla.js"></script>
           <script src="assets2/vendor/swiper/swiper-bundle.min.js"></script>
           <script src="assets2/vendor/isotope-layout/isotope.pkgd.min.js"></script>
           <script src="assets2/vendor/php-email-form/validate.js"></script>
           <script src="{{ asset('assets/js/Funciones.js') }}"></script>

           @yield('scripts')
           <!-- Template Main JS File -->
           <script src="assets2/js/main.js"></script>
           <!-- endinject -->
       </body>
</html>