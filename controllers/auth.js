const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res )=>{

    const { email, password} = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({email});
        console.log(usuario);
        if(!usuario){
            return res.status(400).json({
                msg:'usuario y/o password no son correctos'
            })
        } 

        //el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'usuario y/o password no son correctos/// inacttivo= false'
            })
        }
        //verifficar lla contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:`usuario y/o password no son correctos/// password '${password}' no valido`
            });
        }
        //generara JWT
        
    } catch (error) {
        return res.status(500).json({
            msg:'hable con  el admnistradodr'
        })
    }

    res.json({

        email, password,
        msg: ' Login OK!!!!'
    })

} 

module.exports = {
    login
}