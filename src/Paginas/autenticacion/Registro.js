import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombres: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombres, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById("nombres").focus();
  }, [])

  const RegistrarCuenta = async () => {
    if (password !== confirmar) {
      const men = "la contraseña es diferente";
      swal({
        title: 'Error',
        text: men,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {

      if (password.length < 10) {
        const men = "la contraseña debe tener 10 caracteres minimo";
        swal({
          title: 'Error',
          text: men,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const data = {
          nombres: usuario.nombres,
          email: usuario.email,
          password: usuario.password
        }

        const response = await APIInvoke.invokePOST('/api/usuarios', data)
        const mensaje = response.men

        if (mensaje === 'El usuario ya existe') {
          const msg = 'El usuario ya existe';
          swal({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
              confirm: {
                text: 'ok',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
        } else {
          const msg = 'Usuario registrado correctamente';
          swal({
            title: 'Exito',
            text: msg,
            icon: 'success',
            buttons: {
              confirm: {
                text: 'ok',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }

          });

          setUsuario({
            nombres: '',
            email: '',
            password: '',
            confirmar: ''
          })


        }


      }

    };
  }
  const onSubmit = (e) => {
    e.preventDefault();
    RegistrarCuenta();
  }






  return (
    <div className="hold-transition register-page">
      <div className='login-box'>
        <div className='login-logo'>
          <Link to={"#"}>Registrarse</Link>
        </div>



        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Ingrese los datos de usuario</p>

            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">

                <input type="text"
                  className="form-control"
                  placeholder="Nombres"
                  id='nombres'
                  name='nombres'
                  value={nombres}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input type="email"
                  className="form-control"
                  placeholder="Email"
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required


                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>


              <div className="input-group mb-3">
                <input type="password"
                  className="form-control"
                  placeholder="Password"
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required

                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input type="password"
                  className="form-control"
                  placeholder="Confirmar la contraseña"
                  id='confirmar'
                  name='confirmar'
                  value={confirmar}
                  onChange={onChange}
                  required

                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button type='submit' className='btn btn-block btn-primary'> Registrarse </button>
                <Link to={"/"} className='btn btn-block btn-danger' > Regresar al login </Link>
              </div>



            </form>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro