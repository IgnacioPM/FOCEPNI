@extends('layouts.app')

@section('content')
<style>
    .fondo{
      background-image: linear-gradient(#18775C, rgba(255, 255, 255, 0.722)) ,url(../../assets/img/NICOYA.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
</style>

    <div class="fondo d-flex justify-content-center align-items-center vh-100" >
        <div class="text-center p-3 bg-muted rounded-5 col-md-6 border-0 shadow">
            <div class="d-flex justify-content-center">
                <img src={{asset('assets/img/MUNI_Xd.png')}} alt="login-icon" style="height: 7rem" />
            </div>
            <div class="text-center text-white fs-2 fw-bold">{{ __('Registrarse') }}</div>

                <div class="card-body">
                    <form method="POST" class="row" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group col-6">
                                <input id="identificacion" type="text" class="form-control @error('identificacion') is-invalid @enderror" 
                                name="identificacion" value="{{ old('identificacion') }}" required autocomplete="identificacion" placeholder="Identificación"  autofocus>

                                @error('identificacion')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group col-6">
                                <input id="nombre" type="text" class="form-control @error('nombre') is-invalid @enderror" 
                                name="nombre" value="{{ old('nombre') }}" required autocomplete="nombre" placeholder="Nombre" autofocus>

                                @error('nombre')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group col-6">
                                <input id="primerApellido" type="text" class="form-control @error('primerApellido') is-invalid @enderror" 
                                name="primerApellido" value="{{ old('primerApellido') }}" required autocomplete="primerApellido" 
                                placeholder="Primer apellido" autofocus>

                                @error('primerApellido')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group col-6">
                                <input id="segundoApellido" type="text" class="form-control @error('segundoApellido') is-invalid @enderror" 
                                name="segundoApellido" value="{{ old('segundoApellido') }}" required autocomplete="segundoApellido"
                                placeholder="Segundo apellido" autofocus>

                                @error('segundoApellido')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group col-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" 
                                name="email" value="{{ old('email') }}" placeholder="Email" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div hidden class="form-group col-6">
                                <input id="tipo_usuario" type="text" class="form-control @error('tipo_usuario') is-invalid @enderror" 
                                name="tipo_usuario" value="Emprendedor" required autocomplete="tipo_usuario" autofocus>

                                @error('tipo_usuario')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div hidden class="form-group col-6">
                                <input id="imagen" type="text" class="form-control @error('imagen') is-invalid @enderror" name="imagen" 
                                value="imagen.jpg" required autocomplete="imagen"  autofocus>

                                @error('imagen')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div hidden class="form-group col-6">
                                <input id="state" type="text" class="form-control @error('state') is-invalid @enderror" 
                                name="state" value="Inactivo" required autocomplete="state" autofocus>

                                @error('state')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>




                        <div class="form-group col-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" 
                                name="password" placeholder="Contraseña" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group col-12">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" 
                                required autocomplete="new-password" placeholder="Confirme su contraseña">
                           
                        </div>

                        <div class="form-group col-md-12">
                                <button type="submit" class="col-4 btn btn-color text-white w-100 mt-1 fw-semibold shadow-sm" 
                                style="background-color: #18775c">
                                    {{ __('Registrarse') }}
                                </button>

                               {{--  <button href="{{route('login')}}" class="col-4 btn text-white w-100 mt-1 fw-semibold shadow-sm"  style="background-color: #a52d2d"
                                >
                                    {{ __('Iniciar Sesión') }}
                                </button> --}}
                        </div>

                    </form>
            </div>
        </div>
    </div>
@endsection