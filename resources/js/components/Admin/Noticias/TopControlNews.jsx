import React, { useState } from 'react'

function TopControlNews(props) {
        
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="d-flex flex-column flex-md-row justify-content-md-between">
                    <div className="d-flex flex-row">

                        <div className="p-2 col-lg-6 col-sm-4">
                            <div className="input-group input-group-sm">
                                <div className=" input-group-prepend">
                                    <span className="input-group-text">Mostrar</span>
                                </div>
                                <select className=" form-control form-control-sm btn btn-dark"
                                    disabled={
                                        props.isLoading ? true : false
                                    }
                                    defaultValue={
                                        props.perPage
                                    }
                                    onChange={
                                        props.onChangePerPageHandle
                                }>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                </select>
                            </div>

                        </div>

                        <div className="p-2 col-lg-8 col-sm-4">
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Ordenar por</span>
                                </div>
                                <select className="p-2 form-control form-control-sm btn btn-dark"
                                    disabled={
                                        props.isLoading ? true : false
                                    }
                                    defaultValue={
                                        props.sortBy
                                    }
                                    onChange={
                                        props.onChangeSortByHandle
                                }>
                                    <option value="created_at">Creado</option>
                                    <option value="fecha">Fecha</option>
                                </select>
                                <div className="input-group-append">
                                    <button disabled={
                                            props.isLoading ? true : false
                                        }
                                        className="bg-light btn btn-sm text-dark"
                                        type="button"
                                        onClick={
                                            props.onClickSortTypeHandle
                                    }>
                                        {
                                        props.sortType == 'asc' ? <i className="mdi mdi-arrow-down"></i> : <i className="mdi mdi-arrow-up"></i>
                                    } </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <form className="p-2 col-md-4"
                        onSubmit={
                            props.onSubmitQueryHandle
                    }>
                        <div className="input-group">
                            <input type="search" className="form-control form-control-sm input-search" placeholder="Buscar..."
                                value={
                                    props.query
                                }
                                onChange={
                                    props.onChangeQueryHandle
                                }/>
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-dark"
                                    disabled={
                                        props.isLoading ? true : false
                                    }
                                    type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </React.Fragment>
    );
}

export default TopControlNews