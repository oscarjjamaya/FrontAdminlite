
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Paginas/autenticacion/Login';
import Registro from './Paginas/autenticacion/Registro';
import Home from './Paginas/Home';
import MostrarClientes from './Paginas/Modulos/MostrarClientes';
import AgregarClientes from './Paginas/Modulos/AgregarClientes';
import EditarCliente from './Paginas/Modulos/EditarCliente';
import AgregarProveedor from './Paginas/Modulos/AgregarProvedor';
import EditarProveedor from './Paginas/Modulos/EditarProvedor';
import MostrarProveedor from './Paginas/Modulos/MostrarProvedor';


function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/Registro" exact element={<Registro />} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/clientes" exact element={<MostrarClientes/>} />
            <Route path="/clientes/agregar" exact element={<AgregarClientes/>} />
            <Route path="/clientes/editar/:id" exact element={<EditarCliente/>} />
           
           
            <Route path="/proveedor" exact element={<MostrarProveedor/>} />
            <Route path="/proveedor/agregar" exact element={<AgregarProveedor/>} />
            <Route path="/proveedor/editar/:id" exact element={<EditarProveedor/>} />


           
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
