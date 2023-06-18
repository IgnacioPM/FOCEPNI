import { React, Component } from "react";
import ListarSugerencias from "./Sugerencias/ListarSugerencias";
import { Link } from "react-router-dom";

class Sugerencias extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
    }

    handleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        if (
            (authUser.tipo_usuario == "SuperAdmin" &&
                authUser.state == "Activo") ||
            (authUser.tipo_usuario == "Admin" && authUser.state == "Activo")
        ) {
            return (
              <>
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-light text-dark">
                                <i className="fa-solid fa-message"></i>
                            </span>
                            &nbsp; Sugerencias
                        </h3>
                        <nav aria-label="breadcrumb">
                            <Link
                                to="/dashboard"
                                className="btn btn-social-icon-text btn-danger p-3"
                            >
                                <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                                &nbsp;
                            </Link>
                        </nav>
                    </div>

                    <div className="container-fluid p-1">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-6">
                                <ListarSugerencias />
                            </div>
                        </div>
                    </div>
                    </>
            );
        } else {
            return (
                <div className="container">
                    <div className="card text-center text-danger">
                        <div className="card-body">
                            <h1>
                            No puede ingresar, no tiene permisos para acceder o su usuario está bloqueado
                                </h1>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Sugerencias;
