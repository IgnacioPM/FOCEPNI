import React, { Component } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

class UserItem extends Component {
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
                                {this.props.obj.tipo_usuario}
                                </td>
                                
                                <td>
                                {this.props.obj.state}
                                </td>

                                <td>
                                    <a href={void (0)}>{this.props.obj.email} </a>
                                </td>
                                                              
                                <td>
                                    <Link to={{
                                        pathname: `/usuario/actualizar/${this.props.obj.id}`,
                                        state: {
                                            lead: this.props.obj
                                        }
                                    }} type="button" className="btn btn-inverse-success btn-sm "><i className="fa-solid fa-pen"></i></Link>&nbsp;

                                    <button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}><i className="fa-solid fa-trash"></i></button>&nbsp;
                                    
                                {this.props.obj.state == 'Activo' ? (<button type="button" className="btn btn-inverse-warning btn-sm" 
                                onClick={() => this.props.onClickBlockUser(this.props.obj.id)}><i className="fa-solid fa-lock"></i></button>)
                                : (<button type="button" className="btn btn-inverse-warning btn-sm" 
                                onClick={()=>this.props.onClickUnblockUser(this.props.obj.id)}><i className="fa-solid fa-unlock"></i></button>) }
                                     
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default UserItem