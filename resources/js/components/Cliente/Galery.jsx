import React, { useEffect, useState } from "react";
import axios from "axios";
import  Paginacion  from "./pagGalery";
import "../../../../public/assets/css/clienteCSS/cardGaley.css";


const Galery = () => {
    const [images, setImages] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(6);

    const maximo = images.length / porPagina;

    useEffect(() => {
        getAllImages();
    }, []);

    const getAllImages = async () => {
        const response = await axios.get(`/api/v1/galery/show`);
        setImages(response.data);
    };
    /*  */
    return (
        <div id="portfolio" className="portfolio sections-bg">
            <div className="" style={{ background: "#18775C" }}>
                <div className="container d-flex align-items-center justify-content-center text-center h-100 p-3">
                <div id="intro" className=" text-center shadow-5 rounded-5 mb-3">
                    <h1 className="text-white mb-3 h2">Galería</h1>
                    
                </div>
                </div>
            </div>
            <div className="container mt-5">
            
                            
                <div className="row gy-4 portfolio-container">
                {images
                    .slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    )
                    .map((images) => (
                        <div className="col-xl-4 col-md-6 portfolio-item filter-app"
                            key={images.id}
                        >
                            <div className="portfolio-wrap">
                            <a href={`./assets/img/galery/${images.imagen}`} data-gallery="portfolio-gallery-app" class="glightbox"><img src={`./assets/img/galery/${images.imagen}`} class="img-fluid" alt={images.nombre}/></a>
                                    
                                

                                <div className="portfolio-info">
                                <h4><a href="portfolio-details.html" title="More Details">{images.nombre}</a></h4>
                                  
                                     <p> {images.descripcion}</p>
                                   
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
        </div>
    );
};

export default Galery;
