import React, { useEffect, useState } from "react";
import axios from "axios";
import Paginacion from "./pagServicios";
import "../../../../public/assets/css/clienteCSS/cardGaley.css";
import Map from "./Map";

const Products = () => {
    const [services, setServices] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(3);

    const maximo = services.length / porPagina;

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await axios.get(`/api/v1/services/show`);
        setServices(response.data);
    };
    /*  */
    return (
        <>
            <div style={{ background: "#18775C" }}>
                <div className="container d-flex align-items-center justify-content-center text-center h-100 p-3">
                    <div
                        id="intro"
                        className=" text-center shadow-5 rounded-5 mb-3"
                    >
                        <h1 className="text-white mb-3 h2">Servicios</h1>
                    </div>
                </div>
            </div>
            <div id="" className="container-fluid text-center">
                <div className="row justify-content-center">
                    {services
                        .slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                        )
                        .map((services) => (
                            <div
                                className="card card_p mt-4 col-lg-10 col-md-10 col-sm-8 "
                                key={services.idP}
                            >
                                <div className="cont col-md-6 col-lg-4 col-sm-3 d-flex">
                                    <div className="col-12 text-center mt-4">
                                        <img
                                            className=" img_p img-fluid"
                                            src={`./assets/img/productos/${services.imagenP}`}
                                            alt="Card image cap"
                                        />
                                    </div>

                                    <div className="col-12 text-center mt-5">
                                        <h4 className="p-1 fw-bold">
                                            {services.nombreP}
                                        </h4>
                                        <h4 className="p-1 ">
                                            {services.nombre +
                                                ` ` +
                                                services.primerApellido +
                                                ` ` +
                                                services.segundoApellido}
                                        </h4>
                                        <h4 className="p-1 ">
                                            {services.nombreEmprendimiento}
                                        </h4>
                                        <h4 className="p-1 ">
                                            {services.distrito +
                                                `, ` +
                                                services.direccion}
                                        </h4>

                                        <p className="p-1 text-secondary">
                                            {services.categoriaP}{" "}
                                        </p>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        {services.latitud == null &&
                                        services.latitud == null ? (
                                            <h4>No posee georrefencia</h4>
                                        ) : (
                                            <Map
                                                isMarkerShown
                                                lat={services.latitud}
                                                lng={services.longitud}
                                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCrD67wm7IH1Sb4QPFYevFRJE0G1et-Ly0`}
                                                containerElement={
                                                    <div
                                                        className="col-12 mb-3"
                                                        style={{
                                                            height: "350px",
                                                            width: "100%",
                                                        }}
                                                    />
                                                }
                                                mapElement={
                                                    <div
                                                        style={{
                                                            height: "100%",
                                                            borderRadius:
                                                                "1rem",
                                                        }}
                                                    />
                                                }
                                                loadingElement={<p>Cargando</p>}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}{" "}
                    <Paginacion
                        pagina={pagina}
                        setPagina={setPagina}
                        maximo={maximo}
                    />
                </div>
            </div>
        </>
    );
};

export default Products;
