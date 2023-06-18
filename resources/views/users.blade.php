<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />
</head>
<body>
    <h1>Usuarios del Sistema</h1>
    <table class="table-danger">

        <tr>
            <th>Identificacion</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Email</th>
            <th>Foto</th>

        </tr>
        @foreach ($user as $item)
            <tr>
                <td>{{$item->identificacion}}</td>
                <td>{{$item->nombre}}</td>
                <td>{{$item->primerApellido}}</td>
                <td>{{$item->tipo_usuario}}</td>
                <td>{{$item->estado}}</td>
                <td>{{$item->imagen}}</td>
                <td>{{$item->email}}</td>
            </tr>
        @endforeach

    </table>
</body>
</html>