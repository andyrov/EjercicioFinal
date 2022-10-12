const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviesController')

router.get('/', controller.list);
router.get('/movies/details/:id', controller.detail);
router.get('/movies/add', controller.add);
router.post('/movies/add', controller.create);

module.exports = router