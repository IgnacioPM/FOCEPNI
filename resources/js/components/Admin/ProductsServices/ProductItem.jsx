import React, { Component } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
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
                                    {this.props.obj.nombreP}
                                </td>
                                <td>
                                    {this.props.obj.descripcion}
                                </td>
                                <td>
                                    {this.props.obj.categoriaP}
                                </td>
                                <td>
                                    <img src={`/assets/img/productos/${this.props.obj.imagenP}`} style={{"width" : "150px", "height" : "150px"}} alt={this.props.obj.nombre} />
                                </td>
                                {this.props.obj.pState == "Aceptado" ? (<td className='text-success fw-bold'>{this.props.obj.pState}</td>) :  (<td className='text-danger fw-bold'>{this.props.obj.pState}</td>)}
                                <td>
                                    <Link to={{
                                        pathname: `/product/update/${this.props.obj.id}`,
                                        state: {
                                            products: this.props.obj
                                        }
                                    }} type="button" className="btn btn-inverse-success btn-sm "><i className="fa-solid fa-pen"></i></Link>&nbsp;
                                    {this.props.obj.pState == "Desactivado" ? (<button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickActiveHandler(this.props.obj.id)}><i className="fa-solid fa-check"></i></button>) :
                                    this.props.obj.pState == "Aceptado" ? (<button type="button" className="btn btn-inverse-danger btn-sm" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}><i className="fa-solid fa-x"></i></button>):""}
                                    
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default ProductItem