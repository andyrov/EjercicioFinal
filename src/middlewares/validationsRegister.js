const { body } = require('express-validator');
const fs = require('fs');


module.exports = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('email').notEmpty().withMessage('El email no puede estar vacio').isEmail().withMessage('el email es invalido'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacia').isStrongPassword().withMessage('La contraseña debe tener como minimo: 8 caracteres, una mayuscula, un numero y un caracter especial'),
    body('confirm_password').notEmpty().withMessage('La campo no puede estar vacio').custom((value, {req}) => {if (value != req.body.password){throw new Error('Las contraseñas no coinciden')}return true})
]