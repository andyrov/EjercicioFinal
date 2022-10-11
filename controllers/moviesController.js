const db = require('../src/database/models');
const sequelize = db.sequelize;



const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                console.log(movies)
                res.render('home.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                console.log(movie)
                res.render('movieDetail.ejs', {movie})
            });
    },
    'genre': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                console.log(genre)
                res.render('movieDetail.ejs', {genre})
            });
    }
}

module.exports = moviesController;