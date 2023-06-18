@component('mail::message')
    # Estado de la solicitud de Emprendimiento

    Estimado, {{ $email }}
    Su solicitud ha sido rechazada con las siguientes observaciones: 
    {{ $messages }}

    ¡Gracias!,
    {{ config('app.name') }}

@endcomponent
