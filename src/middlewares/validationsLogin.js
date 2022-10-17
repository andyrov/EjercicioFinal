const { body } = require('express-validator');
const fs = require('fs');

module.exports = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacia').isStrongPassword().withMessage('ingrese una contaseña valida'),
]