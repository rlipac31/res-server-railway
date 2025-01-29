const Role = require('../models/role');  
const Usuario = require('../models/usuario');  

const esRolValido = async(role)=>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`el ${role} no esta registrado en la DB`)
    }
}

const  emailYaExiste = async(email)=>{
    //validar email existe
    const emailExiste = await Usuario.findOne({email});//busca el email en laaa bd
    if(emailExiste){
        throw new Error(`el correo:  ${email} ya  registrado en la DB`)
    }
}

const usuarioIdExiste = async( id )=>{
    //validar email existe
    const userIdExiste = await Usuario.findById( id );//busca el email en laaa bd
    if(! userIdExiste ){
        throw new Error(`el id :  ${ id } no esta registrado en la BD`)
    }
}

const usuarioEstadoFalse = async (id)=>{
    const userIdExiste = await Usuario.findById( id );//busca el email en laaa bd
    if( userIdExiste.estado === false){
        throw new Error(`el usuario :  ${ userIdExiste.email } no esta habilitado`)
    }
}


module.exports = {
    esRolValido,
    emailYaExiste,
    usuarioIdExiste,
    usuarioEstadoFalse

}