import React, {useState, useEffect} from 'react'
import {useSelector, connect} from 'react-redux';
import rootAction from '../../redux/actions/index'
import 'iziToast/dist/css/iziToast.css';
import DashboardEmprendedor from './DashboardEmprendedor';
import DashEmActivo from './DashEmActivo';

//dashboard

function Dashboard(props) {

    const [users, setUsers] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [emprendedores, setEmprendedores] = useState([]);

    const authUser = useSelector(state => state.authUserReducer);

    useEffect(() => {
        props.setActiveComponentProp('Dashboard');
        loadData();
        loadDataSugerencias();
        loadDataEmprendedores();
    }, []);


    const loadData = async () => {
        const response = await axios.get(`/api/v1/usuario/showAll`, {
            params: {
                api_token: authUser.api_token
            }
        });
        setUsers(response.data);
    };

    const loadDataSugerencias = async () => {
        const response = await axios.get(`/api/v1/sugerencias/showDash`, {
            params: {
                api_token: authUser.api_token
            }
        });
        setSugerencias(response.data);
    };

    const loadDataEmprendedores = async () => {
        const response = await axios.get(`/api/v1/emprendimiento/showDash`, {
            params: {
                api_token: authUser.api_token
            }
        });
        setEmprendedores(response.data);
    };

    const nombre = users.map((e) => {
        if (e.id == authUser.id) {
            const nombre = e.nombre
            return nombre
        }
    })


    if (authUser.tipo_usuario == "SuperAdmin" && authUser.state == "Activo" || authUser.tipo_usuario == "Admin" && authUser.state == "Activo") {
        return (
            <React.Fragment>

                <div className="content container-fluid mt-2 col-12">
                    <div className="row">

                        <div className='col-lg-12 col-sm-4 col-12'>

                        <div className="card shadow text-center rounded-3">
                        <h1 className='p-3'>Bienvenido a FOCEPNI, {nombre}</h1>
                        </div>

                        </div>

                        <div className="col-xl-4 col-sm-4 col-12">

                            <div className="card shadow rounded-5 mt-3">
                                <div className="card-body">
                                    <div className="dash-widget-header">
                                        <span className="dash-widget-icon bg-primary">
                                            <i className="fa-solid fa-users"></i>
                                        </span>
                                        <div className="dash-count">
                                            <a href="/usuario/listar" className="count-title">Usuarios</a>
                                            <h6 href="#" className="mt-1 text-center count">
                                                {
                                                users.length
                                            }</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card shadow rounded-5 mt-3">
                                <div className="card-body">
                                    <div className="dash-widget-header">
                                        <span className="dash-widget-icon bg-warning">
                                            <i className="fe fe-phone"></i>
                                        </span>
                                        <div className="dash-count">
                                            <a href="/usuario/listarEmp" className="count-title">Emprendedores</a>
                                            <h6 href="#" className="mt-1 text-center count">
                                            {
                                                emprendedores.length
                                            }</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card shadow rounded-5 mt-3">
                                <div className="card-body">
                                    <div className="dash-widget-header">
                                        <span className="dash-widget-icon bg-danger">
                                            <i className="fa-solid fa-message"></i>
                                        </span>
                                        <div className="dash-count">
                                            <a href="/sugerencias/listar" className="count-title">Sugerencias</a>
                                            <h6 href="#" className="mt-1 text-center count">
                                                {
                                                sugerencias.length
                                            }</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    } else if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Inactivo") {
        return (
            <React.Fragment>

                
                    <DashboardEmprendedor/>
                

                

            </React.Fragment>
        );
    } else if (authUser.tipo_usuario == "SuperAdmin" && authUser.state == "Bloqueado" || authUser.tipo_usuario == "Admin" && authUser.state == "Bloqueado" || 
    authUser.tipo_usuario == "SuperAdmin" && authUser.state == "Inactivo" || authUser.tipo_usuario == "Admin" && authUser.state == "Inactivo") {
        return (
            <React.Fragment>

            <div className="container">
                <div className="card text-center text-danger">
                    <div className="card-body">
                        <h1>

                        No puede ingresar, no tiene permisos para acceder o su usuario está bloqueado

                        </h1>
                    </div>
                </div>
            </div>

                

            </React.Fragment>
        );
    } else if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Bloqueado") {
        return (
            <React.Fragment>

            <div className="container">
                <div className="card text-center text-danger">
                    <div className="card-body">
                        <h1>

                            Usuario bloqueado, no puede ingresar

                        </h1>
                    </div>
                </div>
            </div>

                

            </React.Fragment>
        );
    } else if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Activo") {
        return (
            <> 

                <DashEmActivo/>
                
            </> 
        );
    } else if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Espera") {
        return (
            <React.Fragment>
                <div className="container rounded-5 ">
                    <div className="card text-center rounded-5">
                        <div className="card-body bg-success-light rounded-5 shadow">
                            <h5 className='text-dark'>

                                Su solicitud ha sido enviada satisfactoriamente, por favor espere a que sea revisada y analizada
                                por nuestros administradores

                            </h5>
                            <p>
                                <a className="text-white mt-4 btn btn-success btn-lg m-2 border-0 rounded-3" href="/clearapp"
                                    style={
                                        {'textDecoration': 'none'}
                                }>Aceptar y Salir</a>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}


// redux state can be accessed as props in this component(Optional)
const mapStateToProps = (state) => {
    return {authUserProp: state.authUserReducer, activeComponentProp: state.activeComponentReducer}
}

/**
 * redux state can be change by calling 'props.setAuthUserProp('demo user');' when 
 * applicable(Optional to )
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(rootAction.setAuthUser(user)),
        setActiveComponentProp: (component) => dispatch(rootAction.setActiveComponent(component))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
