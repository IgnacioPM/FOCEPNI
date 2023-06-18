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

<div class="fondo m-0 vh-100 row justify-content-center align-items-center">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="border-0 text-white shadow rounded-5" >

                 <div class="text-center border-0">
                    <h4 class="fw-bold p-0 mt-3">{{ __('Reestablecer contraseña') }}</h4>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ url('cambiar')  }}" >
                        @csrf

                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="input-group mt-4">
                            <div class="input-group-text bg-muted">
                                <i class="text-black fa-solid fa-user"></i>
                            </div>
                            <input placeholder="Email" id="email" type="email"
                                class="form-control bg-light @error('email') is-invalid @enderror"
                                 name="email"
                                 value="{{ $email ?? old('email') }}"
                                required autocomplete="email" autofocus>
        
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            
                        </div>

                        <div class="input-group mt-3">
                            <div class="input-group-text bg-light">
                                <i class="text-black fa-solid fa-lock"></i>
                            </div>
                            <input placeholder="Password" id="password" type="password"
                                class="form-control bg-light @error('password') is-invalid @enderror" name="password" required
                                autocomplete="new-password">
        
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                         
                        <div class="input-group mt-3">
                        <div class="input-group-text bg-light">
                            <i class="text-black fa-solid fa-lock"></i>
                        </div>
                        <input placeholder="Password" id="new_password"  type="password" class="form-control bg-light @error('password') is-invalid @enderror" name="new_password" required
                        autocomplete="new_password">
                        </div>
                        <hr>
                        <div class="form-group row ">
                            <div class="col-md-12 text-center text-white">
                                <button type="submit" style="background-color: #18775c" class="btn btn-color text-white mt-3 align-baseline">{{ __('Reestablecer contraseña') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection