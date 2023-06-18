import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from "../views/layouts/Main";
import Home from "../components/Cliente/Home";
import Acerca from "../components/Cliente/Acerca";
import Unirse from "../components/Cliente/Unirse";
import Noticia from "../components/Cliente/ClienteNoticias";
import RegistroEmprendedores from "../components/Cliente/RegistroEmprendedores"
import EmprendedorRegister from "../components/Cliente/EmprendedorRegister"
import Galery from '../components/Cliente/Galery'
import RegistroTrue from '../components/Cliente/RegistroTrue'
import Productos from '../components/Cliente/Productos'
import Servicios from '../components/Cliente/Servicios'

ReactDOM.render(
  <Main>
    <>
      <BrowserRouter>
        <div className="container-scroller">
                 
                    <Switch>
                      
                      <Route exact path="/" component={Home} />
                      <Route exact path="/acerca" component={Acerca} />
                      <Route exact path="/unirse"  component={Unirse} />
                      <Route exact path="/registroEm"  component={RegistroEmprendedores} />
                      <Route exact path="/emRegis"  component={EmprendedorRegister} />
                      <Route exact path="/noticia"  component={Noticia} />
                      <Route exact path="/galery"  component={Galery} />
                      <Route exact path="/productos"  component={Productos} />
                      <Route exact path="/servicios"  component={Servicios} />

                    </Switch>
                 
        </div>
      </BrowserRouter>
    </>
  </Main>,
  document.getElementById("principal")
);
