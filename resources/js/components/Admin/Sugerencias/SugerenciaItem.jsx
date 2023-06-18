import React, { Component } from 'react'

class SugerenciaItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    
    
    render() {
        return (
            <React.Fragment>

                            <tr className='elementTable text-center'>
                      
                                <td>
                                {this.props.obj.fecha}
                                </td>
                                <td>
                                {this.props.obj.sugerencia}
                                </td>
                                <td>
                                {this.props.obj.nombre + ' ' + this.props.obj.primerApellido + ' ' + this.props.obj.segundoApellido}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}><i className="fa-solid fa-trash"></i></button> 
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default SugerenciaItem