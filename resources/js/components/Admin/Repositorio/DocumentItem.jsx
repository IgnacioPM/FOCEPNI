import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class DocumentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        return (
            <React.Fragment>
                <tr className="elementTable text-center">
                    <td>{this.props.obj.nombre}</td>
                    <td>{this.props.obj.fecha}</td>
                    <td>
                        {
                            <object
                                data={`../documentos/repositorioDocumental/${this.props.obj.archivo}`}
                                type="application/pdf"
                            ></object>
                        }
                    </td>

                    {this.props.obj.estadoD == "Activo" ? (
                        <td className="text-success fw-bold">
                            {this.props.obj.estadoD}
                        </td>
                    ) : (
                        <td className="text-center text-danger fw-bold">
                            {this.props.obj.estadoD}
                        </td>
                    )}

                    <td>
                        <a
                            href={`../documentos/repositorioDocumental/${this.props.obj.archivo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="btn btn-inverse-info btn-sm">
                                <i className="fa-solid fa-eye"></i>
                            </button>
                        </a>
                        &nbsp;
                        <Link
                            to={{
                                pathname: `/documents/update/${this.props.obj.id}`,
                                state: {
                                    document: this.props.obj,
                                },
                            }}
                            type="button"
                            className="btn btn-inverse-success btn-sm "
                        >
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                       &nbsp;
                         <button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}><i className="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default DocumentItem;
