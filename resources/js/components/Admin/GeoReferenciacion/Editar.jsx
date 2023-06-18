import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import rootAction from '../../../redux/actions/index'
import { fadeIn } from 'animate.css'
import BeatLoader from 'react-spinners/BeatLoader'
import { showSznNotification} from '../../../Helpers'
import LoadingOverlay from 'react-loading-overlay';
import SimpleReactValidator from 'simple-react-validator';
import { Link, useHistory } from 'react-router-dom';

function EditarUsuariGeo(props) {
    
    const [state, setState] = useState({
        idE: props.location.state.lead.idE,
        lead: props.location.state.lead ? props.location.state.lead : '',
        identificacion: props.location.state.lead.identificacion,
        nombre: props.location.state.lead.nombre ? props.location.state.lead.nombre : '',
        primerApellido: props.location.state.lead.primerApellido,
        segundoApellido: props.location.state.lead.segundoApellido,
        email: props.location.state.lead.email ? props.location.state.lead.email : '',
        nombreEmprendimiento: props.location.state.lead.nombreEmprendimiento,
        direccion: props.location.state.lead.direccion ,
        latitud: props.location.state.lead.latitud ? props.location.state.lead.latitud : '',
        longitud: props.location.state.lead.longitud ? props.location.state.lead.longitud : '',

        loading: false,
        authUser: props.authUserProp
    });
    
    let history = useHistory();
    
    //validator
    const [, forceUpdate] = useState() //this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(new SimpleReactValidator({
            autoForceUpdate: {forceUpdate: forceUpdate},
            className: 'small text-danger mdi mdi-alert pt-1 pl-1'
    }));

    useEffect(() => {
        document.title = 'Georreferencia de usuario';

        props.setActiveComponentProp('Editar');
    },[]);

    const onChangeHandle = (e) =>{
        const { name, value } = e.target;
        setState({
            ...state,
            [name] : value
        });
    }


    const onSubmitHandle = (e) =>{
        e.preventDefault();
        
        if (simpleValidator.current.allValid()) {
            setState({
                ...state,
                loading: true
            });

            axios.post('/api/v1/emprendimiento/addDataGeo', $(e.target).serialize())
            .then(response => {
                setState({
                    ...state,
                    loading: false
                });
                if (response.data.status == 'validation-error') {
                    var errorArray = response.data.message;
                    $.each( errorArray, function( key, errors ) {
                        $.each( errors, function( key, errorMessage ) {
                            showSznNotification({
                                type : 'error',
                                message : errorMessage
                            });
                        });
                    });
                } else if (response.data.status == 'error') {
                        showSznNotification({
                            type : 'error',
                            message : response.data.message
                        });
                } else if (response.data.status == 'success') {
                    showSznNotification({
                        type : 'success',
                        message : response.data.message
                    });
                    history.push('/geo/listar')
                }
            })
            .catch((error) => {
                console.log(error);
                
                setState({
                    ...state,
                    loading: false
                });
                if (error.response.data.status == 'validation-error') {
                    var errorArray = error.response.data.message;
                    $.each( errorArray, function( key, errors ) {
                        $.each( errors, function( key, errorMessage ) {
                            showSznNotification({
                                type : 'error',
                                message : errorMessage
                            });
                        });
                    });
                } else if (error.response.data.status == 'error') {
                    showSznNotification({
                        type : 'error',
                        message : error.response.data.message
                    });
                } 
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }

    }

    
    return (
        <React.Fragment>
            
                <div className=" animated fadeIn">
                        <div className="row  d-flex justify-content-center">
                            <div className="col-md-8 ">
                                <LoadingOverlay
                                    active={state.loading}
                                    spinner={<BeatLoader />}
                                    styles={{
                                        overlay: (base) => ({
                                            ...base,
                                            opacity: '0.5',
                                            filter: 'alpha(opacity=50)',
                                            background: 'white'
                                        })
                                    }}
                                >
                                    <form className="edit-lead-form shadow p-2" onSubmit={onSubmitHandle}>
                                        <input type="hidden" name="api_token" value={state.authUser.api_token} />
                                        <input type="hidden" name='id' value={state.idE} />
                                        

                                       <div className="form-group">
                                        <ul className="nav nav-tabs nav-pills c--nav-pills nav-justified">
                                            <li className="nav-item">
                                                <h4 className="text-bold">
                                                    Agregar Georrefenciación
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>

                                        <div className="form-group">
                                        <label>Identificacion</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                    <i className="mdi mdi-card"></i>
                                                </span>
                                            </div>
                                            <input type="text" readOnly className="form-control form-control-sm input-text"   placeholder="Identificacion" value={state.identificacion} onChange={onChangeHandle}/>
                                        </div>
                                        
                                    </div>

                                        <div className="form-group">
                                        <label>Nombre</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-regular fa-user"></i>
                                                </span>
                                            </div>
                                            <input type="text" readOnly className="form-control form-control-sm input-text"  placeholder="Nombre" value={state.nombre + ` ` + state.primerApellido + ` ` + state.segundoApellido} onChange={onChangeHandle}/>
                                        </div>
                                       
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input type="text" readOnly className="form-control form-control-sm input-text" placeholder="Email" value={state.email} onChange={onChangeHandle}/>
                                        </div>
                                        
                                    </div>

                                    <div className="form-group">
                                        <label>Nombre Emprendimiento</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input type="text" readOnly className="form-control form-control-sm input-text"  placeholder=" " value={state.nombreEmprendimiento} onChange={onChangeHandle}/>
                                        </div>
                                        
                                    </div>

                                    <div className="form-group">
                                        <label>Direccion</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input type="text" readOnly className="form-control form-control-sm input-text"  placeholder="Email" value={state.direccion} onChange={onChangeHandle}/>
                                        </div>
                                        
                                    </div>

                                    <div className="form-group">
                                        <label>Latitud</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input required type="number" className="form-control form-control-sm input-text" id="latitud" name="latitud" placeholder="Latitud" value={state.latitud} onChange={onChangeHandle}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Longitud</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-gradient-dark text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input required type="number" className="form-control form-control-sm input-text" id="longitud" name="longitud" placeholder="Longitud" value={state.longitud} onChange={onChangeHandle}/>
                                        </div>
                                       
                                    </div>


                                        <div className="form-group text-center">
                                            <button  type="submit" className="btn btn-inverse-success btn-md">Actualizar</button>
                                            &nbsp;
                                            <Link to='/geo/listar' className="btn btn-inverse-danger btn-md">Cancel</Link>
                                        </div>
                                    </form>

                                </LoadingOverlay>
                            </div>
                        </div>
                    </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        authUserProp: state.authUserReducer,
        activeComponentProp: state.activeComponentReducer,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(setAuthUser(user)),
        setActiveComponentProp: (component) => dispatch(rootAction.setActiveComponent(component))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarUsuariGeo)