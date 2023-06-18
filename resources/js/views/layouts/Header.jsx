import React from "react";
import '../../../css/NavBar.css'

class Header extends React.Component {

  render() {
    return(
      <header id="nav-wrapper" style={{backgroundColor: "#18775C"}}>
      <nav id="nav">
        <div className="nav left">
          <span className=""><h1 className="logo"><a href="/">Focepni</a></h1></span>
          <button id="menu" className="btn-nav"><span className="fas fa-bars"></span></button>
        </div>
        <div className="nav right active">
        <a href="/" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Inicio</span></span></a>
          <a href="/#unirse" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Unirse</span></span></a>
          <a href="/#noticias" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Noticias</span></span></a>
          <a href="/#nosotros" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Nosotros</span></span></a>
          <a href="/#prodServ" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Productos y Servicios</span></span></a>
          <a href="/#Galeria" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Galería</span></span></a>
          <a href="/#creditos" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Creditos</span></span></a>
          
          <a href="/dashboard" className="nav-link text-white"><span className="nav-link-span"><span className="u-nav">Iniciar Sesión</span></span></a>
        </div>

      </nav>
    </header>
    
    
    );
  }
}
export default Header;