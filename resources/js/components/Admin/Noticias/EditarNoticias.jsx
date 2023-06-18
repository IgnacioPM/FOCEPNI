import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import rootAction from "../../../redux/actions/index";
import {fadeIn} from "animate.css";
import BeatLoader from "react-spinners/BeatLoader";
import {showSznNotification} from "../../../Helpers";
import LoadingOverlay from "react-loading-overlay";
import SimpleReactValidator from "simple-react-validator";
import {Link, useHistory} from "react-router-dom";

LoadingOverlay.propTypes = undefined

const EditarNoticias = (props) => {

    const [state, setState] = useState({
        news: props.location.state.news ? props.location.state.news : "",
        nombre: props.location.state.news.nombre ? props.location.state.news.nombre : "",
        fecha: props.location.state.news.fecha ? props.location.state.news.fecha : "",
        descripcion: props.location.state.news.descripcion ? props.location.state.news.descripcion : "",
        ubicacion: props.location.state.news.ubicacion ? props.location.state.news.ubicacion : "",
        imagen: props.location.state.news.imagen ? props.location.state.news.imagen : "",
        srcPrevImg: "/assets/img/noticias/" + props.location.state.news.imagen,
        loading: false,
        authUser: props.authUserProp
    });

    let history = useHistory();

    const [, forceUpdate] = useState(); //this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: { forceUpdate: forceUpdate },
            className: "small text-danger mdi mdi-alert pt-1 pl-1",
        })
    );

    useEffect(() => {
        document.title = "Editar Noticia";

        props.setActiveComponentProp("EditarNoticias");
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
                imagen: event.target.result,
                srcPrevImg: event.target.result,
            });
        };
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            setState({
                ...state,
                loading: true,
            });

            axios
                .put("/api/v1/noticias/actualizar", $(e.target).serialize())
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
                        history.push("/noticias/listar");
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

    return (
        <React.Fragment>
            <div className="animated fadeIn">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 ">
                            <LoadingOverlay
                                active={state.loading}
                                spinner={<BeatLoader />}
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
                                        value={state.news.id}
                                    />

                                    <div className="form-group">
                                        <ul className="nav nav-tabs nav-pills c--nav-pills nav-justified">
                                            <li className="nav-item">
                                                <h4 className="text-bold">
                                                    Editar imagen
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
                                            </div>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm input-text"
                                                id="fecha"
                                                readOnly
                                                name="fecha"
                                                placeholder="Fecha"
                                                value={state.fecha}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
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
                                                placeholder="Nombre"
                                                value={state.nombre}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Descripcion</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark  text-white">
                                                <i className="fa-solid fa-book"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="descripcion"
                                                name="descripcion"
                                                placeholder="Descripcion"
                                                value={state.descripcion}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Ubicacion</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark  text-white">
                                                <i className="fa-solid fa-book"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="ubicacion"
                                                name="ubicacion"
                                                placeholder="Ubicacion"
                                                value={state.ubicacion}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Imagen</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark text-white">
                                                <i className="fa-solid fa-image"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="form-control input-text input-file"
                                                onChange={onFileChange}
                                            />
                                            <input
                                                type="hidden"
                                                name="imagen"
                                                value={state.imagen}
                                            />
                                        </div>
                                        <div className="input-group input-group-sm"></div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group input-group-sm img-preview">
                                            <img
                                                className="Preview-img"
                                                src={state.srcPrevImg}
                                                accept="image/png, image/jpg, image/gif, image/jpeg"
                                                alt=""
                                                width="200px"
                                                height="200px"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-inverse-success btn-md"
                                        >
                                            Actualizar
                                        </button>
                                        &nbsp;
                                        <Link
                                            to="/noticias/listar"
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
    );

}

const mapStateToProps = (state) => {
    return {authUserProp: state.authUserReducer, activeComponentProp: state.activeComponentReducer};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(setAuthUser(user)),
        setActiveComponentProp: (component) => dispatch(rootAction.setActiveComponent(component))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarNoticias);
