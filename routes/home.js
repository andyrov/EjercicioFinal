const express = require('express');
const router = express.Router();
const validations = require('../src/middlewares/validationsMovies');
const controller = require('../src/controllers/moviesController');

router.get('/', controller.list);
router.get('/movies/details/:id', controller.detail);
router.get('/movies/add', controller.add);
router.post('/movies/create', validations, controller.create);
router.get('/movies/edit/:id', controller.edit);
router.put('/movies/update/:id',validations, controller.update);
router.delete('/movies/delete/:id', controller.delete)

module.exports = router