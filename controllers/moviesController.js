const db = require('../src/database/models');
const sequelize = db.sequelize;



const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('home.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, {include: [{association: 'genres'}, {association: 'actors'}]})
            .then(movie => {
                console.log(movie)
                res.render('movieDetail.ejs', {movie})
            });
    },
    'genre': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('movieDetail.ejs', {genre})
            });
    }
}

module.exports = moviesController;