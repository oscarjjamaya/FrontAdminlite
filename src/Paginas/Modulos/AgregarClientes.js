import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import ContentHeader from '../../Componentes/ContentHeader'; // Importa el componente ContentHeader
import Footer from '../../Componentes/Footer'; // Importa el componente Footer
import Navbar from '../../Componentes/Navbar'; // Importa el componente Navbar
import SidebarContainer from '../../Componentes/SidebarContainer'; // Importa el componente SidebarContainer
import APIInvoke from '../../archivoAPI/APIInvoke'; // Importa el servicio APIInvoke para hacer llamadas a la API
import swal from 'sweetalert'; // Importa sweetalert para mostrar mensajes emergentes

const AgregarClientes = () => {
    const navigate = useNavigate(); // Hook para la navegación

    // Define el estado inicial del cliente
    const [clientes, setClientes] = useState({
        nombres: '',
        apellidos: '',
        documento: '',
        correo: '',
        telefono: '',
        direccion: ''
    });

    const { nombres, apellidos, documento, correo, telefono, direccion } = clientes; // Desestructura el estado del cliente

    useEffect(() => {
        document.getElementById("nombres").focus(); // Establece el foco en el campo "nombres" al montar el componente
    }, []);

    // Maneja los cambios en los campos del formulario
    const onChange = (e) => {
        setClientes({
            ...clientes,
            [e.target.name]: e.target.value
        });
    };

    // Función para crear un nuevo cliente
    const crearCliente = async () => {
        const data = {
            nombres: clientes.nombres,
            apellidos: clientes.apellidos,
            documento: clientes.documento,
            correo: clientes.correo,
            telefono: clientes.telefono,
            direccion: clientes.direccion
        };

        // Realiza la llamada a la API para crear un nuevo cliente
        const response = await APIInvoke.invokePOST('/api/clientes/', data);
        const idCliente = response._id;

        if (idCliente === '') {
            // Muestra un mensaje de error si la creación falla
            const msg = "Hubo un error al agregar un cliente";
            swal({
                title: 'Error',
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
        } else {
            // Navega de regreso a la lista de clientes y muestra un mensaje de éxito
            navigate('/clientes');
            const msg = "El cliente fue creado con éxito";
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

            // Reinicia el estado del formulario
            setClientes({
                nombres: '',
                apellidos: '',
                documento: '',
                correo: '',
                telefono: '',
                direccion: ''
            });
        }
    };

    // Maneja el envío del formulario
    const onSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        crearCliente(); // Llama a la función para crear el cliente
    };

    // Renderiza el componente
    return (
        <div className="wrapper">
            <Navbar /> {/* Navbar */}
            <SidebarContainer /> {/* Sidebar */}

            <ContentHeader
                titulo={"Creación de Clientes"} // Título del contenido
                breadCrumb1={"Listado de Clientes"} // Primer breadcrumb
                breadCrumb2={"Creación"} // Segundo breadcrumb
                ruta1={"/clientes/agregar"} // Ruta del primer breadcrumb
            />

            <section className="content">
                <div className="card">
                    <div className="card-header">
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
                        <form onSubmit={onSubmit}>
                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='nombres'>Nombres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='nombres'
                                        name='nombres'
                                        placeholder='Ingrese el nombre del cliente'
                                        value={nombres}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='apellidos'>Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='apellidos'
                                        name='apellidos'
                                        placeholder='Ingrese el apellido del cliente'
                                        value={apellidos}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='documento'>Documento</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='documento'
                                        name='documento'
                                        placeholder='Ingrese el documento del cliente'
                                        value={documento}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='correo'>Correo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='correo'
                                        name='correo'
                                        placeholder='Ingrese el correo del cliente'
                                        value={correo}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='telefono'>Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='telefono'
                                        name='telefono'
                                        placeholder='Ingrese el teléfono del cliente'
                                        value={telefono}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='direccion'>Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='direccion'
                                        name='direccion'
                                        placeholder='Ingrese la dirección del cliente'
                                        value={direccion}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type='submit' className='btn btn-primary'>Agregar Cliente</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>                       
            <Footer /> {/* Footer */}
        </div>
    );
}

export default AgregarClientes;
