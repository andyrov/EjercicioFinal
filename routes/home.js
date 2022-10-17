const express = require('express');
const router = express.Router();

// Middlewares
const movieValidations = require('../src/middlewares/validationsMovies');
const registerValidations = require('../src/middlewares/validationsRegister');
const loginValidations = require('../src/middlewares/validationsLogin');
const guestMiddleware = require('../src/middlewares/guestMiddleware');
const authMiddleware = require('../src/middlewares/authMiddleware');
const adminMiddleware = require('../src/middlewares/adminMiddleware');

// Controllers
const moviesController = require('../src/controllers/moviesController');
const usersController = require('../src/controllers/usersController');

// Movies routes
router.get('/', moviesController.list);
router.get('/movies/details/:id', moviesController.detail);
router.get('/movies/add', authMiddleware, adminMiddleware, moviesController.add);
router.post('/movies/create', movieValidations, moviesController.create);
router.get('/movies/edit/:id', authMiddleware, adminMiddleware, moviesController.edit);
router.put('/movies/update/:id', movieValidations, moviesController.update);
router.delete('/movies/delete/:id', authMiddleware, adminMiddleware, moviesController.delete);


// Users routes
router.get('/users/register', guestMiddleware, usersController.register);
router.post('/users/create', registerValidations, usersController.create);
router.get('/users/details/:id', authMiddleware, usersController.userView);
router.delete('/users/delete/:id', usersController.delete);
router.get('/users/login', guestMiddleware, usersController.login);
router.post('/users/loginProcess', loginValidations, usersController.loginProcess);
router.get('/users/logout', usersController.logout)

module.exports = router