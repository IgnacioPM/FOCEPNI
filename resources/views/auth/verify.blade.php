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
<div class="fondo d-flex justify-content-center align-items-center vh-100 ">
    <div class="row justify-content-center">
        <div class=" col-md-6">
            <div class="bg-muted rounded-5 mt-3 shadow">
                
                <div class="card-body text-center text-white">
                    <div class="text-center text-white mt-2 border-0">
                        <h4 class="fw-bold">{{ __('Verify Your Email Address') }}</h4>
                    </div>
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('A fresh verification link has been sent to your email address.') }}
                        </div>
                    @endif

                    {{ __('Hemos enviado un link de confirmación a su correo electrónico') }}
                    {{ __('¿No recibió el link?') }}
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" style="background-color: #18775c" class="btn btn-color text-white mt-3 align-baseline">{{ __('Enviar nuevamente') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection