import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";

export const RegistroEmprendedores = () => {
    const [state, setState] = useState({
        // state agarra el nombre
        // setState le asigna un valor
        edad: "",
        sexo: "",
        nacionalidad: "",
        telefonoContacto: "",
        distrito: "",
        estadoCivil: "",
        escolaridad: "",
        profesion: "",
        nPersonasDependientes: "",
        nDosis: "",
        usuario_identificacion: "",
    });

    const [, forceUpdate] = useState(); // this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: {
                forceUpdate: forceUpdate,
            },
            className: "small text-danger mdi mdi-alert pt-1 pl-1",
        })
    );

    useEffect(() => {
        document.title = "Crear Usuario";
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
                imagen: event.target.result,
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
                .post("/api/v1/emprendedor/store", $(e.target).serialize())
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
        <main>
            <section id="home">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12">
                            <form
                                className="bg-light"
                                onSubmit={onSubmitHandle}
                            >
                                <div className="row">

                                    <div className="col-6">
                                        <h3>Informacion del emprendedor</h3>

                                        <div className="form-group">
                                            <label>Edad</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm input-text"
                                                    id="edad"
                                                    name="edad"
                                                    placeholder="Edad"
                                                    value={state.edad}
                                                    onChange={onChangeHandle}
                                                />
                                            </div>
                                            {simpleValidator.current.message(
                                                "edad",
                                                state.edad,
                                                "required|string"
                                            )} 
                                        </div>

                                        <div className="form-group">
                                            <label>Sexo</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control form-control-sm input-text"
                                                    id="sexo"
                                                    name="sexo"
                                                    value={state.sexo}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option value="Masculino">
                                                        Masculino
                                                    </option>
                                                    <option value="Femenino">
                                                        Femenino
                                                    </option>
                                                </select>
                                            </div>
                                            {simpleValidator.current.message(
                                                "sexo",
                                                state.sexo,
                                                "required|string"
                                            )} 
                                        </div>

                                        <div className="form-group">
                                            <label>Nacionalidad</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm input-text"
                                                    id="nacionalidad"
                                                    name="nacionalidad"
                                                    placeholder="Nacionalidad"
                                                    value={state.nacionalidad}
                                                    onChange={onChangeHandle}
                                                />
                                            </div>
                                            {simpleValidator.current.message(
                                                "nacionalidad",
                                                state.nacionalidad,
                                                "required|string"
                                            )} 
                                        </div>

                                        <div className="form-group">
                                            <label>Telefono de Contacto</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm input-text"
                                                    id="telefonoContacto"
                                                    name="telefonoContacto"
                                                    placeholder="Telefono de Contacto"
                                                    value={
                                                        state.telefonoContacto
                                                    }
                                                    onChange={onChangeHandle}
                                                />
                                            </div>
                                            {simpleValidator.current.message(
                                                "telefonoContacto",
                                                state.telefonoContacto,
                                                "required|string"
                                            )} 
                                        </div>

                                        <div className="form-group">
                                            <label>Distrito</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control form-control-sm input-text"
                                                    id="distrito"
                                                    name="distrito"
                                                    value={state.distrito}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option>Seleccione</option>
                                                    <option value="Nicoya">
                                                        Nicoya
                                                    </option>
                                                    <option value="San Antonio">
                                                        San Antonio
                                                    </option>
                                                    <option value="Quebrada Honda">
                                                        Quebrada Honda
                                                    </option>
                                                    <option value="Mansión">
                                                        Mansión
                                                    </option>
                                                    <option value="Sámara">
                                                        Sámara
                                                    </option>
                                                    <option value="Nosara">
                                                        Nosara
                                                    </option>
                                                    <option value="Belen Nosarita">
                                                        Belén de Nosarita
                                                    </option>
                                                </select>
                                            </div>
                                            {simpleValidator.current.message(
                                                "distrito",
                                                state.distrito,
                                                "required|string"
                                            )} 
                                        </div>

                                        <div className="form-group">
                                            <label>Estado Civil</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-gradient-success">
                                                        <i className="fa-regular fa-id-card"></i>
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control form-control-sm input-text"
                                                    id="estadoCivil"
                                                    name="estadoCivil"
                                                    value={state.estadoCivil}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option>Seleccione</option>
                                                    <option value="Soltero">Soltero(a)</option>
                                                    <option value="Casado">Casado(a)</option>
                                                    <option value="Separado">Separado(a)</option>
                                                    <option value="Divorciado">Divorciado(a)</option>
                                                    <option value="Union Libre">Unión Libre</option>
                                                    <option value="Viudo">Viudo(a)</option>
                                                </select>
                                            </div>
                                            {simpleValidator.current.message(
                                                "estadoCivil",
                                                state.estadoCivil,
                                                "required|string"
                                            )} 
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <button
                            type="submit"
                            className="btn btn-outline-success btn-md mr-2"
                        >
                            Guardar
                        </button>
                        <Link
                            to="/unirse"
                            className="btn btn-outline-danger btn-md"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegistroEmprendedores;
