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

LoadingOverlay.propTypes = undefined

registerLocale('es', es)

function NuevoProducto(props){

    const [state, setState] = useState({
        //state agarra el nombre
        //setState le asigna un valor
        nombreP: "",
        imagenP: "",
        descripcion: "",
        categoriaP: "",
        idUser: "",
        pState: "",
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
        document.title = "Agregar nuevo producto";
        
        props.setActiveComponentProp("NuevoProducto");
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
            console.log(event.target.result);
            setState({
                ...state,
                imagenP: event.target.result,
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

            axios.post("/api/v1/products/guardar", $(e.target).serialize())
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
                        history.push("/productEm/listar");
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


    if (
        authUser.tipo_usuario == "Emprendedor" && authUser.state == "Activo"
    ) {
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
                                                    Nuevo producto
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
                                                id="nombreP"
                                                name="nombreP"
                                                placeholder="Nombre del producto"
                                                value={state.nombreP}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Descipcion</label>
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
                                                placeholder="Descripcion del producto"
                                                value={state.descripcion}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Categoria del producto</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-dark text-white">
                                                <i className="fa-solid fa-book"></i>
                                                </span>
                                            </div>
                                            <select
                                                    className="form-control form-control-sm "
                                                    id="categoriaP"
                                                    name="categoriaP"
                                                    value={state.categoriaP}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option>Seleccione</option>
                                                    <option value="Artesania">
                                                        Artesanía
                                                    </option>
                                                    <option value="Agroindustria">
                                                        Agroindustria
                                                    </option>
                                                    <option value="Produccion Primaria">
                                                        Producción primaria
                                                    </option>
                                                    <option value="Servicios">
                                                        Servicios
                                                    </option>
                                                </select>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        
                                       
                                            <input
                                            hidden
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="idUser"
                                                name="idUser"
                                                value={authUser.id} 
                                                onChange={onChangeHandle}
                                            />
                                    </div>

                                    <div className="form-group">
                                        
                                       
                                            <input
                                            hidden
                                                type="text"
                                                className="form-control form-control-sm input-text"
                                                id="pState"
                                                name="pState"
                                                value="Espera"
                                                onChange={onChangeHandle}
                                            />
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
                                                className="form-control form-control-sm input-text input-file"
                                                onChange={onFileChange}/>
                                            <input
                                                type="hidden"
                                                name="imagenP"
                                                value={state.imagenP}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group input-group-sm img-preview">
                                            <img
                                                className="Preview-img"
                                                src={state.imagenP}
                                                accept="image/png, image/jpg, image/gif, image/jpeg"
                                                alt=""
                                                width="150px"
                                                height="150px"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-inverse-success btn-md">
                                            Guardar
                                        </button>
                                        &nbsp;
                                        <Link
                                            to="/productEm/listar"
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
    }else{
        return(
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
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(NuevoProducto);
