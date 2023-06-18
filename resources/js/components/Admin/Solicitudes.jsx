import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../../variables";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers/index";
import { Provider, useDispatch, useSelector } from "react-redux";
import rootAction from "../../redux/actions/index";
import VerSolicitud from "./RegistroEmprendedores/verSolicitud";
import GestSolicitud from "./RegistroEmprendedores/GestSolicitud";

const myStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    // set reducer
    const myDispatch = useDispatch();
    myDispatch(rootAction.setAuthUser(authUser));
    // authUser is from blade file

    // get reducer
    const activeComponent = useSelector(
        (state) => state.activeComponentReducer
    );

    if (
        (authUser.tipo_usuario == "SuperAdmin" && authUser.state == "Activo") ||
        (authUser.tipo_usuario == "Admin" && authUser.state == "Activo")
    ) {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-light text-dark mr-2">
                                {activeComponent &&
                                activeComponent == "VerSolicitud" ? (
                                    <i className="fa-solid fa-envelope"></i>
                                ) : activeComponent &&
                                  activeComponent == "GestionSolicitud" ? (
                                    <i className="fa-solid fa-envelope"></i>
                                ) : (
                                    ""
                                )}{" "}
                            </span>
                            {activeComponent &&
                            activeComponent == "VerSolicitud"
                                ? "Solicitudes de emprendimiento"
                                : activeComponent &&
                                  activeComponent == "GestionSolicitud"
                                ? "Gestion de Solicitud"
                                : ""}{" "}
                        </h3>

                        <nav aria-label="breadcrumb">
                            {activeComponent &&
                            activeComponent == "VerSolicitud" ? (
                                <a
                                    href="/dashboard"
                                    className="btn btn-social-icon-text btn-danger p-3"
                                >
                                    <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                                    &nbsp;
                                </a>
                            ) : activeComponent &&
                              activeComponent == "GestionSolicitud" ? (
                                <Link
                                    to="/verSolicitud"
                                    className="btn btn-social-icon-text btn-danger p-3"
                                >
                                    <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                                    &nbsp;
                                </Link>
                            ) : (
                                ""
                            )}{" "}
                        </nav>
                    </div>

                    <div className="container-fluid p-1">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-6">
                                <Switch>
                                    <Route exact path="/verSolicitud">
                                        <VerSolicitud />
                                    </Route>
                                    <Route
                                        exact
                                        path="/solicitud/update/:id"
                                        component={GestSolicitud}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    } else {
        return (
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
        );
    }
}
export default App;
