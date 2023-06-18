import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaginacionGaleria } from "./PaginacionGaleria";


const Galeria = () => {
    const [images, setImages] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(3);

    const maximo = images.length / porPagina;

    useEffect(() => {
        getAllImages();
        const interval = setInterval(() => {
            if (pagina === Math.ceil(maximo)) {
                setPagina(1);
            } else {
                setPagina(pagina + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [pagina]);

    const getAllImages = async () => {
        const response = await axios.get(`/api/v1/galery/show`);
        setImages(response.data);
    };
    /*  */
    return (
       
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
               
            <PaginacionGaleria
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                />
                <a className="fw-bold mt-4 btn btn-lg m-2 border-0 rounded-3" href="/galery" style={{ 'textDecoration': 'none', color: '#a52d2d' }}>Ver más</a>
        </div>
    );
};

export default Galeria;
