require('../app');
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import '../variables'
import { createStore } from 'redux';
import rootReducer from '../redux/reducers/index'
import { Provider, useDispatch, useSelector } from 'react-redux'
import rootAction from '../redux/actions/index'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from '../components/Admin/Dashboard'
import DashboardEmprendedor from '../components/Admin/DashboardEmprendedor'
import Usuario from '../components/Admin/Usuario'
import Galeria from '../components/Admin/Galeria'
import Repositorio from '../components/Admin/Repositorio'
import Noticia from '../components/Admin/Noticia'
import Reportes from '../components/Admin/Reportes'
import Sugerencias from '../components/Admin/SugerenciasEm'
import SugerenciasAdmin from '../components/Admin/Sugerencias'
import Productos from '../components/Admin/ProductosEm'
import StoreProducts from '../components/Admin/ProductsServices/NuevoProducto'
import ProductosAdmin from '../components/Admin/ProductsAdmin'
import EnviarSolicitud from '../components/Admin/RegistroEmprendedores/EnviarSolicitud'
import UsuarioEspera from '../components/Admin/UsuarioEspera';
import Solicitudes from '../components/Admin/Solicitudes.jsx'
import USersEmp from '../components/Admin/Usuarios/ListarUsuarioEmprendedor'
import GeoReferenciacion from '../components/Admin/GeoReferenciacion'
import GestSolicitudP from '../components/Admin/ProductsServices/GestSoliProduct'
import GestSolicitudE from "../components/Admin/RegistroEmprendedores/GestSolicitud";
import NuevaSugerencia from "../components/Admin/Sugerencias/NuevaSugerencia";
import CrearUsuario from "../components/Admin/Usuarios/NuevoUsuario";
import CrearDocumentos from "../components/Admin/Repositorio/NuevoDocumento";
import EditarDocumentos from "../components/Admin/Repositorio/EditarDocumentos";
import CrearNoticias from "../components/Admin/Noticias/NuevaNoticia";
import EditarNoticias from "../components/Admin/Noticias/EditarNoticias";
import GeoReff from "../components/Admin/GeoReferenciacion/Editar";
import CrearImagenes from "../components/Admin/Galeria/NuevaImagen";
import EditarImagenes from "../components/Admin/Galeria/EditarImagen";
import EditarUsuario from "../components/Admin/Usuarios/EditarUsuario";
import EditProduct from '../components/Admin/ProductsServices/EditProduct';
import Emprendimientos from '../components/Admin/Emprendimiento'
import Products from '../components/Admin/ProductsServicesAdmin'
import VerProductos from '../components/Admin/ProductsServices/VerProductos';
import EmpInfo from '../components/Admin/Emprendimiento/EmpInfo';

//create reducer
const myStore = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function App() {
	//set reducer
	const myDispatch = useDispatch();
	myDispatch(rootAction.setAuthUser(authUser)); //authUser is from blade file

	//get reducer
	const activeComponent = useSelector(state => state.activeComponentReducer);

	return (
		<React.Fragment>
			<div className='content container-fluid'>
				<BrowserRouter>
					<div className='card-body'>
						<Switch>
							{/*Componentes routes*/}
							<Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/dashEmprendedor' component={DashboardEmprendedor} />
							<Route exact path='/usuario/listar' component={Usuario} />
							<Route exact path='/usuario/listarEmp' component={USersEmp}/>
							<Route exact path='/galeria/listar' component={Galeria} />
							<Route exact path='/documents/listar' component={Repositorio} />
							<Route exact path='/noticias/listar' component={Noticia} />
							<Route exact path='/reportes' component={Reportes} />
							<Route exact path='/sugerenciasEm/listar' component={Sugerencias} />							
							<Route exact path='/sugerencias/listar' component={SugerenciasAdmin} />					
							<Route exact path='/productEm/listar' component={Productos} />
							<Route exact path='/productos/listar' component={ProductosAdmin} />
							<Route exact path='/EnviarSolicitud' component={EnviarSolicitud} />
							<Route exact path='/usuarioEspera' component={UsuarioEspera} />
							<Route exact path='/verSolicitud' component={Solicitudes} />
							<Route exact path='/geo/listar' component={GeoReferenciacion} />
							<Route exact path='/emprendimientos/ver' component={Emprendimientos} />
							<Route exact path='/productos/ver' component={Products} />

							{/*Store routes*/}
							<Route exact path='/product/store' component={StoreProducts} />
							<Route exact path='/sugerencias/store' component={NuevaSugerencia} />
							<Route exact path='/usuario/crear' component={CrearUsuario} />
							<Route exact path='/documents/store' component={CrearDocumentos} />
							<Route exact path='/noticias/store' component={CrearNoticias} />
							<Route exact path='/galeria/store' component={CrearImagenes} />

							{/*Update routes*/}
							<Route exact path='/product/solicitud/:id' component={GestSolicitudP} />
							<Route exact path='/solicitud/update/:id' component={GestSolicitudE} />
							<Route exact path='/documents/update/:id' component={EditarDocumentos} />
							<Route exact path='/noticias/update/:id' component={EditarNoticias} />
							<Route exact path='/geo/agregar/:id' component={GeoReff} />
							<Route exact path='/galeria/update/:id' component={EditarImagenes} />
							<Route exact path='/usuario/actualizar/:id' component={EditarUsuario} />
							<Route exact path='/product/update/:id' component={EditProduct} />
							<Route exact path='/product/ver/:id' component={VerProductos} />
							<Route exact path='/emp/view/:id' component={EmpInfo} />

						</Switch>
					</div>

				</BrowserRouter>
			</div>
		</React.Fragment>
	);
}

ReactDOM.render(
	<Provider store={myStore}>
		<App />
	</Provider>
	, document.getElementById('app'))