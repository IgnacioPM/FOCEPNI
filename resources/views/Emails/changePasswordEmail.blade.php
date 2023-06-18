@component('mail::message')
    # Cambiar contraseña

    Querido, {{ $email }}

    {{ $messages }}:
    {{$url}}
    
    ¡Gracias!,
    {{ config('app.name') }}

@endcomponent


