import React from 'react';
import Galeria from '../Cliente/ClienteGaleriaHome'
import Noticias from '../Cliente/ClienteNoticias'


const Inicio = () => {
    return (

        <main className='container-fluid p-0'>

            <header className="encabezado">

                <div className="texto">
                    <h1>Bienvenidos</h1>
                    <h1 className="titulo">Fortalecimiento de Capacidades para los Emprendedores y Productores del Cantón de
                                                                        Nicoya.</h1>
                </div>

                <img src={'assets/img/wave.svg'}
                    alt=""
                    className="wave"/>

            </header>

            <section id='nosotros' className=" border-bottom">
                <div className="container text-md-star">
                    <div className="row mb-5 text-center">
                    <div class="section-header">
                        <h2>Sobre Nosotros</h2>
                        <p>El proyecto FOCEPNI busca el fortalecimiento de los emprendedores y productores del
                                                                                    cantón de Nicoya, mediante el uso de formularios se registrarán los diferentes
                                                                                    emprendimientos, donde se ofrecen productos y servicios de las personas encargadas de
                                                                                    dirigir o representar una marca, tienda, manualidad o cualquier otro tipo de labor que se
                                                                                    ofrezca, lo cual, fomentaría que se den a conocer y muestren más globalmente sus bienes.
                        </p>
                    </div>
                      
                        <div className="col d-flex justify-content-center justify-items-align">
                            <div className="carta">
                                <img src={'./assets/img/Involucrados/Mision.png'}
                                    alt=""/>
                                <div className="texto__carta">
                                    <h2>Misión</h2>
                                    <p>Ofrece una mejora significativa y acelera los procesos de registro de cada emprendedor del
                                                                                                                        cantón. Las personas podrán encontrar de una manera más rápida los productos
                                                                                                                        y servicios a disposición, entre otras funciones que ofrece el aplicativo.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col d-flex justify-content-center justify-items-align">
                            <div className="carta">
                                <img src={'./assets/img/Involucrados/Vision.png'}
                                    alt=""/>
                                <div className="texto__carta">
                                    <h2>Visión</h2>
                                    <p>Lograr satisfacer las necesidades de la ciudadanía, enfocados en los emprendedores y
                                        productores del cantón de Nicoya, reactivando y mejorando la economía, maximizando el
                                        potencial de la población y asi generar una mejora significativa a corto y mediano plazo.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col d-flex justify-content-center justify-items-align">
                            <div className="carta">
                                <img src={'./assets/img/Involucrados/Valores.png'}
                                    alt=""/>
                                <div className="texto__carta">
                                    <h2>Valores</h2>
                                    <p>Seguridad, honestidad, confianza, atención, orientación al cliente y resolución de problemas.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id='unirse' className="Barra">
                <div className="texto">
                    <h1>Bienvenidos</h1>
                    <h5 className="titulo">Fortalecimiento de las Capacidades de los Productores y Emprendedores del Canton de
                                                                        Nicoya.</h5>
                    <p className="parrafo">En este apartado podrán registrarse para adquirir un perfil de su emprendimiento.
                                                                    Siga los pasos para poder registarse y ser parte de esta iniciativa.</p>
                    <div>
                        <a className="enlace " href="/unirse">Unirse</a>
                    </div>
                </div>
            </section>

            <section id='noticias' className=" portfolio sections-bg">

                <div className="container ">
                    <div class="section-header">
                        <h2>Noticias</h2>
                        <p>
                            Apartado informativo sobre las noticias más relevantes o próximos
                                                                                    acontecimientos de interés y promocionales de artículos y servicios.
                        </p>
                    </div>


                    <Noticias/>


                </div>
            </section>

            <section id="prodServ" className="border-bottom back">
                <div className="container text-md-start">
                    <div className="row mb-4 text-center">
                    <div class="section-header">
                        <h2>Productos y Servicios</h2>
                        <p>FOCEPNI busca el fortalecimiento de los emprendedores y productores del cantón de
                                                                            Nicoya, donde se ofrecen productos y servicios de las personas encargadas de dirigir o representar una marca, tienda,
                                                                            manualidad o cualquier otro tipo de labor que se ofrezca, lo cual, permite que se den a conocer y muestren más sus bienes.
                        </p>
                    </div>
                      
                        <div className="col d-flex justify-content-center justify-items-align">
                            <div className="card__producto card">
                                <div className="content__product">
                                    <h2>Productos</h2>
                                    <a className="text-white" href="/productos">Ver más</a>
                                </div>
                            </div>

                        </div>

                        <div className="col d-flex justify-content-center justify-items-align">
                            <div className="card__servicio card">
                                <div className="content__product">
                                    <h2>Servicios</h2>
                                    <a className="text-white" href="/servicios">Ver más</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="border-0 mt-5 mb-5">
                <div className="container text-md-start">
                    <div className="row mb-5 text-center d-flex justify-content-center justify-items-align">
                    <div class="section-header">
                        <h2>Enlaces de Interés</h2>
                        <p>Para mayor facilidad de los usuarios se muestran distintos enlaces de
                                                                            contenido he información que podrian ser de su interes.</p>
                    </div>
                    
                        <div className="row">
                            <div className="col pt-4">
                                <p className="fw-bold text__muni__green">Enlaces</p>
                                <ul>
                                    <li><a className="link-interes" href="https://www.google.com/">Finanzas para Emprendedores</a></li>
                                    <li><a className="link-interes" href="https://www.google.com/">Municipalidad de Nicoya</a></li>
                                    <li><a className="link-interes" href="https://www.google.com/">Consejos Cantonales de Coordinación Institucional</a></li>
                                </ul>
                            </div>

                            <div className="col pt-4">
                                <p className="fw-bold text__muni__green">Enlaces</p>
                                <ul>
                                    <li><a className="link-interes" href="https://www.google.com/">Universidad Nacional</a></li>
                                    <li><a className="link-interes" href="https://www.google.com/">Finanzas para Emprendedores</a></li>
                                    <li><a className="link-interes" href="https://www.google.com/">Finanzas para Emprendedores</a></li>
                                </ul>
                            </div>

                            <div className="col pt-4">
                                <p className="fw-bold text__muni__green">Enlaces</p>
                                <ul>
                                    <li><a className="link-interes" href="https://www.google.com/">Universidad Estatal a Distancia</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section id='galeria' className="portfolio sections-bg">
                <div className="container ">
                    <div class="section-header">
                        <h2>Galeria</h2>
                        <p>Aquí podrás ver imágenes de las actividades que se realizan para 
                                                    dar a conocer más a los productores y emprendedores. También se muestran algunos de los artículos que vas a
                                                    encontrar en su local, lugares de trabajo o bien servicios a domicilio.
                        </p>
                    </div>


                    <Galeria/>


                </div>
            </section>

            <section id='creditos' className="team">

                <div className="container ">

                    <div className="row gy-4">

                        <div class="section-header">
                            <h2>Créditos</h2>
                            <p>El siguiente apartado muestra todas las entidades involucradas y el personal que ha participado a lo largo del proceso de implementación y desarrollo de dicho proyecto.</p>
                        </div>

                        <div class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                            <div class="member">
                                <img src={'./assets/img/Involucrados/MUNI.png'}
                                style={{'height': '250px', 'weight': '300px'}}
                                    class="img-fluid"
                                    alt=""/>
                                <h4>Municipalidad de Nicoya</h4>
                                <span>Su principal objetivo es satisfacer las necesidades del cantón y velar por su
                                                                                seguridad.</span>

                            </div>
                        </div>

                        <div class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                            <div class="member">
                                <img src={'./assets/img/Involucrados/UNAA.jpg'}
                                style={{'height': '250px', 'weight': '300px'}}
                                    class="img-fluid"
                                    alt=""/>
                                <h4>Universidad Nacional de Costa Rica.</h4>
                                <span>Su objetivo es promover la justicia, el bien común y el respeto.</span>

                            </div>
                        </div>
                       
                        <div class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                            <div class="member">
                                <img src={'./assets/img/Involucrados/UNEED.jpg'}
                                style={{'height': '250px', 'weight': '300px'}}
                                    class="img-fluid"
                                    alt=""/>
                                <h4>Universidad Estatal a Distancia.</h4>
                                <span>Su objetivo es la excelencia académica, el desarrollo de la cultura, el
                                                                                arte y los derechos humanos.</span>

                            </div>
                        </div>

                        
                            <a className="text-center fw-bold mt-5 btn-lg m-2 border-0 rounded-3" href="/acerca"
                                style={
                                    {'textDecoration': 'none', 
                                     'color' : '#a52d2d'}
                            }>Ver más</a>
                        
                    </div>
                </div>
            </section>

            <svg preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#18775C" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,250.7C640,235,800,181,960,170.7C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>

        </main>

    );
}
export default Inicio;
