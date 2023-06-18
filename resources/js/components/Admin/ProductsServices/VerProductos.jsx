import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import rootAction from "../../../redux/actions/index";
import ContentLoader from "react-content-loader";
import { showSznNotification } from "../../../Helpers";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsPDF from "jspdf";
import { Link, useHistory } from "react-router-dom";

function GestSolicitudProduct(props) {
    let history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({
        id: props.location.state.products.id,
        products: props.location.state.products,
        identificacion: props.location.state.products.identificacion,
        nombre: props.location.state.products.nombre,
        primerApellido: props.location.state.products.primerApellido,
        segundoApellido: props.location.state.products.segundoApellido,
        email: props.location.state.products.email,
        edad: props.location.state.products.edad,
        //

        nombreP: props.location.state.products.nombreP,
        descripcionP: props.location.state.products.descripcion,
        categoriaP: props.location.state.products.categoriaP,
        imagen: props.location.state.products.imagenP,
        observacion: props.location.state.products.observacion,
        //
        nombreEmprendimiento:
        props.location.state.products.nombreEmprendimiento,
        direccion: props.location.state.products.direccion,
        categoria: props.location.state.products.categoria,
        nacionalidad: props.location.state.products.nacionalidad,
        distrito: props.location.state.products.distrito,
        nContacto: props.location.state.products.nContacto,
        descripcion: props.location.state.products.descripcion,
        productoServicio: props.location.state.products.productoServicio,
        profesion: props.location.state.products.profesion,

        loading: false,
        authUser: props.authUserProp,
    });

    useEffect(() => {
        document.title = "Gestion";

        props.setActiveComponentProp("GestSoliProduct");
    }, []);

    return (
        <>
            <div className="container-fluid ">
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
                                    Productos principal
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
                        </div>

                        <div className="shadow row p-3 mt-4">
                            <div className="form-group">
                                <h4 className="fw-bold">Datos del producto</h4>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Nombre del producto{" "}
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.nombreP}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Descripción</label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.descripcionP}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">
                                    Categoria del producto
                                </label>
                                <div className="input-group ">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.categoriaP}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2"></div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Imagen</label>
                                <div className="input-group ">
                                    <img
                                        className="img-fluid rounded-2 shadow-sm"
                                        src={`/assets/img/productos/${state.imagen}`}
                                        alt={state.nombreP}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4 col-xs-6 m-0 mt-2"></div>

                            <div className="form-group col-md-12 col-xs-6 m-0 mt-2">
                                <label className="fw-bold">Observaciones</label>
                                <div className="input-group ">
                                <input
                                                readOnly
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                value={state.observacion}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GestSolicitudProduct);
