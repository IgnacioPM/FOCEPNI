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

function EnviarSolicitud(props) {

    const [state, setState] = useState({
        //state agarra el nombre
        //setState le asigna un valor
        fecha_Nac: "",
        edad: "",
        sexo: "",
        nacionalidad: "",
        nContacto: "",
        distrito: "",
        estadoCivil: "",
        escolaridad: "",
        profesion: "",
        nPersonasDependientes: "",
        nDosis: "",
        //
        nombreEmprendimiento: "",
        direccion: "",
        categoria: "",
        productoServicio: "",
        cantPersonasLaboran: "",
        anioInicio: "",
        descripcion: "",
        activos: "",
        estado: "",
        descLugarEmprendimiento: "",
        planTrabajoAnual: "",
        asesoria: "",
        reqFormalizacion: "",
        administracion: "",
        idUsuario:"",

        loading: false,
        authUser: props.authUserProp,
    });

    let history = useHistory();

    const select = (select) => {
        select = state.categoria
        if(select == 'Produccion Primaria'){
            return(
                <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                    <label className="ml-1">Actividad que realiza</label>
                <div className="input-group ">
                <select
                    className="form-control"
                    id="productoServicio"
                    name="productoServicio"
                    value={state.productoServicio}
                    onChange={onChangeHandle}
                >
                    <option value="Agricultura">
                        Agricultura
                    </option>
                    <option value="Ganadería">
                        Ganadería
                    </option>
                    <option value="Pesca Artesanal">
                        Pesca Artesanal
                    </option>
                    <option value="Especies menores">
                        Especies menores
                    </option>
                </select>
                </div>
            </div>
            )
        }else if(select == 'Servicios'){
            return(
                <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                    <label className="ml-1">Principal servicio que ofrece</label>
                <div className="input-group ">
                <select
                    className="form-control"
                    id="productoServicio"
                    name="productoServicio"
                    value={state.productoServicio}
                    onChange={onChangeHandle}
                >
                    <option value="Logística">
                    Logística
                    </option>
                    <option value="Bienestar">
                    Bienestar
                    </option>
                    <option value="Cuidado personal">
                    Cuidado personal
                    </option>
                    <option value="Turismo rural">
                    Turismo rural
                    </option>
                    <option value="Capacitación">
                    Capacitación
                    </option>
                    <option value="Mantenimiento">
                    Mantenimiento
                    </option>
                    <option value="Información">
                    Información
                    </option>
                    <option value="Servicios misceláneos">
                    Servicios misceláneos
                    </option>
                </select>
                </div>
            </div>
            )
        }else if(select == 'artesania'){
            return(
                <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                     <label className="ml-1">Principal producto que ofrece</label>
                <div className="input-group ">
                <select
                    className="form-control"
                    id="productoServicio"
                    name="productoServicio"
                    value={state.productoServicio}
                    onChange={onChangeHandle}
                >
                     <option value="Productos Artesanales de Madera">
                    Productos Artesanales de Madera
                    </option>
                    <option value="Productos Artesanales de Cuero">
                    Productos Artesanales de Cuero
                    </option>
                    <option value="Productos Artesanales de Cuidado personal">
                    Productos Artesanales de Cuidado personal
                    </option>
                    <option value="Productos Artesanales de Hierro">
                    Productos Artesanales de Hierro
                    </option>
                    <option value="Productos Artesanales de  Otros Metales">
                    Productos Artesanales de  Otros Metales
                    </option>
                    <option value="Productos Artesanales de Papel">
                    Productos Artesanales de Papel
                    </option>
                    <option value="Productos Artesanales de Plástico">
                    Productos Artesanales de Plástico
                    </option>
                    <option value="Productos Artesanales de Piedra">
                    Productos Artesanales de Piedra
                    </option>
                    <option value="Productos Artesanales de Materiales reutilizados">
                    Productos Artesanales de Materiales reutilizados
                    </option>
                    <option value="Productos Biodegradables">
                    Productos Biodegradables
                    </option>
                </select>
                </div>
            </div>
            )
        }else if(select == 'agroindustria'){
            return(
                <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                     <label className="ml-1">Principal producto que ofrece</label>
                <div className="input-group ">
                    <select
                        className="form-control"
                        id="productoServicio"
                        name="productoServicio"
                        placeholder="Cual es su producto principal?"
                        value={state.productoServicio}
                        onChange={onChangeHandle}
                    >
                        <option value="Logística">
                        Granos
                        </option>
                        <option value="Bienestar">
                        Frutas
                        </option>
                        <option value="Cuidado personal">
                        Verduras
                        </option>
                        <option value="Turismo rural">
                        Lácteos
                        </option>
                    </select>
                </div>
            </div>
            )
        }
    }

    //validator
    const [, forceUpdate] = useState(); //this is a dummy state, when form submitted, change the state so that message is rendered
    const simpleValidator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: { forceUpdate: forceUpdate },
            className: "small text-danger mdi mdi-alert pt-1 pl-1",
        })
    );

        const hoy = new Date();
        const fechaSelect = new Date(state.fecha_Nac);
        const edad = hoy.getFullYear() - fechaSelect.getFullYear();
        
        const anioActual = hoy.getFullYear();
        const minYear = anioActual-18;

        const CalcEdad = () => {
            if(isNaN(edad)) {
            return 0 }else{
                return edad
            }
        }

    useEffect(() => {
        document.title = "Solicitud de emprendimiento";

        props.setActiveComponentProp("EnviarSolicitud");
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

            axios.post("/api/v1/emprendimiento/enviar", $(e.target).serialize())
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
                        history.push("/usuarioEspera");
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

                
                    <div className="container-fluid  ">
                        <div className="col-md-12 col-xs-6 ">

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
                                
                                    className="row d-flex p-3 justify-content-center"
                                    onSubmit={onSubmitHandle}
                                >
                                    <input
                                        type="hidden"
                                        name="api_token"
                                        value={state.authUser.api_token}
                                    />

                                    <div className="form-group">
                                        <h3>Solicitud de emprendimiento</h3>
                                    </div>

                                <div  className="p-3 shadow-sm row "> 
                                <div className="form-group">
                                    <h5>Datos faltantes del emprendedor</h5>
                                </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0">
                                    <label htmlFor="" className="ml-1">Fecha de nacimiento</label>
                                        <div className="input-group ">
                                            <input
                                                type="date"
                                                required
                                                className="form-control form-control-sm"
                                                id="fecha_Nac"
                                                name="fecha_Nac"
                                                placeholder="..."
                                                value={state.fecha_Nac}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0">
                                    <label htmlFor="" className="ml-1">Edad</label>
                                        <div className="input-group ">
                                            <input
                                                readOnly
                                                type="int"
                                                className="form-control form-control-sm"
                                                id="edad"
                                                name="edad"
                                                placeholder="Edad"
                                                value={CalcEdad()}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0">
                                    <label htmlFor="" className="ml-1">Sexo</label>
                                       <div className="input-group ">
                                            <select
                                            required
                                                    className="form-control"
                                                    id="sexo"
                                                    name="sexo"
                                                    value={state.sexo}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option>
                                                        Seleccione
                                                    </option>
                                                    <option value="Masculino">
                                                        Masculino
                                                    </option>
                                                    <option value="Femenino">
                                                        Femenino
                                                    </option>
                                                </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label htmlFor="" className="ml-1">Nacionalidad</label>
                                        <div className="input-group ">
                                        <input
                                        required
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    id="nacionalidad"
                                                    name="nacionalidad"
                                                    placeholder="..."
                                                    value={state.nacionalidad}
                                                    onChange={onChangeHandle}
                                                />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label htmlFor="" className="ml-1">Numero de telefono</label>
                                        <div className="input-group ">
                                        <input
                                        required
                                            type="text"
                                            className="form-control form-control-sm "
                                            id="nContacto"
                                            name="nContacto"
                                            placeholder="..."
                                            value={
                                                state.nContacto
                                            }
                                            onChange={onChangeHandle}
                                        />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label htmlFor="" className="ml-1">Distrito</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                    className="form-control form-control-sm "
                                                    id="distrito"
                                                    name="distrito"
                                                    value={state.distrito}
                                                    onChange={onChangeHandle}
                                                
                                                >
                                                    <option>Distrito</option>
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
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label htmlFor="" className="ml-1">Estado Civil</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                    className="form-control form-control-sm"
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
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Escolaridad</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                    className="form-control form-control-sm "
                                                    id="escolaridad"
                                                    name="escolaridad"
                                                    value={state.escolaridad}
                                                    onChange={onChangeHandle}
                                                >
                                                <option>Seleccione</option>
                                                <option value="Primaria Completa">Primaria completa</option>
                                                <option value="Primaria Incompleta">Primaria incompleta</option>
                                                <option value="Secundaria Completa">Secundaria completa</option>
                                                <option value="Secundaria Incompleta">Secundaria incompleta</option>
                                                <option value="Bachillerato Universitario">Bachillerato universitario</option>
                                                <option value="Bachillerato Universitario Imconpleto">Bachillerato universitario incompleto</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                                <option value="LicenciaturaIncompleta">Licenciatura incompleta</option>
                                                <option value="Maestria">Maestría</option>
                
                                                </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Profesion</label>
                                        <div className="input-group ">
                                        <input
                                        required
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    id="profesion"
                                                    name="profesion"
                                                    placeholder="Profesion"
                                                    value={
                                                        state.profesion
                                                    }
                                                    onChange={onChangeHandle}
                                                />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Personas dependientes</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                className="form-control"
                                                id="nPersonasDependientes"
                                                name="nPersonasDependientes"
                                                value={state.nPersonasDependientes}
                                                onChange={onChangeHandle}
                                            >
                                                <option>Seleccione</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Dosis de Covid-19 aplicadas</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                    className="form-control form-control-sm "
                                                    id="nDosis"
                                                    name="nDosis"
                                                    value={state.nDosis}
                                                    onChange={onChangeHandle}
                                                >
                                                <option>Seleccione</option>
                                                <option value="1">Primera dosis</option>
                                                <option value="2">Segunda dosis</option>
                                                <option value="3 o mas">tercera o más dosis</option>
                                            
                
                                                </select>
                                        </div>
                                    </div>
                                </div>
                                   
                                <div className="p-3 shadow-sm row mt-3">
                                <div className="form-group">
                                        <h5>Datos de su emprendimiento</h5>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label htmlFor="" className="ml-1">Ingrese un nombre para su emprendimiento</label>
                                        <div className="input-group ">
                                            <input
                                            required
                                                type="text"
                                                className="form-control form-control-sm  "
                                                id="nombreEmprendimiento"
                                                name="nombreEmprendimiento"
                                                placeholder="Ingrese un nombre para su Emprendimiento "
                                                value={state.nombreEmprendimiento}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Direccion exacta de la ubicacion de su emprendimiento</label>
                                        <div className="input-group ">
                                            <input
                                            required
                                                type="text"
                                                className="form-control form-control-sm  "
                                                id="direccion"
                                                name="direccion"
                                                placeholder="..."
                                                value={state.direccion}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label className="ml-1">Categoria que corresponde su emprendimieto</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                                    className="form-control"
                                                    id="categoria"
                                                    name="categoria"
                                                    value={state.categoria}
                                                    onChange={onChangeHandle}
                                                >
                                                    <option>Seleccione</option>
                                                    <option value="artesania">
                                                        Artesanía
                                                    </option>
                                                    <option value="agroindustria">
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

                                    {select()}


                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label htmlFor="" className="ml-1">Cantidad de empleados</label>
                                        <div className="input-group ">
                                            <select
                                            required
                                                className="form-control"
                                                id="cantPersonasLaboran"
                                                name="cantPersonasLaboran"
                                                value={state.cantPersonasLaboran}
                                                onChange={onChangeHandle}
                                            >
                                                <option>Seleccione</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label className="ml-1">Año de inicio de su emprendimiento</label>
                                        <div className="input-group ">
                                            <input
                                            required
                                                type="number"
                                                className="form-control form-control-sm  "
                                                id="anioInicio"
                                                name="anioInicio"
                                                placeholder="..."
                                                value={state.anioInicio}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                            
                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label className="ml-1">Descripción de su emprendimiento</label>
                                        <div className="input-group ">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm  "
                                                id="descripcion"
                                                name="descripcion"
                                                placeholder="...."
                                                value={state.descripcion}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label className="ml-1">Activos</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="activos"
                                            name="activos"
                                            value={state.activos}
                                            onChange={onChangeHandle}
                                            selectedvalue='Seleccione'
                                        >
                                            <option >Seleccione</option>
                                            <option value="Si">
                                                Si
                                            </option>
                                            <option value="No">
                                                No
                                            </option>
                                            
                                        </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2 ">
                                    <label className="ml-1">Descripción del lugar de trabajo</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="descLugarEmprendimiento"
                                            name="descLugarEmprendimiento"
                                            value={state.descLugarEmprendimiento}
                                            onChange={onChangeHandle}
                                        >
                                            <option>Seleccione</option>
                                            <option value=" Casa de habitación">
                                                Casa de habitación
                                            </option>
                                            <option value=" Casa de un familiar">
                                                Casa de un familiar
                                            </option>
                                            <option value="Alquila un local">
                                                Alquila un local
                                            </option>
                                        </select>
                                        </div>
                                    </div>


                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label className="ml-1">Posee un plan de trabajo anual?</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="planTrabajoAnual"
                                            name="planTrabajoAnual"
                                            value={state.planTrabajoAnual}
                                            onChange={onChangeHandle}
                                        >
                                            <option  >Seleccione</option>
                                            <option value="Si">
                                                Si
                                            </option>
                                            <option value="No">
                                                No
                                            </option>
                                            
                                        </select>
                                        </div>
                                    </div>                                  

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label className="ml-1">Asesorias de instituciones</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="asesoria"
                                            name="asesoria"
                                            value={state.asesoria}
                                            onChange={onChangeHandle}
                                        >
                                            <option  >Seleccione</option>
                                            <option value="INA">
                                                Instituto Nacional de Aprendizaje
                                            </option>
                                            <option value="MEIC">
                                                Ministerio de Economía, Industria y Comercio
                                            </option>
                                            <option value="IMAS">
                                                Instituo Mixto de Ayuda Social
                                            </option>
                                            <option value="UCR">
                                                Universidad de Costa Rica
                                            </option>
                                            <option value="UNA">
                                                Universidad Naacional
                                            </option>
                                            <option value="UNED">
                                                Universidad Estatal a Distancia
                                            </option>
                                        </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                    <label className="ml-1">Requicitos de formalización</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="reqFormalizacion"
                                            name="reqFormalizacion"
                                            value={state.reqFormalizacion}
                                            onChange={onChangeHandle}
                                        >
                                            <option  >Seleccione</option>
                                            <option value="Tributación">
                                            Tributación
                                            </option>
                                            <option value="Patente">
                                            Patente
                                            </option>
                                            <option value="Permiso de Ministerio de Salud">
                                            Permiso de Ministerio de Salud
                                            </option>
                                            <option value="Instituto Nacional de Seguros">
                                            Instituto Nacional de Seguros
                                            </option>
                                            <option value="De trabajador independinete">
                                            De trabajador independinete
                                            </option>
                                            <option value="Ninguno">
                                            Ninguno
                                            </option>

                                        </select>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4 col-xs-6 m-0 mt-2">
                                        <label className="ml-1">La administracion es</label>
                                        <div className="input-group ">
                                        <select
                                        required
                                            className="form-control"
                                            id="administracion"
                                            name="administracion"
                                            value={state.administracion}
                                            onChange={onChangeHandle}
                                        >
                                            <option  >Seleccione</option>
                                            <option value=" Compartida con familiares">
                                            Compartida con familiares
                                            </option>
                                            <option value=" Compartida con amistades">
                                            Compartida con amistades
                                            </option>
                                            <option value="Propia">
                                            Propia
                                            </option>

                                        </select>
                                        </div>
                                    </div>

                                    
                                        <div className="input-group ">
                                            <input
                                            hidden
                                                type="text"
                                                className="form-control form-control-sm  "
                                                id="estado"
                                                name="estado"
                                                placeholder="estado"
                                                value="Espera"
                                                onChange={onChangeHandle}
                                            />
                                        </div>

                                        <div className="input-group ">
                                            <input
                                            hidden
                                                type="text"
                                                className="form-control form-control-sm  "
                                                id="idUsuario"
                                                name="idUsuario"
                                                placeholder="idUsuario "
                                                value={authUser.id}
                                                onChange={onChangeHandle}
                                            />
                                        </div>
                                </div>    

                                    <div className="form-group row d-flex justify-content-center mt-3">
                                        <button
                                            type="submit"
                                            className="col-sm-3 btn btn-inverse-success btn-md">
                                            Enviar
                                        </button>
                                        &nbsp;
                                        <Link
                                            to="/dashboard"
                                            className="col-sm-3 btn btn-inverse-danger btn-md"
                                        >
                                            Cancelar
                                        </Link>
                                    </div>

                                </form>

                            </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnviarSolicitud);