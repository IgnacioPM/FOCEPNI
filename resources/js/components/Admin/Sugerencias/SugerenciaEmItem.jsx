import React, { Component } from 'react'

class SugerenciaEmItem extends Component {
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
                                {this.props.obj.fecha}
                                </td>
                                <td>
                                {this.props.obj.sugerencia}
                                </td>
                                
                            </tr>
            </React.Fragment>
        )
    }
}

export default SugerenciaEmItem