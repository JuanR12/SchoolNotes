
import React, { useState ,useEffect} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'


export default function Actualizar(props) {
    
    const [nombres,setNombres]=useState('')
    const [apellidos,setApellidos]=useState('')
    const [cedula,setCedula]=useState('')
    const [puesto,setPuesto]=useState('')
    const [materias,setMaterias]=useState([])
    const [materiaselect,setMateriaSelect]=useState('')
    
    useEffect(() => {
        obtenerProfesor()
        setMaterias ([ 'Español', 'Ingles', 'Matematicas'])
      
    }, [])
    

    const obtenerProfesor= async()=>{
        const id=props.match.params.id
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get('/profesor/listar/'+id,{
           headers:{'autorizacion':token}

        
        })
        console.log(respuesta.data);
        setNombres(respuesta.data.nombres)
        setApellidos(respuesta.data.apellidos)
        setCedula(respuesta.data.cedula)
        setPuesto(respuesta.data.puesto)
        setMateriaSelect(respuesta.data.materia)
     
    }

    const actualizar= async(e)=>{
        e.preventDefault();
        const id=props.match.params.id
        const token= sessionStorage.getItem('token')
        const profesor={
            nombres,
            apellidos,
            cedula,
            puesto,
            materia: materiaselect
        }

        const respuesta= await Axios.put('/profesor/actualizar/'+id, profesor,{
            headers:{'autorizacion':token}
        })
        const mensaje=respuesta.data.mensaje

        
        Swal.fire({
              
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })

              setTimeout(()=>{
                  window.location.href='/index'
              },1500)


    }

    return (
        <div className="container col-md-6 mt-4">
                <div className="card">
                    <div className="card-header">
                        <h3>Editar</h3>
                        <div className="card-body">
                            <form onSubmit={actualizar}>
                                <div className="form-group">
                                    <label>Nombres</label>
                                    <input type="text" className="form-control" required onChange={e => setNombres(e.target.value)} value={nombres}/>
                                </div>
                                <div className="form-group">
                                    <label>Apellidos</label>
                                    <input type="text" className="form-control" required onChange={e => setApellidos(e.target.value)} value={apellidos}/>
                                </div>
                                <div className="form-group">
                                    <label>Puesto</label>
                                    <input type="text" className="form-control" required onChange={e => setPuesto(e.target.value)} value={puesto} />
                                </div>
                                <div className="form-group">
                                    <label>Identificación</label>
                                    <input type="text" className="form-control" required onChange={e => setCedula(e.target.value)} value={cedula}/>
                                </div>
                                <div className="form-group">
                                    <label>Tipo de contrato</label>
                                    <select className="form-control" onChange={(e) => setMateriaSelect(e.target.value)} value={materiaselect}>
                                        {
                                            materias.map(materia =>
                                                <option key={materia}>
                                                    {materia}
                                                </option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-warning" type="submit">Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
