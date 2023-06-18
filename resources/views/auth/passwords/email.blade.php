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
    <div class="fondo d-flex justify-content-center align-items-center vh-100">
        <div class="bg-muted p-4 rounded-5 text-secondary shadow" style="width: 25rem">
            <div class="d-flex justify-content-center text-white">
                <h3>Restablecer contraseña</h3>
            </div>
            <div class="rounded-5 d-flex justify-content-center">
                
                <div class="card-body bg-muted">

                    @if (session('status'))
                        <div class="text-black alert alert-info" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ url('sendEmail')  }}" >
                        @csrf

                        <div class="input-group mt-3 ">
                            <div class="input-group-text">
                                <i class="text-black fa-solid fa-user"></i>
                            </div>
                                
                                <input placeholder="Email" id="email" type="email"
                                 class="text-muted form-control @error('email') is-invalid @enderror"
                                  name="email" value="{{ old('email') }}" 
                                  required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        </div>

                        <div class="form-group row mb-0 mt-2 bg-muted">
                            <div class="col-12 text-center">
                                <button type="submit" class="text-white rounded-3 btn" style="background-color: #18775C">
                                    {{ __('Enviar enlace') }}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
@endsection