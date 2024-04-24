const { Router } = require('express')
const router = Router()
const AdministradorCtrl = require('../controllers/Jefe.Controllers')

router.post('/crear', AdministradorCtrl.crearAdministrador)
router.post('/login', AdministradorCtrl.login)
module.exports = router