
const { Router } = require('express');
const { check } = require('express-validator');
//validaciones de campos
const { validarCampos } = require('../middleware/validar-campos');

const { login } = require('../controllers/auth');


const router = Router();

//listar usarios
router.post('/login',[
    check('email', 'emaail no valido').isEmail(),
    check('password', 'inserte una contraseña').not().isEmpty(),
    validarCampos
],login );





module.exports = router;