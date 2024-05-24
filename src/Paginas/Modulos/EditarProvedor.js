import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import ContentHeader from '../../Componentes/ContentHeader'; // Importa el componente ContentHeader
import Footer from '../../Componentes/Footer'; // Importa el componente Footer
import Navbar from '../../Componentes/Navbar'; // Importa el componente Navbar
import SidebarContainer from '../../Componentes/SidebarContainer'; // Importa el componente SidebarContainer
import APIInvoke from '../../archivoAPI/APIInvoke'; // Importa el servicio APIInvoke para hacer llamadas a la API
import swal from 'sweetalert'; // Importa sweetalert para mostrar mensajes emergentes

const AgregarProveedor = () => {
    const navigate = useNavigate(); // Hook para la navegación

    // Define el estado inicial del proveedor
    const [proveedor, setProveedor] = useState({
        empresa: '',
        nit: '',
        correo: '',
        telefono: '',
        direccion: ''
    });

    const { empresa, nit, correo, telefono, direccion } = proveedor; // Desestructura el estado del proveedor

    useEffect(() => {
        document.getElementById("empresa").focus(); // Establece el foco en el campo "empresa" al montar el componente
    }, []);

    // Maneja los cambios en los campos del formulario
    const onChange = (e) => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    };

    // Función para crear un nuevo proveedor
    const crearProveedor = async () => {
        const data = { ...proveedor }; // Copia el estado actual del proveedor

        // Realiza la llamada a la API para crear un nuevo proveedor
        const response = await APIInvoke.invokePOST('/api/proveedor/', data);
        const idProveedor = response._id;

        if (!idProveedor) { // Si la respuesta no contiene un ID válido
            const msg = "Hubo un error al agregar un Proveedor"; // Mensaje de error
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
            navigate('/proveedor'); // Navega de regreso a la lista de proveedores
            const msg = "El Proveedor fue Editado con éxito"; // Mensaje de éxito
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
            setProveedor({
                empresa: '',
                nit: '',
                correo: '',
                telefono: '',
                direccion: ''
            });
        }
    };

    // Maneja el envío del formulario
    const onSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        crearProveedor(); // Llama a la función para crear el proveedor
    };

    // Renderiza el componente
    return (
        <div className="wrapper">
            <Navbar /> {/* Navbar */}
            <SidebarContainer /> {/* Sidebar */}

            <ContentHeader
                titulo={"Creación de Proveedores"} // Título del contenido
                breadCrumb1={"Listado de Proveedores"} // Primer breadcrumb
                breadCrumb2={"Creación"} // Segundo breadcrumb
                ruta1={"/proveedor"} // Ruta del primer breadcrumb
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
                                    <label htmlFor='empresa'>Empresa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='empresa'
                                        name='empresa'
                                        placeholder='Ingrese el nombre de la empresa del Proveedor'
                                        value={empresa}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='nit'>Nit</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='nit'
                                        name='nit'
                                        placeholder='Ingrese el nit del Proveedor'
                                        value={nit}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='correo'>Correo</label>
                                    <input
                                        type="email" // Cambiado a type="email" para validación de correo
                                        className="form-control"
                                        id='correo'
                                        name='correo'
                                        placeholder='Ingrese el correo del Proveedor'
                                        value={correo}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='telefono'>Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='telefono'
                                        name='telefono'
                                        placeholder='Ingrese el teléfono del Proveedor'
                                        value={telefono}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='direccion'>Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='direccion'
                                        name='direccion'
                                        placeholder='Ingrese la dirección del Proveedor'
                                        value={direccion}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type='submit' className='btn btn-primary'>Agregar Proveedor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>                       
            <Footer /> {/* Footer */}
        </div>
    );
}

export default AgregarProveedor;
