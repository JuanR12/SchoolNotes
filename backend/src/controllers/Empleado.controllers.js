const ProfesorCtrl = {}
const Profesor = require('../models/Usuario.models')


ProfesorCtrl.crear = async(req,res)=>{


    const { nombres, apellidos, cedula, puesto, materia, administrador }=req.body


    const NuevoProfesor = new  Profesor({

            nombres,
            apellidos,
            cedula,
            puesto,
            materia,
            administrador

    })

    const respuesta= await NuevoProfesor.save() 

    res.json({

        mensaje:'Profesor Creado',
        respuesta

    })


}



ProfesorCtrl.listar= async(req, res)=>{

    const respuesta = await Profesor.find()

    res.json(respuesta)

}


ProfesorCtrl.listarId = async(req,res)=>{

    const id = req.params.id;
    const respuesta = await Profesor.findOne({_id:id})
    res.json(respuesta)


}


ProfesorCtrl.profesorDelaMateria = async(req,res)=>{

    const id = req.params.id;

    const respuesta = await Profesor.find({jefe:id})

    res.json(respuesta)

}

ProfesorCtrl.eliminar = async(req,res)=>{

    const id = req.params.id
    await Profesor.findByIdAndRemove({_id:id})
    res.json({

        mensaje : 'Profesor eliminado'

    })

}


ProfesorCtrl.actualizar =  async(req,res)=>{

    const id = req.params.id;
    await Profesor.findByIdAndUpdate({_id:id},req.body)
    res.json({

        mensaje:'Profesor actualizado'

    })
}



ProfesorCtrl.buscarProfesor = async(req,res)=>{

    const {nombres,id} = req.params;

    const respuesta = await Profesor.find({ nombres: { $regex: ".*" + nombres + ".*" },administrador:id })
    res.json(respuesta)



}


module.exports = ProfesorCtrl
