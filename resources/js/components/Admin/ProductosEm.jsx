import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ListProductEm from './ProductsServices/ListProductosEm';
import NuevoProducto from './ProductsServices/NuevoProducto';
import EditProduct from './ProductsServices/EditProduct';
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


    if (authUser.tipo_usuario == "Emprendedor" && authUser.state == "Activo") {
        
        return (
            <React.Fragment>
                <BrowserRouter>
                <div className="page-header">
                <h3 className="page-title">

                            <span className="page-title-icon bg-gradient-light text-dark mr-2">
                                {activeComponent &&
                                activeComponent == "ListProductsEm" ? (
                                    <i className="fa-solid fa-image"></i>
                                ) : activeComponent &&
                                  activeComponent == "NuevoProducto" ? (
                                    <i className="fa-solid fa-image"></i>
                                ) : activeComponent &&
                                  activeComponent == "EditProduct" ? (
                                    <i className="fa-solid fa-image"></i>
                                ) : (
                                    ""
                                )}
                            </span>
                            
                            {activeComponent && activeComponent == "ListProductsEm"
                                ? `Lista de Productos de ${authUser.nombre}`
                                : activeComponent &&
                                  activeComponent == "NuevoProducto"
                                ? "Nuevo producto"
                                : activeComponent &&
                                  activeComponent == "EditProduct"
                                ? "Editar producto"
                                :""}
                        </h3>

                <nav aria-label="breadcrumb">
                            {activeComponent &&
                            activeComponent != "ListProductsEm" ? (
                                <Link
                                    to="/productEm/listar"
                                    className="btn btn-social-icon-text btn-danger p-3"
                                >
                                    <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                                    &nbsp; 
                                </Link>
                            ) : (
                                <Link
                                    to="/product/store"
                                    className="btn btn-social-icon-text btn-success p-3"
                                >
                                    <i className="mdi mdi-plus-circle-outline btn-icon-prepend"></i>
                                    &nbsp; Nuevo producto
                                </Link>
                            )}
                        </nav>
                </div>


                <div className="container-fluid p-1">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-6">
                            <Switch>
                                <Route exact path="/productEm/listar">

                                    <ListProductEm />

                                </Route>
                                <Route exact path="/product/store">

                                    <NuevoProducto />
                                    
                                </Route>

                                <Route

                                  exact path="/product/update/:id"
                                    component={EditProduct}
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