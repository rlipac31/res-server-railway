const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



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

const usuariosPut = async (req=request, res = response) => {

    const { id } = req.params;
    const {_id, password, email, google, ...resto } = req.body;
    // validar por base de datos 
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );// busca el ussuario por su id  y le pasa el resto a acualizar
    const usuarioUpdate = await Usuario.findById(id)
   // console.log(usuarioUpdate);

  /*  const [  usuario ,usuarioUpdate] = await Promise.all([
            Usuario.findByIdAndUpdate( id, resto ),
            Usuario.findById(id)
   
  
    ]);
 */
    res.status(200).json( {
        usuario,
        usuarioUpdate
    });

}

const usuariosPatch = (req= request, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req = request, res = response) => {
  //const usuaiosAutenticado = req.usuario;
    //borrado logico  mediante el campo estado del Modelo
    try {
        const { id  } = req.params;
        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
        const  usuarioEliminado = await Usuario.findById(id);
        //console.log(usuaiosAutenticado);
        return res.json({
            usuarioEliminado
            //usuaiosAutenticado
        });
    }catch (error) {
        console.log(error);         
    }
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}