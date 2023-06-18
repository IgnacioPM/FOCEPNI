@section('title')
	Principal
@endsection

@section('styles')
    
@endsection

@extends('Cliente.main')

@section('container')
<!--Renderiza los componentes de reacjs de la vista principal de cliente -->
	<div id="principal">
        
        <!--Todo lo de la vista principal.js se renderiza dentro del div -->
    </div>
@endsection

@section('scripts')
<script>

</script>
<!--Llamamos la vista de react llamada Principal -->
<script src="{{ asset('js/views/Principal.js') }}"></script>
@endsection