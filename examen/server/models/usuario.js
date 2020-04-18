const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['Admin', 'Operador','Administrativo'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nick: {
        type: String,
        unique: true,
        required: [true, 'El nick es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
    },
    rol: {
        type: String,
        default: 'Operador',
        enum: rolesValidos
    },
    delete: {
        type: Boolean,
        default: false
    },
});


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);