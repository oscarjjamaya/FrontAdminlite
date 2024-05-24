import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const AgregarProveedor = () => {
    const navigate = useNavigate();

    const [proveedor, setProveedor] = useState({
        empresa: '',
        nit: '',
        correo: '',
        telefono: '',
        direccion: ''
    });

    const { empresa, nit, correo, telefono, direccion } = proveedor;

    useEffect(() => {
        document.getElementById("empresa").focus();
    }, []);

    const onChange = (e) => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    };

    const crearProveedor = async () => {
        const data = { ...proveedor };

        const response = await APIInvoke.invokePOST('/api/proveedor/', data);
        const idProveedor = response._id;

        if (!idProveedor) {
            const msg = "Hubo un error al agregar un Proveedor";
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
            navigate('/proveedor');
            const msg = "El Proveedor fue creado con éxito";
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

            setProveedor({
                empresa: '',
                nit: '',
                correo: '',
                telefono: '',
                direccion: ''
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        crearProveedor();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />

            <ContentHeader
                titulo={"Creación de Proveedores"}
                breadCrumb1={"Listado de Proveedores"}
                breadCrumb2={"Creación"}
                ruta1={"/proveedor/agregar"}
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
                                    type="email"
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
                            <div className="card-footer">
                                <button type='submit' className='btn btn-primary'>Agregar Proveedor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AgregarProveedor;
