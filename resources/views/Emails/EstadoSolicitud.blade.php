@component('mail::message')
    # Estado de la solicitud de Productos y Servicios

    Estimado, {{ $email }}

    Su solicitud ha sido rechazada con las siguientes observaciones: 
    {{ $messages }}

    ¡Gracias!,
    {{ config('app.name') }}

@endcomponent


