@component('mail::message')
    # Estado de la solicitud de Productos y Servicios

    Estimado, {{ $email }}

    Su solicitud ha sido aceptada con las siguientes observaciones: 
    {{ $messages }}

    ¡Gracias!,
    {{ config('app.name') }}

@endcomponent


