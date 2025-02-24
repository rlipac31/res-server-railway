const jwt = require('jsonwebtoken');

const generarJWT = ( uid ='' ) =>{ //le uid es el id que pasamos del usuario

    return new Promise (( resolve, reject )=> {

        const payload = { uid };//recibe Data un objeto uid

        jwt.sign( payload, process.env.SECRECT_PRIBATE_KEY,{//LE PASAMOS EL PAYLOAD lasppallabra secreta , y las opcciones commo un  objeto {}
            expiresIn: '4h'

        }, ( err, token ) => {// esperamos un error si algo sale mal o el token si todo sale bien
            if(err){
                console.log( err )
                    reject( 'Nose pudo generar el token' )
            }else {
                resolve( token );
            }

        } )

    })
}


module.exports = {
    generarJWT
}