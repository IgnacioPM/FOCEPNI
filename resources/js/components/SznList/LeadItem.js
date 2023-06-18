import React, { Component } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

class LeadItem extends Component {
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

                            <tr>
                                <td>
                                    <Link to={{
                                        pathname: `/lead/edit/${this.props.obj.id}`,
                                        state: {
                                            lead: this.props.obj
                                        }
                                    }} className="szn-widget__username">
                                        {this.props.obj.name}
                                        {this.props.obj.status == 0 ? <i className="mdi mdi-close-circle-outline szn-font-danger"></i>
                                            : <i className="mdi mdi-checkbox-marked-circle szn-font-success"></i>}
                                    </Link>
                                </td>
                                <td>
                                    <a href={void (0)}>{this.props.obj.email}</a>
                                </td>
                                <td>
                                    <a href={void (0)}>{this.props.obj.phone} </a>
                                </td>
                                <td>
                                    {this.props.obj.address ? <a href={void (0)}><i className="mdi mdi-home"></i>{this.props.obj.address}</a> : ''}
                                </td>
                                <td>  {this.props.obj.description}
                                </td>
                                <td>
                                    {this.props.obj.progress}%
                                </td>
                                <td>
                                    {this.props.obj.expenses}
                                </td>
                                <td>
                                    {this.props.obj.net}
                                </td>
                                <td>
                                    {moment(this.props.obj.created_at).fromNow()}
                                </td>
                                <td>
                                    <Link to={{
                                        pathname: `/lead/edit/${this.props.obj.id}`,
                                        state: {
                                            lead: this.props.obj
                                        }
                                    }} type="button" className="btn btn-success btn-sm btn-upper">Editar</Link>&nbsp;
                                    <button type="button" className="btn btn-danger btn-sm btn-upper" onClick={() => this.props.onClickDeleteHandler(this.props.obj.id)}>Eliminar</button>
                                </td>
                            </tr>
            </React.Fragment>
        )
    }
}

export default LeadItem