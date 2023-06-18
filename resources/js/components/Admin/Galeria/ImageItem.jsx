import React, { Component } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    
    render() {
        return (
            <React.Fragment>

                         
                        <tr className='elementTable text-center'>
                                <td>
                                {this.props.obj.nombre}
                                </td>
                                <td>
                                {this.props.obj.fecha}
                                </td>
                                <td>
                                {this.props.obj.descripcion}
                                </td>
                                <td>
                                    <img src={`/assets/img/galery/${this.props.obj.imagen}`} style={{"width" : "150px", "height" : "150px"}} alt={this.props.obj.nombre} />
                                </td>
                                
                                {this.props.obj.estadoI == "Activo" ? (<td className='text-success fw-bold'>{this.props.obj.estadoI}</td>) :  (<td className='text-center text-danger fw-bold'>{this.props.obj.estadoI}</td>)}
                                
                                <td>
                                    <Link to={{
                                        pathname: `/galeria/update/${this.props.obj.id}`,
                                        state: {
                                            image: this.props.obj
                                        }
                                    }} type="button" className="btn btn-inverse-success btn-sm "><i className="fa-solid fa-pen"></i></Link>&nbsp;
                                     {this.props.obj.estadoI == "Inactivo" ? (<button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickActiveHandler(this.props.obj.id)}><i className="fa-solid fa-check"></i></button>) :
                                    this.props.obj.estadoI == "Activo" ? (<button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}><i className="fa-solid fa-x"></i></button>):""}
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default ImageItem