import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para la navegación
import ContentHeader from '../../Componentes/ContentHeader'; // Importa el componente ContentHeader
import Footer from '../../Componentes/Footer'; // Importa el componente Footer
import Navbar from '../../Componentes/Navbar'; // Importa el componente Navbar
import SidebarContainer from '../../Componentes/SidebarContainer'; // Importa el componente SidebarContainer
import APIInvoke from '../../archivoAPI/APIInvoke'; // Importa un servicio para hacer llamadas a la API
import swal from 'sweetalert'; // Importa sweetalert para mostrar mensajes emergentes

const MostrarClientes = () => {
    const [clientes, setClientes] = useState([]); // Declara el estado clientes y su función para actualizarlo

    // Función asincrónica para obtener la lista de clientes desde la API
    const getClientes = async () => {
        const response = await APIInvoke.invokeGET(`/api/clientes/`);
        setClientes(response.cliente); // Actualiza el estado con los clientes obtenidos
    }

    // useEffect para cargar los clientes cuando el componente se monta
    useEffect(() => {
        getClientes();
    }, []);

    // Función asincrónica para eliminar un cliente
    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'cliente no eliminado') {
            // Muestra una alerta de error si no se pudo eliminar el cliente
            const msg = "El Cliente no fue borrado correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            getClientes(); // Actualiza la lista de clientes
        } else {
            // Muestra una alerta de éxito si se eliminó el cliente correctamente
            const msg = "El Cliente fue borrado correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
        }
    }

    // Renderiza el componente
    return (
        <div className="wrapper">
            <Navbar /> {/* Navbar */}
            <SidebarContainer /> {/* Sidebar */}
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de Clientes"} // Título del contenido
                    breadCrumb1={"Inicio"} // Primer breadcrumb
                    breadCrumb2={"Clientes"} // Segundo breadcrumb
                    ruta1={"/home"} // Ruta del primer breadcrumb
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/clientes/agregar"} className="btn btn-block btn-primary btn-sm">
                                    Crear Clientes
                                </Link>
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '15%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Apellido</th>
                                        <th style={{ width: '10%' }}>Documento</th>
                                        <th style={{ width: '10%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Teléfono</th>
                                        <th style={{ width: '30%' }}>Dirección</th>
                                        <th style={{ width: '10%' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes && clientes.map((cliente, index) => (
                                        <tr key={cliente._id}>
                                            <td>{cliente._id}</td>
                                            <td>{cliente.nombres}</td>
                                            <td>{cliente.apellidos}</td>
                                            <td>{cliente.documento}</td>
                                            <td>{cliente.correo}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.direccion}</td>
                                            <td>
                                                <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-success btn-sm">
                                                    Editar
                                                </Link>
                                                <button onClick={(e) => eliminarClientes(e, cliente._id)} className="btn btn-danger btn-sm">
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer /> {/* Footer */}
        </div>
    );
}

export default MostrarClientes;
