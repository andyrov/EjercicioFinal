const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviesController')

router.get('/', controller.list);
router.get('/movies/details/:id', controller.detail);
router.get('/movies/add', controller.add);
router.post('/movies/create', controller.create);
router.get('/movies/edit/:id', controller.edit);
router.put('/movies/update/:id', controller.update);
router.delete('/movies/delete/:id', controller.delete)

module.exports = router