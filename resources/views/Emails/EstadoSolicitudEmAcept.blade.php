@component('mail::message')
    # Estado de la solicitud de Emprendimiento

    Estimado, {{ $email }}
    Su solicitud ha sido aceptada con las siguientes observaciones: 
    {{ $messages }}

    ¡Gracias!,
    {{ config('app.name') }}

@endcomponent
