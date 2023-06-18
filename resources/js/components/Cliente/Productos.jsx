import React, { useEffect, useState } from "react";
import axios from "axios";
import  Paginacion  from "./PagProductos";
import "../../../../public/assets/css/clienteCSS/cardGaley.css";
import Map from "./Map";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(3);

    const maximo = products.length / porPagina;

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await axios.get(`/api/v1/products/show`);
        setProducts(response.data);
    };
    /*  */
    return (
        <>
        <div  style={{ background: "#18775C" }}>
        <div className="container d-flex align-items-center justify-content-center text-center h-100 p-3">
        <div id="intro" className=" text-center shadow-5 rounded-5 mb-3">
            <h1 className="text-white mb-3 h2">Productos</h1>
            
        </div>
        </div>
    </div>
        <div  className="container-fluid text-center ">
               
            <div className="row justify-content-center p-3">

                {products
                    .slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    )
                    .map((products) => (
                        <div
                            className="card card_p mt-4 col-lg-10 col-md-10 col-sm-5"
                            key={products.idP}
                        >
                            <div className="row">

                          
                               
                               <div className="col-lg-4 col-md-4 col-sm-2 d-flex text-center mt-4">
                                <img
                                        className=" img_p img-fluid"
                                        
                                        src={`./assets/img/productos/${products.imagenP}`}
                                        alt="Card image cap"
                                    />
                               </div>
                                    
                                   

                                   <div className="col-lg-4 col-md-4 col-sm-2 text-center mt-5">

                                    <h4 className="p-1 fw-bold">{ products.nombreP}</h4>
                                    <h4 className="p-1 ">{products.nombre + ` ` + products.primerApellido + ` ` + products.segundoApellido}</h4>
                                    <h4 className="p-1 ">{ products.nombreEmprendimiento}</h4>
                                    <h4 className="p-1 ">{ products.distrito +`, `+products.direccion}</h4>

                                    

                                    <p className="p-1 text-secondary">
                                        {products.categoriaP}{" "}
                                    </p>

                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-2 d-flex text-center mt-4">
                                {(products.latitud == null && products.latitud == null) ? (<h4>No posee georrefencia</h4>) :  
                                         
                                         <Map 
                                         isMarkerShown
                                         lat={products.latitud}
                                         lng={products.longitud}
                                         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCrD67wm7IH1Sb4QPFYevFRJE0G1et-Ly0`}
                                         containerElement={<div className="col-12 mb-3" style={{height: '350px', width: '100%'}} />}
                                         mapElement={<div style={{height: '100%',borderRadius: '1rem'}} />}
                                         loadingElement={<p>Cargando</p>}
                                         />
                    }
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
