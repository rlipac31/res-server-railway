const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async (req = request, res = response) => {

   // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
   const { limite = 5, desde = 0 } = req.query; // parametros opcionales que bienen en el query
   const query = {estado:true}
   /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const totalUsuarios = await Usuario.countDocuments(query); *///count esta obsoleto
   // agreando las promesas en un arreglo para que se ejecuten al mismo tiempo
   const [ totalUsuarios, usuarios] = await Promise.all([
        Usuario.countDocuments(query), 
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
      
   ]);
   res.status(200).json({
        totalUsuarios,
        usuarios
        
    });
}
const usuariosPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();//genera un salt de 10 por defecto
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar bd
    try {
        await usuario.save();
    } catch (error) {
        console.log(error);
    }

    res.json({
        msg: 'post API - usuariosPost',
        // name, email, role // devuelve solo name email role// demora mas en responder
        usuario// devuelve todo el objeto

    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id, password, email, google, ...resto } = req.body;
    // validar por base de datos 
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );// busca el ussuario por su id  y le pasa el resto a acualizar
    console.log(usuario);

    res.status(200).json(usuario);

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
  const { id  } = req.params;

    //borrar fisicamente de la Bd
 
   /* const usuarioBorrado =  await Usuario.findByIdAndDelete(id)
  .then(doc => {
    if (doc) {
      console.log('Documento eliminado:', doc);
      res.json(doc);
    } else {
      console.log('Documento no encontrado');
    }
  })
  .catch(err => console.error('Error al eliminar el documento:', err)); */

//borrado logico  mediante el campo estado del Modelo
const usuarioBorrado =  await Usuario.findByIdAndUpdate(id, {estado:false})
  .then(doc => {
    if (doc) {
      console.log('Documento eliminado:', doc);
      res.status(200).json(doc);
    } else {
      console.log('Documento no encontrado');
    }
  })
  .catch(err => console.error('Error al eliminar el documento:', err));
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}