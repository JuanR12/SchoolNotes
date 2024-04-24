
const { Router } = require('express')
const router = Router()
const ProfesorCtrl = require('../controllers/Empleado.controllers')
const Auth =require('../helper/Auth')


router.post ('/crear', Auth.verificarToken, ProfesorCtrl.crear)
router.get ('/listarProfesores', Auth.verificarToken, ProfesorCtrl.listar)
router.get ('/listar/:id', Auth.verificarToken, ProfesorCtrl.listarId)
router.get ('/listarMateriasProfesor/:id', Auth.verificarToken, ProfesorCtrl.profesorDelaMateria)
router.delete ('/eliminar/:id', Auth.verificarToken, ProfesorCtrl.eliminar)
router.put ('/actualizar/:id', Auth.verificarToken, ProfesorCtrl.actualizar)
router.get ('/buscar/:nombres/:id', Auth.verificarToken, ProfesorCtrl.buscarProfesor)


module.exports= router