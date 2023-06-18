import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import rootAction from "../../../redux/actions/index";
import ContentLoader from "react-content-loader";
import { showSznNotification } from "../../../Helpers";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsPDF from "jspdf";
import { Link, useHistory } from "react-router-dom";

function VerSolicitud(props) {
    let history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({
        id: props.location.state.solicitud.id,
        solicitud: props.location.state.solicitud,
        identificacion: props.location.state.solicitud.identificacion,
        nombre: props.location.state.solicitud.nombre,
        primerApellido: props.location.state.solicitud.primerApellido,
        segundoApellido: props.location.state.solicitud.segundoApellido,
        email: props.location.state.solicitud.email,
        //
        edad: props.location.state.solicitud.edad,
        sexo: props.location.state.solicitud.sexo,
        nacionalidad: props.location.state.solicitud.nacionalidad,
        nContacto: props.location.state.solicitud.nContacto,
        distrito: props.location.state.solicitud.distrito,
        estadoCivil: props.location.state.solicitud.estadoCivil,
        escolaridad: props.location.state.solicitud.escolaridad,
        profesion: props.location.state.solicitud.profesion,
        nPersonasDependientes: props.location.state.solicitud.NPersonasDependientes,
        nDosis: props.location.state.solicitud.nDosis,
        Observacion: props.location.state.solicitud.observacion,
        //
        fecha_Nac: props.location.state.solicitud.fecha_Nac,
        nombreEmprendimiento: props.location.state.solicitud.nombreEmprendimiento,
        direccion: props.location.state.solicitud.direccion,
        categoria: props.location.state.solicitud.categoria,
        productoServicio: props.location.state.solicitud.productoServicio,
        cantPersonasLaboran: props.location.state.solicitud.cantPersonasLaboran,
        anioInicio: props.location.state.solicitud.anioInicio,
        descripcion: props.location.state.solicitud.descripcion,
        activos: props.location.state.solicitud.activos,
        descLugarEmprendimiento: props.location.state.solicitud.descLugarEmprendimiento,
        planTrabajoAnual: props.location.state.solicitud.planTrabajoAnual,
        asesoria: props.location.state.solicitud.asesoria,
        reqFormalizacion: props.location.state.solicitud.reqFormalizacion,
        administracion: props.location.state.solicitud.administracion,
        estado: props.location.state.solicitud.estado,

        loading: false,
        authUser: props.authUserProp,
    });

        const hoy = new Date();
        const fechaSelect = new Date(state.fecha_Nac);
        const edad = hoy.getFullYear() - fechaSelect.getFullYear();

    useEffect(() => {
        document.title = "Emprendimiento ver";

        props.setActiveComponentProp("EmpInfo");
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="col-lg-12 col-md-12 col-xs-6">
                    <div className="row">
                        <input type="hidden" name="api_token" />

                        <div className="shadow p-3 row">
                            <div className="form-group">
                                <h4 className="fw-bold ">
                                    Datos de la Persona
                                </h4>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0">
                                <label className="fw-bold">
                                    Identificación{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.identificacion}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0">
                                <label className="fw-bold">Nacionalidad</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nacionalidad}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0">
                                <label className="fw-bold">Nombre</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={`${state.nombre} ${state.primerApellido} ${state.segundoApellido}`}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Edad </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={edad}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Correo Electronico{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.email}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Sexo</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.sexo}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Profesion </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.profesion}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Distrito</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.distrito}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Estado Civil</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.estadoCivil}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Escolaridad</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.escolaridad}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Cantidad de personas que dependen
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nPersonasDependientes}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Dosis Covid-19
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nDosis}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="shadow row p-3 mt-4">
                            <div className="form-group">
                                <h4 className="fw-bold">
                                    Datos del Emprendimiento
                                </h4>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Nombre del Emprendimiento{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nombreEmprendimiento}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Direccion del Emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.direccion}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Categoria del emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.categoria}
                                        readOnly
                                    />
                                </div>
                            </div>

                            
                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Numero de Telefono
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nContacto}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Principal Producto que ofrece{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.productoServicio}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Personas que laboran con el
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.cantPersonasLaboran}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Año de Inicio del Emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.anioInicio}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Descripcion del emprendimietnto{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2 ">
                                <label className="fw-bold">
                                    Activos del emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.activos}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Descripcion del lugar donde trabaja el
                                    emprendedor
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.descLugarEmprendimiento}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Plan de trabajo anual del emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.escolaridad}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Asesorias</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.asesoria}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Formalización del emprendimiento
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nPersonasDependientes}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Administración
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.administracion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Estado
                                </label>
                                <div className="input-group ">
                                    {state.estado == "Activo" ? <input
                                        className="form-control fw-bold text-success"
                                        type="text"
                                        value={state.estado}
                                        readOnly
                                    /> : <input
                                    className="form-control fw-bold text-danger"
                                    type="text"
                                    value={state.estado}
                                    readOnly
                                />}
                                    
                                </div>
                            </div>
                            <div className="form-group col-md-12 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Observaciones</label>
                                <div className="input-group ">
                                <input
                                                readOnly
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                value={state.Observacion}
                                            />
                                </div>
                            </div>
                        </div>

            
                        
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        authUserProp: state.authUserReducer,
        activeComponentProp: state.activeComponentReducer,
    };
};

/**
 * redux state can be change by calling 'props.setAuthUserProp('demo user');' when
 * applicable(Optional to )
 *
 */
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(rootAction.setAuthUser(user)),
        setActiveComponentProp: (component) =>
            dispatch(rootAction.setActiveComponent(component)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerSolicitud);
