
const { Router } = require('express');
const { check } = require('express-validator');
//validaciones de campos


const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRol } = require('../middleware');


const { esRolValido,
        emailYaExiste,
        usuarioIdExiste,
        usuarioEstadoFalse
                    } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch 
      } = require('../controllers/usuarios');



const router = Router();

//listar usarios
router.get('/', usuariosGet);

//actualizar usuarios
router.put('/:id',[
    validarJWT,
    check('id', 'no es un id valido de mongoDB').isMongoId(),
    check('id').custom( usuarioIdExiste ),
    check('role').custom(esRolValido),
    validarCampos
], usuariosPut);
//agregar usuarios
router.post('/', [
    check('name', 'el nombre es obligatorio!!!!').not().isEmpty(),
    check('password', 'el pasword es obligatorio y tiene que tener mas de 6 caracteres!').isLength({ min: 6 }),
    // check('email', 'no es un correo validooo!!!!').isEmail(),
    check('email').custom(emailYaExiste),
    // check('role', 'rol nno valido!!!!').isIn(['USER_ROLE','ADMIM_ROLE']),
    check('role').custom(esRolValido),
    validarCampos
], usuariosPost);
//eliminar usuaios
router.delete('/:id',[ 
    validarJWT,
   // esAdminRole,
   tieneRol('ADMIN_ROLE','USER_ROLE',  'VENTAS_ROLE'),
    check('id', 'no es un id valido de mongoDB').isMongoId(),
    check('id').custom( usuarioIdExiste ),
    check('id').custom( usuarioEstadoFalse ),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);



module.exports = router;