import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Registro() {

    const [nombre,setNombre]=useState('')
    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')


    const registro=async(e)=>{
        e.preventDefault();
        const usuario={nombre,correo,contrasena}
        const respuesta= await Axios.post('/administrador/crear',usuario);
        console.log(respuesta);
        const mensaje=respuesta.data.mensaje
        if(mensaje!=='Bienvenido')
        {
            


            Swal.fire({
              
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })


            //   Swal.fire(
            //     'Good job!',
            //     'You clicked the button!',
            //     'success'
            //   )

        }

        else{

            const token= respuesta.data.token
            const nombre= respuesta.data.nombre
            const idusuario=respuesta.data.id
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('nombre',nombre)
            sessionStorage.setItem('idusuario',idusuario)
            window.location.href='/index'

            // Swal.fire({
              
            //     icon: 'success',
            //     title: mensaje,
            //     showConfirmButton: false,
            //     timer: 1500
            //       })

        }

    }



    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-md-6  mx-auto">
                <div className="card">
                    <div className ="container text-center fa-5x">
                        <i className="fas fa-user-plus"></i>

                  

                    </div>

                    <div className="card-header text-center">
                      <h4>Inicio de sesion Administrador</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={registro} >

                        <div className='form-group'>
                                <label>Nombre</label>
                                <input type="text" className='form-control' autoFocus  required onChange={(e)=>setNombre(e.target.value)}/>

                            </div>

                            
                            <div className='form-group'>
                                <label>Correo</label>
                                <input type="email" className='form-control'   required onChange={(e)=>setCorreo(e.target.value)}/>

                            </div>

                            <div className='form-group'>
                                <label>Contraseña</label>
                                <input type="password" className='form-control'  required onChange={(e)=>setContrasena(e.target.value)}/>

                            </div>

                            <input type="submit" className='btn btn-primary  btn-block' />

                        </form>

                    </div>

                </div>

            </div>

        </div>
        
    </div>
    )
}
