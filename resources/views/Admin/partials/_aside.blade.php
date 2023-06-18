@if (
        (Auth::check() && Auth::user()->tipo_usuario == 'Admin') ||
        Auth::user()->tipo_usuario == 'SuperAdmin' ||
        (Auth::user()->tipo_usuario == 'Emprendedor' && Auth::user()->state == 'Activo'))
    <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">

            @if ((Auth::check() && Auth::user()->tipo_usuario == 'Admin') || Auth::user()->tipo_usuario == 'SuperAdmin')
                <li class="nav-item">
                    <a class="nav-link " href="/dashboard">
                        <i class="fa-solid fa-house"></i>
                        <span>Dashboard</span>
                    </a>
                </li><!-- End Dashboard Nav -->

                <!-- Usuarios -->
                <li class="nav-item">
                    <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse"
                        href="#">
                        <i class="fa-solid fa-users"></i><span>Usuarios</span><i
                            class="fa-solid fa-arrow-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" class="nav-content collapse ">
                        <li>
                            <a href="/usuario/listar">
                                <i class="bi bi-circle"></i><span>Usuarios</span>
                            </a>
                        </li>
                        <li>
                            <a href="/usuario/listarEmp">
                                <i class="bi bi-circle"></i><span>Emprendedores</span>
                            </a>
                        </li>
                        <li>
                            <a href="/geo/listar">
                                <i class="bi bi-circle"></i><span>Geolocalización</span>
                            </a>
                        </li>
                    </ul>
                </li><!-- End Components Nav -->

                <!-- Solicitudes -->
                <li class="nav-item">
                    <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i class="fa-solid fa-envelope"></i><span>Solicitudes</span><i
                            class="fa-solid fa-arrow-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" class="nav-content collapse ">
                        <li>
                            <a href="/verSolicitud">
                                <i class="bi bi-circle"></i><span>Emprendimiento</span>
                            </a>
                        </li>
                        <li>
                            <a href="/productos/listar">
                                <i class="bi bi-circle"></i><span>Productos</span>
                            </a>
                        </li>

                    </ul>
                </li><!-- End Forms Nav -->

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/emprendimientos/ver">
                        <i class="fa-solid fa-house-chimney-user"></i>
                        <span>Emprendimientos</span>
                    </a>
                </li><!-- End Profile Page Nav -->

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/productos/ver">
                        <i class="fa-solid fa-hand-holding-heart"></i>
                        <span>Productos/Servicios</span>
                    </a>
                </li><!-- End F.A.Q Page Nav -->

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/galeria/listar">
                        <i class="fa-solid fa-images"></i>
                        <span>Galería</span>
                    </a>
                </li><!-- End Contact Page Nav -->

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/documents/listar">
                        <i class="fa-solid fa-file"></i>
                        <span>Repositorio</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/noticias/listar">
                        <i class="fa-solid fa-newspaper"></i>
                        <span>Noticias</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/sugerencias/listar">
                        <i class="fa-solid fa-message"></i>
                        <span>Sugerencias</span>
                    </a>
                </li><!-- End Register Page Nav -->
            @endif

            @if (Auth::check() && Auth::user()->tipo_usuario == 'Emprendedor' && Auth::user()->state == 'Activo')

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/dashboard">
                        <i class="fa-solid fa-user"></i>
                        <span>{{ Auth::user()->nombre }}</span>
                    </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link collapsed" href="/productEm/listar">
                    <i class="fa-solid fa-business-time"></i>
                      <span>Mis productos</span>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link collapsed" href="/sugerenciasEm/listar">
                    <i class="fa-solid fa-message"></i>
                      <span>Mis sugerencias</span>
                  </a>
                </li>

            @endif

        </ul>

    </aside>
@endif
