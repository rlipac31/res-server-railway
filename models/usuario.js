const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'elnombre es reeqquerido']
    },
    email: {
        type: String,
        required: [true, 'email es reeqquerido']
    },
    password: {
        type: String,
        required: [true, 'el password es reeqquerido']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIM_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
//metodoos
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
     usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);