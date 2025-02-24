
const { request, response } = require("express");


const esAdminRole = (req, res, next)=>{
      if(!req.usuario ){
        return res.status(500).json({
          msg: ' see  requieree verificar el JsonWeb Token Primero'
      } )

    }

    const { role, name } = req.usuario;
    if( role !== 'ADMIN_ROLE'){
      return res.status(401).json({
        msg: ' see  requieree ser Administrador '
    } )
    }

   

  next();
}

const tieneRol = (...roles)=>{
    return (req, res, next)=>{
      if(!req.usuario ){
          return res.status(500).json({
            msg: ' see  requieree verificar el JsonWeb Token Primero'
        } )
     }

      if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
              msg:  `see  requieree uno de estos roles ${roles}`
          } )
      } 
      console.log(roles)

      next();
    }
  
}


module.exports ={
  esAdminRole,
  tieneRol
}