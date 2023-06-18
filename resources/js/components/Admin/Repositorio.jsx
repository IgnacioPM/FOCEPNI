import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ListarDocumentos from "../Admin/Repositorio/ListarDocumento"
import CrearDocumentos from "../Admin/Repositorio/NuevoDocumento";
import EditarDocumentos from "../Admin/Repositorio/EditarDocumentos";
import "../../variables";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers/index";
import { Provider, useDispatch, useSelector } from "react-redux";
import rootAction from "../../redux/actions/index";


const myStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    //set reducer
    const myDispatch = useDispatch();
    myDispatch(rootAction.setAuthUser(authUser)); //authUser is from blade file

    //get reducer
    const activeComponent = useSelector(
        (state) => state.activeComponentReducer
    );


    if (
        authUser.tipo_usuario == "SuperAdmin" && authUser.state == "Activo" || authUser.tipo_usuario == "Admin" && authUser.state == "Activo"
    ) {
        return (
            <React.Fragment>
                <BrowserRouter>
                <div className="page-header">
                <h3 className="page-title">

                            <span className="page-title-icon bg-gradient-light text-dark mr-2">
                                {activeComponent &&
                                activeComponent == "ListarDocumentos" ? (
                                    <i className="fa-solid fa-file"></i>
                                ) : activeComponent &&
                                  activeComponent == "NuevoDocumento" ? (
                                    <i className="fa-solid fa-file"></i>
                                ) : activeComponent &&
                                  activeComponent == "EditarDocumentos" ? (
                                    <i className="fa-solid fa-file"></i>
                                ) : (
                                    ""
                                )}
                            </span>
                            
                            {activeComponent && activeComponent == "ListarDocumentos"
                                ? "Lista de documentos"
                                : activeComponent &&
                                  activeComponent == "NuevoDocumento"
                                ? "Nuevo documento"
                                : activeComponent &&
                                  activeComponent == "EditarDocumentos"
                                ? "Editar documento"
                                :""}
                        </h3>

                <nav aria-label="breadcrumb">
                            {activeComponent &&
                            activeComponent != "ListarDocumentos" ? (
                                <Link
                                    to="/documents/listar"
                                    className="btn btn-social-icon-text btn-danger p-3"
                                >
                                    <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                                    &nbsp; 
                                </Link>
                            ) : (
                                <Link
                                    to="/documents/store"
                                    className="btn btn-social-icon-text btn-success p-3"
                                >
                                    <i className="mdi mdi-plus-circle-outline btn-icon-prepend"></i>
                                    &nbsp; Nuevo documento
                                </Link>
                            )}
                        </nav>
                </div>


                <div className="container-fluid p-1">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-6">
                            <Switch>
                                <Route exact path="/documents/listar">

                                    <ListarDocumentos />

                                </Route>
                                <Route exact path="/documents/store">

                                    <CrearDocumentos />
                                    
                                </Route>
                                <Route

                                  exact path="/documents/update/:id"
                                    component={EditarDocumentos}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
                </BrowserRouter>
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
export default App;