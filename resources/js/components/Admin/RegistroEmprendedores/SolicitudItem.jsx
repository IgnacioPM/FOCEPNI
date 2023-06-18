import React, { Component } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

class SolicitudItem extends Component {
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
                                {this.props.obj.nombreEmprendimiento}
                                </td>
                                <td>
                                {this.props.obj.distrito}
                                </td>
                                <td>
                                {this.props.obj.direccion}
                                </td>
                                <td>
                                {this.props.obj.categoria}
                                </td>
                                <td>
                                {this.props.obj.anioInicio}
                                </td>
                                <td>
                                {this.props.obj.nContacto}
                                </td>
                                <td>
                                <Link to={{
                                        pathname: `/solicitud/update/${this.props.obj.id}`,
                                        state: {
                                            solicitud: this.props.obj
                                        }
                                    }} type="button" className="btn btn-inverse-info btn-sm "><i className="fa-solid fa-eye"></i></Link>&nbsp;
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default SolicitudItem