import React, {useState, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
// activo
function DashEmActivo() {

    const [sugerencias, setSugerencias] = useState([]);
    const [producto, setProducto] = useState([]);
    const authUser = useSelector(state => state.authUserReducer);

    useEffect(() => {

        loadDataSugerencias();
        loadDataProducto();

    }, []);

    const loadDataSugerencias = async () => {
        const response = await axios.get(`/api/v1/sugerencias/Emlistar`, {
            params: {
                api_token: authUser.api_token
            }
        });
        setSugerencias(response.data);
    };

    const loadDataProducto = async () => {
        const response = await axios.get(`/api/v1/productsEm/listarP`, {
            params: {
                api_token: authUser.api_token
            }
        });
        setProducto(response.data);
    };

    if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Activo") {
        return (
            <div>
                <div className='col-lg-12 col-sm-4 col-12'>

                    <div className="card shadow text-center rounded-3">
                        <h1 className='p-3'>Bienvenido a FOCEPNI, {authUser.nombre}</h1>
                    </div>

                </div>

                <div className="row mt-5">

                    <div className="col-xl-6 col-sm-6 col-12 mt-4">

                        <div className="card shadow rounded-5">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                    <span className="dash-widget-icon bg-success">
                                        <i className="fa-solid fa-shop"></i>
                                    </span>
                                    <div className="dash-count">
                                        <a href='/productEm/listar'
                                            style={
                                                {textDecoration: "none"}
                                            }
                                            className="text-dark fw-bold">Productos Registrados</a>
                                        <h6 href="#" className="mt-2 text-center text-muted count">
                                            {
                                            producto.length
                                        }</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-xl-6 col-sm-6 col-12 mt-4">
                        <div className="card shadow rounded-5">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                    <span className="dash-widget-icon bg-success">
                                        <i className="fa-solid fa-message"></i>
                                    </span>
                                    <div className="dash-count">
                                        <a href='/sugerenciasEm/listar'
                                            style={
                                                {textDecoration: "none"}
                                            }
                                            className="text-dark fw-bold">Sugerencias enviadas</a>
                                        <h6 href="#" className="mt-2 text-center text-muted count">
                                            {
                                            `${
                                                sugerencias.length
                                            }/3`
                                        }</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Bloqueado") {

        return (

            <>
                xd
            </>

        );

    }
}

export default DashEmActivo
