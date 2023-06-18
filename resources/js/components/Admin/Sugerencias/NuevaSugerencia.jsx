import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import rootAction from "../../../redux/actions/index";
import { fadeIn } from "animate.css";
import BeatLoader from "react-spinners/BeatLoader";
import { showSznNotification } from "../../../Helpers";
import LoadingOverlay from "react-loading-overlay";
import SimpleReactValidator from "simple-react-validator";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker"
import  "react-datepicker/dist/react-datepicker.css" ;
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

LoadingOverlay.propTypes = undefined
function NuevaSugerencia(props){

    const [state, setState] = useState({
        //state agarra el nombre
        //setState le asigna un valor
        fecha: new Date(),
        sugerencia: "",
        idUsuario: "",
        loading: false,
        authUser: props.authUserProp,
    });

    let history = useHistory();


    //validator
    const [, forceUpdate] = useState(); //this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: { forceUpdate: forceUpdate },
            className: "small text-danger mdi mdi-alert pt-1 pl-1",
        })
    );

    useEffect(() => {
        document.title = "Enviar sugerencia";

        props.setActiveComponentProp("NuevaSugerencia");
    }, []);

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            setState({
                ...state,
                loading: true,
            });

            axios.post("/api/v1/sugerencias/guardar", $(e.target).serialize())
                .then((response) => {
                    setState({
                        ...state,
                        loading: false,
                    });

                    if (response.data.status == "validation-error") {
                        var errorArray = response.data.message;
                        $.each(errorArray, function (key, errors) {
                            $.each(errors, function (key, errorMessage) {
                                showSznNotification({
                                    type: "error",
                                    message: errorMessage,
                                });
                            });
                        });
                    } else if (response.data.status == "error") {
                        showSznNotification({
                            type: "error",
                            message: response.data.message,
                        });
                    } else if (response.data.status == "success") {
                        showSznNotification({
                            type: "success",
                            message: response.data.message,
                        });
                        history.push("/sugerenciasEm/listar");
                    }
                })
                .catch((error) => {
                    setState({
                        ...state,
                        loading: false,
                    });
                    if (error.response.data.status == "validation-error") {
                        var errorArray = error.response.data.message;
                        $.each(errorArray, function (key, errors) {
                            $.each(errors, function (key, errorMessage) {
                                showSznNotification({
                                    type: "error",
                                    message: errorMessage,
                                });
                            });
                        });
                    } else if (error.response.data.status == "error") {
                        showSznNotification({
                            type: "error",
                            message: error.response.data.message,
                        });
                    }
                });
                
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    };

    return (
        <React.Fragment>
                <div className="animated fadeIn">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8">
                            <LoadingOverlay
                                active={state.loading}
                                spinner={<BeatLoader />}
                            >
                                <form
                                    className="new-lead-form shadow p-2"
                                    onSubmit={onSubmitHandle}
                                >
                                    <input
                                        type="hidden"
                                        name="api_token"
                                        value={state.authUser.api_token}
                                    />
<div className="form-group">
                                        <ul className="nav nav-tabs nav-pills c--nav-pills nav-justified">
                                            <li className="nav-item">
                                                <h4 className="text-bold">
                                                    Nueva sugerencia
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>


                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-dark text-white">
                                                <i className="fa-solid fa-calendar-days"></i>
                                                </span>
                                                <DatePicker
                                                locale="es"
                                                className="form-control bg-white border-white"
                                                dateFormat="yyy/MM/dd"
                                                id="fecha"
                                                readOnly
                                                name="fecha"
                                                placeholder="Fecha"
                                                selected={state.fecha}
                                            />
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Descripcion de la sugerencia</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-dark  text-white">
                                                <i className="fa-solid fa-book"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="sugerencia"
                                                name="sugerencia"
                                                placeholder="Descripcion de la sugerencia"
                                                value={state.sugerencia}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                        {simpleValidator.current.message(
                                            "sugerencia",
                                            state.sugerencia,
                                            "required|string"
                                        )}
                                    </div>

                                    <div className="form-group">
                                       
                                        <div className="input-group input-group-sm">
                                            <input
                                            hidden
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="idUsuario"
                                                name="idUsuario"
                                                value={authUser.id}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-inverse-success btn-md">
                                            Enviar
                                        </button>
                                        &nbsp;
                                        <Link
                                            to="/sugerenciasEm/listar"
                                            className="btn btn-inverse-danger btn-md"
                                        >
                                            Cancelar
                                        </Link>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(setAuthUser(user)),
        setActiveComponentProp: (component) =>
            dispatch(rootAction.setActiveComponent(component)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevaSugerencia);
