import React from 'react'


function UsuarioEspera() {
    
    
    if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Inactivo") {
    return (
        <div className="container rounded-5 ">
                    <div className="card text-center rounded-5">
                        <div className="card-body bg-success-light rounded-5 shadow">
                            <h1 className='text-dark'>

                                Su solicitud ha sido enviada satisfactoriamente, por favor espere a que sea revisada y analizada
                                por nuestros administradores

                            </h1>
                            <p>
                                <a className="text-white mt-4 btn btn-success btn-lg m-2 border-0 rounded-3" href="/clearapp"
                                    style={
                                        {'textDecoration': 'none'}
                                }>Aceptar y Salir</a>
                            </p>
                        </div>
                    </div>
                </div>
    );
}

}
export default UsuarioEspera
