import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";
import Pagination from "react-js-pagination";
import {useSelector, connect} from "react-redux";
import rootAction from "../../../redux/actions/index";
import ContentLoader from "react-content-loader";
import {showSznNotification} from "../../../Helpers";
import TopControlProducts from "./TopControlProducts";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsPDF from "jspdf";

const ListProductosEm = (props) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [state, setState] = useState({
        pageRangeDisplayed: 5,
        currentPage: 1,
        total: 0,
        lastPageUrl: null,
        nextPageUrl: null,
        firstPageUrl: null,
        prevPageUrl: null,
        perPage: 10,
        query: "",
        sortBy: "created_at",
        sortType: "desc",
        resetCurrentPage: false
    });

    const authUser = useSelector((state) => state.authUserReducer);

    useEffect(() => {
        document.title = "Todos los productos";

        props.setActiveComponentProp("ListProductsEm");
    }, []);

    useEffect(() => {
        loadData();
    }, [
        state.currentPage,
        state.resetCurrentPage,
        state.perPage,
        state.sortBy,
        state.sortType,
    ]);

    const skeletonLoader = () => {
        return (
            <div className="content-loader-wrapper">
                <ContentLoader speed={2}
                    viewBox="0 0 945 500"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#dad8d8">
                    <rect x="33" y="36" rx="0" ry="0" width="92" height="90"/>
                    <rect x="144" y="41" rx="0" ry="0" width="196" height="15"/>
                    <rect x="144" y="69" rx="0" ry="0" width="353" height="12"/>
                    <rect x="143" y="92" rx="0" ry="0" width="399" height="18"/>
                    <rect x="143" y="116" rx="0" ry="0" width="51" height="14"/>
                    <rect x="205" y="118" rx="0" ry="0" width="298" height="12"/>
                    <rect x="517" y="116" rx="0" ry="0" width="26" height="15"/>
                    <rect x="0" y="10" rx="0" ry="0" width="13" height="487"/>
                    <rect x="-29" y="2" rx="0" ry="0" width="1001" height="11"/>
                    <rect x="930" y="7" rx="0" ry="0" width="66" height="490"/>
                    <rect x="6" y="358" rx="0" ry="0" width="2" height="15"/>
                    <rect x="5" y="484" rx="0" ry="0" width="935" height="13"/>
                    <rect x="797" y="32" rx="0" ry="0" width="44" height="28"/>
                    <rect x="854" y="32" rx="0" ry="0" width="56" height="28"/>
                    <rect x="43" y="186" rx="0" ry="0" width="100" height="47"/>
                    <rect x="255" y="186" rx="0" ry="0" width="100" height="47"/>
                    <rect x="476" y="185" rx="0" ry="0" width="100" height="47"/>
                    <rect x="693" y="184" rx="0" ry="0" width="100" height="47"/>
                    <rect x="7" y="242" rx="0" ry="0" width="952" height="17"/>
                    <rect x="33" y="281" rx="0" ry="0" width="92" height="90"/>
                    <rect x="144" y="286" rx="0" ry="0" width="196" height="15"/>
                    <rect x="144" y="314" rx="0" ry="0" width="353" height="12"/>
                    <rect x="143" y="337" rx="0" ry="0" width="399" height="18"/>
                    <rect x="143" y="361" rx="0" ry="0" width="51" height="14"/>
                    <rect x="205" y="363" rx="0" ry="0" width="298" height="12"/>
                    <rect x="517" y="361" rx="0" ry="0" width="26" height="15"/>
                    <rect x="797" y="277" rx="0" ry="0" width="44" height="28"/>
                    <rect x="854" y="277" rx="0" ry="0" width="56" height="29"/>
                    <rect x="43" y="431" rx="0" ry="0" width="100" height="47"/>
                    <rect x="255" y="431" rx="0" ry="0" width="100" height="47"/>
                    <rect x="476" y="430" rx="0" ry="0" width="100" height="47"/>
                    <rect x="693" y="429" rx="0" ry="0" width="100" height="47"/>
                </ContentLoader>
            </div>
        );
    };

    const loadData = () => {
        setIsLoading(true);
        axios.get("/api/v1/products/listar?page=" + state.currentPage, {
            params: {
                api_token: authUser.api_token,
                per_page: state.perPage,
                query: state.query,
                sort_by: state.sortBy,
                sort_type: state.sortType
            }
        }).then((response) => {
            setIsLoading(false);
            setProducts(response.data.message.data);
            setState({
                ...state,
                currentPage: response.data.message.current_page,
                firstPageUrl: response.data.message.first_page_url,
                lastPageUrl: response.data.message.last_page_url,
                nextPageUrl: response.data.message.next_page_url,
                prevPageUrl: response.data.message.prev_page_url,
                perPage: parseInt(response.data.message.per_page),
                total: response.data.message.total,
                newsArray: response.data.message.data
            });
        }).catch((error) => {
            showSznNotification({type: "error", message: error.response.data.message});
        });
    };

    const handlePageChange = (pageNumber) => {
        setState({
            ...state,
            currentPage: pageNumber
        });
    };

    const onChangeQueryHandle = (e) => {
        setState({
            ...state,
            query: e.target.value
        });
    };

    const onChangePerPageHandle = (e) => {
        setState({
            ...state,
            perPage: parseInt(e.target.value)
        });
    };

    const onChangeSortByHandle = (e) => {
        setState({
            ...state,
            sortBy: e.target.value
        });
    };

    const onClickDeleteHandler = (id) => {
        confirmAlert({
            title: "Desea desactivar el producto",
            message: "Está seguro?",
            buttons: [
                {
                    label: "Si",
                    onClick: () => {
                        setIsLoading(true);
                        // ruta de la api en webapi
                        axios.post("/api/v1/products/eliminar", {
                            api_token: authUser.api_token,
                            idP: id
                        }).then((response) => {
                            setIsLoading(false);
                            if (response.data.status == "error") {
                                showSznNotification({type: "error", message: response.data.message});
                            } else if (response.data.status == "success") {
                                showSznNotification({type: "success", message: response.data.message});
                                loadData();
                            }
                        }).catch((error) => {
                            console.log(error);

                            setIsLoading(false);

                            if (error.response.data.status == "error") {
                                showSznNotification({type: "error", message: error.response.data.message});
                            }
                        });
                    }
                }, {
                    label: "No",
                    // do nothing
                },
            ]
        });
    };
    const onClickActiveHandler = (id) => {
        confirmAlert({
            title: "Desea Habilitar el producto nuevamente",
            message: "Está seguro?",
            buttons: [
                {
                    label: "Si",
                    onClick: () => {
                        setIsLoading(true);
                        // ruta de la api en webapi
                        axios.post("/api/v1/products/active", {
                            api_token: authUser.api_token,
                            idP: id
                        }).then((response) => {
                            setIsLoading(false);
                            if (response.data.status == "error") {
                                showSznNotification({type: "error", message: response.data.message});
                            } else if (response.data.status == "success") {
                                showSznNotification({type: "success", message: response.data.message});
                                loadData();
                            }
                        }).catch((error) => {
                            console.log(error);

                            setIsLoading(false);

                            if (error.response.data.status == "error") {
                                showSznNotification({type: "error", message: error.response.data.message});
                            }
                        });
                    }
                }, {
                    label: "No",
                    // do nothing
                },
            ]
        });
    };
    const onClickSortTypeHandle = (e) => {
        if (state.sortType == "asc") {
            setState({
                ...state,
                sortType: "desc"
            });
        } else {
            setState({
                ...state,
                sortType: "asc"
            });
        }
    };

    const onSubmitQueryHandle = (e) => {
        e.preventDefault();
        setState({
            ...state,
            currentPage: 1,
            resetCurrentPage: !state.resetCurrentPage
        });
    };

    const dataTable = () => {
        return isLoading ? (skeletonLoader()) : products.length == 0 ? (
            <tr className="text-center text-gray">
                <td className="p-3 font-weight-bold">No hay datos</td>
            </tr>
        ) : (products.map((product, i) => {
            return (
                <ProductItem onClickDeleteHandler={onClickDeleteHandler}
                    onClickActiveHandler={onClickActiveHandler}
                    obj={product}
                    key={i}/>
            );
        }));
    };

    return (
        <React.Fragment>
            <div className="shadow p-4 rounded-3">
                <TopControlProducts isLoading={isLoading}
                    perPage={
                        state.perPage
                    }
                    onChangePerPageHandle={onChangePerPageHandle}
                    sortBy={
                        state.sortBy
                    }
                    sortType={
                        state.sortType
                    }
                    onChangeSortByHandle={onChangeSortByHandle}
                    onClickSortTypeHandle={onClickSortTypeHandle}
                    onSubmitQueryHandle={onSubmitQueryHandle}
                    onChangeQueryHandle={onChangeQueryHandle}
                    query={
                        state.query
                    }/>

                <div className="table-responsive mt-3 shadow-sm">
                    <table className="table p-3 ">
                        <thead>
                            <tr className="titleTable text-center text-white">
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th>Imagen</th>
                                <th>Estado</th>
                                <th>Funciones</th>
                            </tr>
                        </thead>
                        <tbody> {
                            dataTable()
                        } </tbody>
                    </table>
                </div>
            </div>
            <div className="pt-3 pb-3">
                <div className="">
                    <div className="d-flex justify-content-center">
                        <div className="p-2">
                            <Pagination activePage={
                                    state.currentPage
                                }
                                itemsCountPerPage={
                                    state.perPage
                                }
                                itemClass={
                                    isLoading ? "page-item disabled" : "page-item"
                                }
                                linkClass={
                                    isLoading ? "page-link disabled" : "page-link"
                                }
                                totalItemsCount={
                                    state.total
                                }
                                pageRangeDisplayed={
                                    state.pageRangeDisplayed
                                }
                                onChange={
                                    isLoading ? (e) => {
                                        e.preventDefault();
                                    } : handlePageChange
                                }/>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {authUserProp: state.authUserReducer, activeComponentProp: state.activeComponentReducer};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(rootAction.setAuthUser(user)),
        setActiveComponentProp: (component) => dispatch(rootAction.setActiveComponent(component))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProductosEm);
