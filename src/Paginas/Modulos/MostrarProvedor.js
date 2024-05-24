import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para la navegación
import ContentHeader from '../../Componentes/ContentHeader'; // Importa el componente ContentHeader
import Footer from '../../Componentes/Footer'; // Importa el componente Footer
import Navbar from '../../Componentes/Navbar'; // Importa el componente Navbar
import SidebarContainer from '../../Componentes/SidebarContainer'; // Importa el componente SidebarContainer
import APIInvoke from '../../archivoAPI/APIInvoke'; // Importa un servicio para hacer llamadas a la API
import swal from 'sweetalert'; // Importa sweetalert para mostrar mensajes emergentes

const MostrarProveedor = () => {
    const [proveedor, setProveedor] = useState([]); // Declara el estado Proveedor y su función para actualizarlo

    // Función asincrónica para obtener la lista de Proveedores desde la API
    const getProveedor = async () => {
        const response = await APIInvoke.invokeGET(`/api/proveedor/`);
        setProveedor(response.proveedor); // Actualiza el estado con el Proveedor obtenido
    }

    // useEffect para cargar los Proveedores cuando el componente se monta
    useEffect(() => {
        getProveedor();
    }, []);

    // Función asincrónica para eliminar un Proveedor
    const eliminarProveedor = async (e, idProveedor) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/proveedor/${idProveedor}`);

        if (response.msg === 'Proveedor no eliminado') {
            // Muestra una alerta de error si no se pudo eliminar el Proveedor
            const msg = "El Proveedor no fue borrado correctamente.";
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
            getProveedor(); // Actualiza la lista de Proveedores
        } else {
            // Muestra una alerta de éxito si se eliminó el Proveedor correctamente
            const msg = "El Proveedor fue borrado correctamente.";
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
                    titulo={"Listado de Proveedores"} // Título del contenido
                    breadCrumb1={"Inicio"} // Primer breadcrumb
                    breadCrumb2={"Proveedor"} // Segundo breadcrumb
                    ruta1={"/home"} // Ruta del primer breadcrumb
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/proveedor/agregar"} className="btn btn-block btn-primary btn-sm">
                                    Crear Proveedores
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
                                        <th style={{ width: '15%' }}>Empresa</th>                                        
                                        <th style={{ width: '10%' }}>Nit</th>
                                        <th style={{ width: '10%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Teléfono</th>
                                        <th style={{ width: '30%' }}>Dirección</th>
                                        <th style={{ width: '10%' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proveedor && proveedor.map((proveedor, index) => (
                                        <tr key={proveedor._id}>
                                            <td>{proveedor._id}</td>
                                            <td>{proveedor.empresa}</td>                                            
                                            <td>{proveedor.nit}</td>
                                            <td>{proveedor.correo}</td>
                                            <td>{proveedor.telefono}</td>
                                            <td>{proveedor.direccion}</td>
                                            <td>
                                                <Link to={`/proveedor/editar/${proveedor._id}`} className="btn btn-success btn-sm">
                                                    Editar
                                                </Link>
                                                <button onClick={(e) => eliminarProveedor(e, proveedor._id)} className="btn btn-danger btn-sm">
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

export default MostrarProveedor;
