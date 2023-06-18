import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class UserItemGeo extends Component {
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
                                {this.props.obj.identificacion}
                                </td>
                                <td>
                                {this.props.obj.nombre}
                                </td>
                                <td>
                                {this.props.obj.primerApellido + `    `+ this.props.obj.segundoApellido}
                                </td>  
                                <td>
                                    <a href={void (0)}>{this.props.obj.email} </a>
                                </td>                              
                                <td>
                                {this.props.obj.latitud == null ? (<h5 className='text-danger'>No Registrado</h5>) : (this.props.obj.latitud) }
                                </td>
                                <td>
                                {this.props.obj.longitud == null ? (<h5 className='text-danger'>No Registrado</h5>) : (this.props.obj.longitud) }
                                </td>
                                                              
                                <td>
                                    <Link to={{
                                        pathname: `/geo/agregar/${this.props.obj.idE}`,
                                        state: {
                                            lead: this.props.obj
                                        }
                                    }} type="button" className="btn btn-inverse-success btn-sm ">{this.props.obj.latitud == null ? (<i className="fa-solid fa-circle-plus"></i>) : (<i className="fa-solid fa-pen"></i>) }</Link>&nbsp;

                                    <button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.idE)}><i className="fa-solid fa-trash"></i></button>&nbsp;
                                    
                               {/*  {this.props.obj.state == 'Activo' ? (<button type="button" className="btn btn-inverse-warning btn-sm" 
                                onClick={() => this.props.onClickBlockUser(this.props.obj.id)}><i className="fa-solid fa-lock"></i></button>)
                                : (<button type="button" className="btn btn-inverse-warning btn-sm" 
                                onClick={()=>this.props.onClickUnblockUser(this.props.obj.id)}><i className="fa-solid fa-unlock"></i></button>) } */}
                                     
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default UserItemGeo