@section('title')
	Focepni-Admin
@endsection

@section('styles')

@endsection

@extends('Admin.master')

@section('container')
	<div id="app">

	</div>
@endsection

@section('scripts')
<script>
    var authUser = @json(Auth::user());
</script>
<script src="{{ asset('js/views/Dashboard.js') }}"></script>
@endsection