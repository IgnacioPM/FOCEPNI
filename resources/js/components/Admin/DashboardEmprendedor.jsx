import React, {useState, useEffect, useRef} from 'react'
import {Modal, Button} from 'react-bootstrap';
import {useSelector, connect} from 'react-redux';
import rootAction from '../../redux/actions/index'
import SimpleReactValidator from "simple-react-validator";
import {Link } from "react-router-dom";
//dashemp
function DashboardEmprendedor() {
   
    const [, forceUpdate] = useState(); //this is a dummy state, when form submitted, change the state so that message is rendered


    const authUser = useSelector(state => state.authUserReducer);

    if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Inactivo") {
        return (

            <div className='container-fluid'>
                <h2 className='fw-bold p-2 m-1'>Pasos a seguir a la solicitud de emprendimiento</h2>
                <div className='row'>

                    <div className='card-body text-center border shadow rounded-3 m-4 col-12 p-2' style={{'marginLeft':'-200px'}}>
                        <h3 className='p-3 m-1'>Enviar solicitud de emprendimiento</h3>
                        <p>
                            A continuación debera completar los datos para poder registrar su emprendimiento
                        </p>
                        <p>
                        <Link
                                    to="/EnviarSolicitud"
                                    className="btn btn-social-icon-text btn-success p-3"
                                >
                                    
                                    Completar Solicitud
                        </Link>
                        </p>
                    </div>

                </div>


            </div>

        );
    } 

}

const mapStateToProps = (state) => {
    return {
        authUserProp: state.authUserReducer,
        activeComponentProp: state.activeComponentReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(setAuthUser(user)),
        setActiveComponentProp: (component) =>
            dispatch(rootAction.setActiveComponent(component)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmprendedor);
