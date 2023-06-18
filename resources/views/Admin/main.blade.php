<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Focepni-Admin</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assetsAdmin/img/favicon.png" rel="icon">
    <link href="assetsAdmin/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.gstatic.com" rel="preconnect">
   
   
  <link href="{{ asset('assetsAdmin/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/quill/quill.snow.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/quill/quill.bubble.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/remixicon/remixicon.css')}}" rel="stylesheet">
  <link href="{{ asset('assetsAdmin/vendor/simple-datatables/style.css')}}" rel="stylesheet">
 

  <!-- Template Main CSS File -->
  <link href="{{ asset('assetsAdmin/css/style.css')}}" rel="stylesheet">


</head>

<body>


    @include('Admin.partials._header')
    @include('Admin.partials._aside')

    <main id="main" class="main">

        @yield('container')

       
    </main>
    
        @include('Admin.partials._footer')

        <script src="{{ asset('assetsAdmin/vendor/apexcharts/apexcharts.min.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/chart.js/chart.umd.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/echarts/echarts.min.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/quill/quill.min.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/simple-datatables/simple-datatables.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/tinymce/tinymce.min.js')}}"></script>
        <script src="{{ asset('assetsAdmin/vendor/php-email-form/validate.js')}}"></script>
      
        <!-- Template Main JS File -->
        <script src="{{ asset('assetsAdmin/js/main.js')}}"></script>
      
       
        @yield('scripts')
        @include('Admin.partials._toaster-message')
</body>

</html>
