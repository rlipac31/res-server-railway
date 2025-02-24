const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {// los midlewares pasan 3 funciones, el rq, la response y el next(para que continue con lo que segue despues)

  const token = req.header( 'x-token' );
 
      try {
          if(!token ){
            console.log(token);
            return res.status(401).json({
              msg:'No hay tokenn en la peticion'
            });
          }
        
          const { uid } = jwt.verify( token, process.env.SECRECT_PRIBATE_KEY);// vverificammos que el token sea vaalido y sacamos el uid del este objeto
          /* req.uid = id; usuaario */ //pasamoms el  uid del ussuario logueado al la request
          const usuario  = await Usuario.findById(uid);
          if(!usuario){//si usuario no exte
            return res.json({
              msg:' Token no valido - usuario no exist en BD'
            })
          }
          // Verificar si uid tiene estado true
          if(!usuario.estado){
            return res.json({
              msg:' Token no valido - usuario inactivo '
            })
          }
         req.usuario = usuario;// establece losd datos del usuarioen el req.usuario
       
      } catch (error) {
          console.log(error);
          res.status(401).json({
            msg:'Token non valido'
          });
      }

  next();
}

module.exports = {
  validarJWT
}