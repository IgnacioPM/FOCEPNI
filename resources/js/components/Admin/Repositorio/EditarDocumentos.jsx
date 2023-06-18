import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import rootAction from "../../../redux/actions/index";
import { fadeIn } from "animate.css";
import BeatLoader from "react-spinners/BeatLoader";
import { showSznNotification } from "../../../Helpers";
import LoadingOverlay from "react-loading-overlay";
import SimpleReactValidator from "simple-react-validator";
import { Link, useHistory } from "react-router-dom";

LoadingOverlay.propTypes = undefined

function DocumentsEdit (props){

    const [state, setState] = useState({

        document: props.location.state.document ? props.location.state.document : "",
        nombre: props.location.state.document.nombre ? props.location.state.document.nombre : "",
        fecha: props.location.state.document.fecha? props.location.state.document.fecha: "",
        archivo: props.location.state.document.archivo ? props.location.state.document.archivo : "",
        srcPrevArch: "/documentos/repositorioDocumental/" + props.location.state.document.archivo,
        loading: false,
        authUser: props.authUserProp,

    });

    const [, forceUpdate] = useState(); //this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: { forceUpdate: forceUpdate },
            className: "small text-danger mdi mdi-alert pt-1 pl-1",
        })
    );

    let history = useHistory();

    useEffect(() => {
        document.title = "Editar Documento";

        props.setActiveComponentProp("EditarDocumentos");
    }, []);

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) => {
            setState({
                ...state,
                archivo: event.target.result,
                srcPrevArch: event.target.result,
            });
        };
    };

    

    const onSubmitHandle = (e) => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            setState({
                ...state,
                archivo : "",
                loading: true,
            });

            axios
                .put("/api/v1/documents/actualizar", $(e.target).serialize())
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
                        history.push("/documents/listar");
                    }
                })
                .catch((error) => {
                    console.log(error);

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

    return(
        <React.Fragment>
            <div className="animated fadeIn">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 ">
                            <LoadingOverlay
                                active={state.loading}
                                spinner={<BeatLoader />}
                                styles={{
                                    overlay: (base) => ({
                                        ...base,
                                        opacity: "0.5",
                                        filter: "alpha(opacity=50)",
                                        background: "white",
                                    }),
                                }}
                            >
                                <form
                                    className="edit-lead-form shadow p-2"
                                    onSubmit={onSubmitHandle}
                                >
                                    <input
                                        type="hidden"
                                        name="api_token"
                                        value={state.authUser.api_token}
                                    />
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={state.document.id}
                                    />

                                    <div className="form-group">
                                        <ul className="nav nav-tabs nav-pills c--nav-pills nav-justified">
                                            <li className="nav-item">
                                                <h4 className="text-bold">
                                                    Editar documento
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark  text-white">
                                                <i className="fa-solid fa-credit-card"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="nombre"
                                                name="nombre"
                                                readOnly
                                                placeholder="Nombre"
                                                value={state.nombre}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                        {simpleValidator.current.message(
                                            "nombre",
                                            state.nombre,
                                            "required|string"
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark text-white">
                                                <i className="fa-solid fa-calendar-days"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm input-text"
                                                id="fecha"
                                                name="fecha"
                                                readOnly
                                                placeholder="Fecha"
                                                value={state.fecha}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                        {simpleValidator.current.message(
                                            "fecha",
                                            state.fecha,
                                            "required|string"
                                        )}
                                    </div>

                                    
                                    <div className="form-group">
                                        <label>Documento</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark text-white">
                                                <i className="fa-solid fa-image"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                className="form-control input-text input-file"
                                                onChange={onFileChange}
                                            />
                                            <input
                                                type="hidden"
                                                name="archivo"
                                                value={state.archivo}
                                            />
                                        </div>
                                        <div className="input-group input-group-sm"></div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group input-group-sm img-preview">
                                        <object data={state.srcPrevArch} className="shadow-sm"
                                         type='application/pdf'
                                         style={{" width" : "300px", "height" : "200px"}}>
                                        </object>
                                     
                                        </div>
                                    </div>

                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-inverse-success btn-md "
                                        >
                                            Actualizar
                                        </button>
                                        &nbsp;
                                        <Link
                                            to="/documents/listar"
                                            className="btn btn-inverse-danger btn-md"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </LoadingOverlay>
                        </div>
                    </div>
            </div>
        </React.Fragment>
    )





}
const mapStateToProps = (state) => {
    return {authUserProp: state.authUserReducer, activeComponentProp: state.activeComponentReducer}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(rootAction.setAuthUser(user)),
        setActiveComponentProp: (component) => dispatch(rootAction.setActiveComponent(component))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsEdit)