
const mongoose = require('mongoose')
const {Schema} = mongoose

const UsuarioSchema= new Schema({

    nombres: String,
    apellidos: String,
    cedula: String,
    puesto: String,
    materia: String,
    administrador: String


})

module.exports=mongoose.model('usuario',UsuarioSchema)