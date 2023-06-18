@extends('layouts.app')

@section('content')
    <style>
        .fondo {
            background-image: linear-gradient(#18775C, rgba(255, 255, 255, 0.722)), url(../../assets/img/NICOYA.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
        }
    </style>

    <div class="fondo d-flex justify-content-center align-items-center vh-100">

        <div class="bg-muted p-5 rounded-5 text-secondary shadow" style="width: 23rem;  ">
            <div class="d-flex justify-content-center">
                <img src={{ asset('assets/img/MUNI_Xd.png') }} alt="login-icon" style="height: 7rem" />
            </div>
            <div class="text-center text-white fs-2 fw-bold">{{ __('Inicio de sesión') }}</div>
                @if (Session::has('do'))
                    <div class="text-center text-warning fs-6 fw-bold">
                        <p>{{ Session::get('do') }}</p>
                    </div>
                @endif

                @if (Session::has('change'))
                <div class="text-center text-warning fs-6 fw-bold">
                    <p>{{ Session::get('change') }}</p>
                </div>
            @endif

            @if (Session::has('error'))
            <div class="text-center text-warning fs-6 fw-bold">
                <p>{{ Session::get('error') }}</p>
            </div>
        @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="input-group mt-4 bg-muted">
                    <div class="input-group-text bg-muted">
                        <i class="text-black fa-solid fa-user"></i>
                    </div>
                    <input placeholder="Email" id="email" type="email"
                        class="form-control bg-muted @error('email') is-invalid @enderror" name="email"
                        value="{{ old('email') }}" required autocomplete="email" autofocus>

                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror

                </div>

                <div class="input-group mt-1">



                    <div class="input-group-text bg-muted">
                        <i class="text-black fa-solid fa-lock"></i>
                    </div>
                    <input placeholder="Contraseña" id="password" type="password"
                        class="bg-muted form-control bg-light @error('password') is-invalid @enderror" name="password"
                        required autocomplete="current-password">

                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="d-flex justify-content-around mt-1">
                    <div class="d-flex align-items-center gap-1">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember"
                            {{ old('remember') ? 'checked' : '' }}>

                        <label class="form-check-label" for="remember">
                            {{ __('Recordarme?') }}
                        </label>

                        @if (Route::has('password.request'))
                            <div class="pt-1">
                                <a style="color: #a52d2d" class="text-decoration-none fw-semibold"
                                    href="{{ route('password.request') }}">
                                    {{ __('Olvidó su contraseña?') }}
                                </a>
                            </div>
                        @endif
                    </div>
                </div>


                <button type="submit" style="background-color: #18775c"
                    class="btn btn-color text-white w-100 mt-4 fw-semibold shadow-sm ">{{ __('Iniciar sesión') }}</button>


                <div class="d-flex gap-1 justify-content-center mt-4">
                    <div>No tengo una cuenta?</div>
                    <a href="{{ route('register') }}" style="color: #a52d2d"
                        class="text-decoration-none fw-semibold">Registarse</a>
                </div>

            </form>
        </div>
    </div>
@endsection
