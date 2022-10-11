const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviesController')

router.get('/', controller.list);
router.get('/movies/details/:id', controller.detail);

module.exports = router