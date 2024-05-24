import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { useNavigate, useParams } from 'react-router-dom'; // Importa hooks para la navegación y parámetros de URL
import ContentHeader from '../../Componentes/ContentHeader'; // Importa el componente ContentHeader
import Footer from '../../Componentes/Footer'; // Importa el componente Footer
import Navbar from '../../Componentes/Navbar'; // Importa el componente Navbar
import SidebarContainer from '../../Componentes/SidebarContainer'; // Importa el componente SidebarContainer
import APIInvoke from '../../archivoAPI/APIInvoke'; // Importa el servicio para realizar llamadas a la API


const EditarCliente = () => {
    const [nombres, setNombres] = useState ('')
    const [apellidos, setApellidos] = useState ('') 
    const [documento, setDocumento] = useState ('')
    const [correo, setCorreo] = useState ('')
    const [telefono, setTelefono] = useState ('')
    const [direccion, setDireccion] = useState ('')    
    const navigate = useNavigate();
    const { id } = useParams();

const modificarCliente = async (e) => {
    e.preventDefault()
    await APIInvoke.invokePUT(`/api/clientes/${id}`, {
        nombres: nombres, apellidos: apellidos, documento: documento, correo: correo,
        direccion: direccion, telefono: telefono
    })
    navigate ('/clientes')
}

useEffect(() => {
    getClientesbyID();
    //eslint-disable-next-line
}, []);


const getClientesbyID = async () => {
    const res = await APIInvoke.invokePUT(`/api/clientes/${id}`)
    setNombres(res.nombres)
    setApellidos(res.apellidos)
    setDocumento(res.documento)
    setCorreo(res.correo)
    setTelefono(res.telefono)
    setDireccion(res.direccion)
    
}




    // Renderiza el componente
    return (
        <div className="wrapper">
            <Navbar /> {/* Navbar */}
            <SidebarContainer /> {/* Sidebar */}

            <ContentHeader
                titulo={"Editar Clientes"} // Título del contenido
                breadCrumb1={"Listado de Clientes"} // Primer breadcrumb
                breadCrumb2={"Edición"} // Segundo breadcrumb
                ruta1={"/clientes"} // Ruta del primer breadcrumb
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

                        <form onSubmit={modificarCliente}>

                            <div className='card-body'>
                                <div className="form-group">
                                    <label htmlFor='nombres'>Nombres</label>
                                    <input type="text"
                                        className="form-control"
                                        id='nombres'
                                        name='nombres'
                                        placeholder='Ingrese el nombre del cliente'
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
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
                                    <input type="text"
                                        className="form-control"
                                        id='apellidos'
                                        name='apellidos'
                                        placeholder='Ingrese el apellido del cliente'
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
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
                                    <input type="text"
                                        className="form-control"
                                        id='documento'
                                        name='documento'
                                        placeholder='Ingrese el documento del cliente'
                                        value={documento}
                                        onChange={(e) => setDocumento(e.target.value)}
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
                                    <input type="text"
                                        className="form-control"
                                        id='correo'
                                        name='correo'
                                        placeholder='Ingrese el correo del cliente'
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
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
                                    <input type="text"
                                        className="form-control"
                                        id='telefono'
                                        name='telefono'
                                        placeholder='Ingrese el teléfono del cliente'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
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
                                    <input type="text"
                                        className="form-control"
                                        id='direccion'
                                        name='direccion'
                                        placeholder='Ingrese la dirección del cliente'
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
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
                                <button type='submit' className='btn btn-primary'>Editar Cliente</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer */}
        </div>
    )
}

export default EditarCliente;
