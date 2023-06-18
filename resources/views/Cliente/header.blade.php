

<header id="header" class="header d-flex align-items-center">

    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="/" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Focepni<span>.</span></h1>
      </a>
      <nav id="navbar" class="navbar">

        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/#unirse">Unirse</a></li>          
          <li><a href="/#noticias">Noticias</a></li>
          <li><a href="/#prodServ">Productos</a></li>
          <li><a href="/#galeria">Galería</a></li>
          <li><a href="/#creditos">Créditos</a></li>
          @if (Auth::guard()->check()) 
          <li><a href="/dashboard">Administración</a></li>
        @endif
        @if (!Auth::guard()->check()) 
        <li><a href="/login">Iniciar Sesión</a></li>
         @endif
                   

        </ul>
      </nav><!-- .navbar -->

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    </div>
  </header>