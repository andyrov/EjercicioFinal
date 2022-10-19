const { body } = require('express-validator');
const fs = require('fs');

module.exports = [
    body('title').notEmpty().withMessage('El titulo no puede estar vacio').isLength({min: 2, max: 50}).withMessage('El titulo debe tener entre 2 y 50 caracteres'),
    body('rating').notEmpty().withMessage('El campo rating no puede estar vacio').isFloat({ min: 1, max: 10 }).withMessage('El rating debe ser entre 1 y 10'),
    body('genre_id').notEmpty().withMessage('El campo Genero no puede estar vacio'),
    body('awards').notEmpty().withMessage('El campo Premios no puede estar vacio').isInt({min: 0}).withMessage('El campo Premios debe ser 0 o mayor'),
    body('release').isDate().withMessage('El campo Lanzamiento no puede estar vacio'),
    body('length').notEmpty().withMessage('El campo Duracion no puede estar vacio').isFloat({min: 1, max: 500}).withMessage('El campo Duracion debe ser entre 1 y 500'),
]