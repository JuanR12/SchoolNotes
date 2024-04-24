const AdministradorCtrl = {}
const Administrador = require('../models/Jefe.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

AdministradorCtrl.crearAdministrador = async (req, res) => {
    const { nombre, correo, contrasena } = req.body
    const NuevoAdministrador = new Administrador({
        nombre,
        correo,
        contrasena
    })
    const correoAdministrador = await Administrador.findOne({ correo: correo })
    if(correoAdministrador){
        res.json({
            mensaje: 'El correo ya existe'
        })

    } else {
        NuevoAdministrador.contrasena = await bcrypt.hash(contrasena,10)
        const token = jwt.sign({ _id: NuevoAdministrador._id }, 'Secreta')
        await NuevoAdministrador.save()
        res.json({
            mensaje: 'SchoolNotes',
            id: NuevoAdministrador._id,
            nombre: NuevoAdministrador.nombre,
            token
        })


    }
}

AdministradorCtrl.login = async(req,res)=>{

        const {correo, contrasena}= req.body
        const administrador = await Administrador.findOne({correo: correo})

        if(!administrador){

            return res.json({
            
            mensaje:'Correo incorrecto'
            
            })

        }

        const match = await bcrypt.compare(contrasena, administrador.contrasena)

        if(match){

            const token = jwt.sign({ _id: administrador._id }, 'Secreta')
            res.json({

                mensaje: 'Bienvenido',
                id: administrador.id,
                nombre: administrador.nombre,
                token

            })

        }

        else{

            res.json({

                mensaje:'Constraseña incorrecta'

            })

        }

}




module.exports = AdministradorCtrl