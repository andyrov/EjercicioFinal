const express = require('express');
const router = express.Router();
const validations = require('../src/middlewares/validationsMovies');
const moviesController = require('../src/controllers/moviesController');
const usersController = require('../src/controllers/usersController');

router.get('/', moviesController.list);
router.get('/movies/details/:id', moviesController.detail);
router.get('/movies/add', moviesController.add);
router.post('/movies/create', validations, moviesController.create);
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id',validations, moviesController.update);
router.delete('/movies/delete/:id', moviesController.delete);

router.get('/users/register', usersController.register);
router.post('/users/create', usersController.create);
router.get('/users/details/:id', usersController.userView);
router.delete('/users/delete/:id', usersController.delete);
router.get('/users/login', usersController.login);

module.exports = router