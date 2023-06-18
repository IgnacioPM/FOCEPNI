import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useSelector, connect } from "react-redux";
import rootAction from "../../redux/actions/index";
import ContentLoader from "react-content-loader";
import { fadeIn } from "animate.css";
import { showSznNotification } from "../../Helpers";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UserListxd(props) {
    const [users, setUsers] = useState([]);
    const [usersEmp, setUsersEmp] = useState([]);
    const [Emp, setEmp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fecha = new Date();

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
        pdf: "",
        sortBy: "created_at",
        sortType: "desc",
        resetCurrentPage: false,
        arrayUser: [],
        arrayUserEmp: [],
        arrayEmp: [],
    });

    //get reducer
    const authUser = useSelector((state) => state.authUserReducer);

    //get authUser/reducer alternative
    //const authUser = props.authUserProp;

    useEffect(() => {
        document.title = "Reportes";

        props.setActiveComponentProp("ListarReportes");
    }, []);

    useEffect(() => {
        loadDataUser();
        loadDataEmp();
        loadDataEmprendimiento();
    }, []);

   const loadDataUser = async () => {
    const response = await axios.get(`/api/v1/usuario/getPDF`, {
        params: {
            api_token: authUser.api_token
        }
    });
    setUsers(response.data);
    setState({
        ...state,
        arrayUser: response.data
    })
   }

   const loadDataEmp = async () => {
    const response = await axios.get(`/api/v1/usuario/getPDFEmp`, {
        params: {
            api_token: authUser.api_token
        }
    });
    setUsersEmp(response.data);
    setState({
        ...state,
        arrayUserEmp: response.data
    })
   }

   const loadDataEmprendimiento = async () => {
    const response = await axios.get(`/api/v1/empredimiento/PDFEmp`, {
        params: {
            api_token: authUser.api_token
        }
    });
    setEmp(response.data);
    setState({
        ...state,
        arrayEmp: response.data
    })
   }

   console.log(state.arrayEmp)

   

    const doc = new jsPDF();
    const doc1 = new jsPDF();
    const doc2 = new jsPDF();

    const printUser = () => {
        var columns = [
            { title: "Identificacion", dataKey: "identificacion" },
            { title: "Nombre", dataKey: "nombre" },
            { title: "Primer Apellido", dataKey: "primerApellido" },
            { title: "Segundo Apellido", dataKey: "segundoApellido" },
            { title: "Email", dataKey: "email" },
            { title: "Rol", dataKey: "tipo_usuario" },
            { title: "Estado", dataKey: "state" },
        ];
        var doc = new jsPDF("p", "pt", "a4");

        //var img = new Image(); //this mount a variable to img
        //img.src = "/assets/img/involucrados/MUNI.png"; //asign the src to the img variable
        //estilo para el nombre sendero los matapalos
        doc.setDrawColor("#efefef");
        doc.setFillColor("#ffffff");
        doc.setTextColor("#000");
        doc.rect(35, 5, 520, 43, "FD"); //Fill and Border
        doc.text("FOCEPNI", 42, 30);
        doc.setFontSize(15);
        //Estilo para el titulo del reporte
        doc.setFillColor("#1bcfb4");
        doc.setDrawColor("#1bcfb4");
        doc.setTextColor("#efefef");
        doc.rect(45, 52, 500, 25, "FD"); //Fill and Border rect(posicion x, posicion y, tamaño x, tamaño y)
        doc.text(" Reporte de usuarios", 50, 68);
        //Estilo para la fecha
        doc.setFillColor("#d9d9da");
        doc.setDrawColor("#1bcfb4");
        doc.setTextColor("#000");
        doc.rect(350, 52, 195, 25, "FD"); //Fill and Border
        doc.text("Fecha:" + fecha.toLocaleString(), 355, 68);

        //doc.addImage(img, "png", 500, 10, 40, 35);
        doc.autoTable(columns, state.arrayUser, {
            theme: "grid",
            tableLineColor: "#eeeeee",
            tableLineWidth: 0.1,
            margin: { top: 80 },
            styles: {
                fillStyle: "DF",
                halign: "center",
                valign: "middle",
                columnWidth: "auto",
                overflow: "linebreak",
            },
            headerStyles: {
                fillColor: "#1bcfb4",
                fontSize: 12,
            },
            bodyStyles: {
                fillColor: [216, 216, 216],
                textColor: 50,
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250],
            },
        });
        doc.save("Reporte_Usuarios_Todos.pdf");
    };

    const printUserEmp = () => {
        var columns = [
          { title: "Identificacion", dataKey: "identificacion" },
          { title: "Nombre", dataKey: "nombre" },
          { title: "Primer Apellido", dataKey: "primerApellido"},
          { title: "Segundo Apellido", dataKey: "segundoApellido"},
          { title: "Email", dataKey: "email"},
          { title: "Rol", dataKey: "tipo_usuario" },
          {title: "Estado",dataKey: "state"},

        ];
        var doc1 = new jsPDF("p", "pt", "a4");

         //var img = new Image(); //this mount a variable to img
        //img.src = "/assets/img/involucrados/MUNI.png"; //asign the src to the img variable
        //estilo para el nombre sendero los matapalos
        doc1.setDrawColor("#efefef");
        doc1.setFillColor("#ffffff");
        doc1.setTextColor("#000");
        doc1.rect(35, 5, 520, 43, "FD"); //Fill and Border
        doc1.text("FOCEPNI", 42, 30);
        doc1.setFontSize(15);
        //Estilo para el titulo del reporte
        doc1.setFillColor("#1bcfb4");
        doc1.setDrawColor("#1bcfb4");
        doc1.setTextColor("#efefef");
        doc1.rect(45, 52, 500, 25, "FD"); //Fill and Border rect(posicion x, posicion y, tamaño x, tamaño y)
        doc1.text(" Reporte de usuarios", 50, 68);
        //Estilo para la fecha
       /*  doc.setFillColor("#d9d9da");
        doc.setDrawColor("#1bcfb4");
        doc.setTextColor("#000");
        doc.rect(350, 52, 195, 25, "FD"); //Fill and Border
        doc.text("Fecha:" + fecha.toLocaleString(), 355, 68); */
        
        //doc.addImage(img, "png", 500, 10, 40, 35);
        doc1.autoTable(columns, state.arrayUserEmp, {
          theme: "grid",
          tableLineColor: "#eeeeee",
          tableLineWidth: 0.1,
          margin: { top: 80 },
          styles: {
            fillStyle: "DF",
            halign: "center",
            valign: "middle",
            columnWidth: "auto",
            overflow: "linebreak",
          },
          headerStyles: {
            fillColor: "#1bcfb4",
            fontSize: 12,
          },
          bodyStyles: {
            fillColor: [216, 216, 216],
            textColor: 50,
          },
          alternateRowStyles: {
            fillColor: [250, 250, 250],
          },
        });
        doc1.save("Reporte_Emprendedores_Todos.pdf");
    };

    const printEmp = () => {
        var columns = [
            { title: "Nombre Emprendimiento", dataKey: "nombreEmprendimiento" },
            { title: "Nombre Emprendedor", dataKey: "nombre" },
            { title: "Teléfono", dataKey: "nContacto" },
            { title: "Distrito", dataKey: "distrito" },
            { title: "Categoría", dataKey: "categoria" },
            { title: "Producto", dataKey: "productoServicio" },
            { title: "Email", dataKey: "email" },
        ];
        var doc2 = new jsPDF("p", "pt", "a4");

        //var img = new Image(); //this mount a variable to img
        //img.src = "/assets/img/involucrados/MUNI.png"; //asign the src to the img variable
        //estilo para el nombre sendero los matapalos
        doc2.setDrawColor("#efefef");
        doc2.setFillColor("#ffffff");
        doc2.setTextColor("#000");
        doc2.rect(35, 5, 520, 43, "FD"); //Fill and Border
        doc2.text("FOCEPNI", 42, 30);
        doc2.setFontSize(15);
        //Estilo para el titulo del reporte
        doc2.setFillColor("#1bcfb4");
        doc2.setDrawColor("#1bcfb4");
        doc2.setTextColor("#efefef");
        doc2.rect(45, 52, 500, 25, "FD"); //Fill and Border rect(posicion x, posicion y, tamaño x, tamaño y)
        doc2.text(" Reporte de solicitudes", 50, 68);
        //Estilo para la fecha
        /*  doc.setFillColor("#d9d9da");
        doc.setDrawColor("#1bcfb4");
        doc.setTextColor("#000");
        doc.rect(350, 52, 195, 25, "FD"); //Fill and Border
        doc.text("Fecha:" + fecha.toLocaleString(), 355, 68); */

        //doc.addImage(img, "png", 500, 10, 40, 35);
        doc2.autoTable(columns, state.arrayEmp, {
            theme: "grid",
            tableLineColor: "#eeeeee",
            tableLineWidth: 0.1,
            margin: { top: 80 },
            styles: {
                fillStyle: "DF",
                halign: "center",
                valign: "middle",
                columnWidth: "auto",
                overflow: "linebreak",
            },
            headerStyles: {
                fillColor: "#1bcfb4",
                fontSize: 12,
            },
            bodyStyles: {
                fillColor: [216, 216, 216],
                textColor: 50,
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250],
            },
        });
        doc2.save("Reporte_Emprendimientos_Todos.pdf");
    };
   

    return (
        <React.Fragment>
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-light text-dark mr-2">
                        <i className="fa-solid fa-file-export"></i>
                    </span>

                    {"Reportes Generales"}
                </h3>

                <nav aria-label="breadcrumb">
                    <Link
                        to="/dashboard"
                        className="btn btn-social-icon-text btn-danger p-3"
                    >
                        <i className="mdi mdi-arrow-left-bold btn-icon-prepend"></i>
                        &nbsp;
                    </Link>
                </nav>
            </div>

            <div className="container-fluid p-1">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6">
                        <div className="shadow p-4 rounded-3">
                            <div className="table-responsive mt-3 shadow-sm">
                                <table className="table p-3 ">
                                    <thead>
                                        <tr className="titleTable text-center">
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Descargar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <th scope="row">1</th>
                                            <td>Reporte Usuarios</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">2</th>
                                            <td>Reporte Emprendedores</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUserEmp}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">3</th>
                                            <td>Reporte Emprendimientos</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printEmp}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">4</th>
                                            <td>Reporte Productos/Servicios</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">5</th>
                                            <td>Reporte Galeria</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">6</th>
                                            <td>Reporte Repoitorio</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">7</th>
                                            <td>Reporte Noticias</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr className="text-center">
                                            <th scope="row">8</th>
                                            <td>Reporte Sugerencias</td>
                                            <td>
                                                <a>
                                                    <button
                                                        onClick={printUser}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

//redux state can be accessed as props in this component(Optional)
const mapStateToProps = (state) => {
    return {
        authUserProp: state.authUserReducer,
        activeComponentProp: state.activeComponentReducer,
    };
};
/**
 * redux state can be change by calling 'props.setAuthUserProp('demo user');' when
 * applicable(Optional to )
 *
 */
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserProp: (user) => dispatch(rootAction.setAuthUser(user)),
        setActiveComponentProp: (component) =>
            dispatch(rootAction.setActiveComponent(component)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListxd);
