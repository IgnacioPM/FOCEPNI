import React, { useEffect, useState } from "react";
import axios from "axios";
import PagNoticias from "./pagNoticias";

const Noticias = () => {
    const [news, setNews] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(2);

    const maximo = news.length / porPagina;

    useEffect(() => {
        getAllNews();
        const interval = setInterval(() => {
            if (pagina === Math.ceil(maximo)) {
                setPagina(1);
            } else {
                setPagina(pagina + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [pagina]);

    const getAllNews = async () => {
        const response = await axios.get(`/api/v1/news/show`);
        setNews(response.data);
    };

    return (
        <React.Fragment>
            <div id="portfolio" className="portfolio">
               
                    <div className="row gy-4 portfolio-container">
                        {news
                            .slice(
                                (pagina - 1) * porPagina,
                                (pagina - 1) * porPagina + porPagina
                            )
                            .map((news) => (
                                <div
                                    className="col-xl-6 col-md-6 portfolio-item filter-app"
                                    key={news.id}
                                >
                                    <div className="portfolio-wrap">
                                        <a
                                            href={`./assets/img/noticias/${news.imagen}`}
                                            data-gallery="portfolio-gallery-app"
                                            class="glightbox"
                                        >
                                            <img
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "300px",
                                                }}
                                                src={`./assets/img/noticias/${news.imagen}`}
                                                class="img-fluid"
                                                alt=""
                                            />
                                        </a>

                                        <div class="portfolio-info">
                                            <h4>
                                                <a
                                                    href="portfolio-details.html"
                                                    title="More Details"
                                                >
                                                    {news.nombre}
                                                </a>
                                            </h4>

                                            <p>{news.descripcion}</p>
                                            <p>{news.ubicacion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <PagNoticias
                            pagina={pagina}
                            setPagina={setPagina}
                            maximo={maximo}
                        />
                    </div>
            </div>
        </React.Fragment>
    );
};

export default Noticias;
