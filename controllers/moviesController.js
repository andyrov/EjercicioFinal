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
                res.render('movieDetail.ejs', {movie})
            });
    },
    'genre': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('movieDetail.ejs', {genre})
            });
    },
    'add': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('moviesAdd.ejs', {genres})
            })
    },
    'create': (req, res) => {
        let movie = {
            title: req.body.title,
            genre: req.body.genre_id,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length
        }
        //console.log(movie)
        //db.Movie.create(movie)
        res.send(movie)
    }
}

module.exports = moviesController;