const db = require('../database/models');
const sequelize = db.sequelize;
const express = require('express');
const app = express();
const { validationResult } = require('express-validator')




const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('home.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, { include: [{ association: 'genres' }, { association: 'actors' }] })
            .then(movie => {
                res.render('movieDetail.ejs', { movie })
            });
    },
    'genre': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('movieDetail.ejs', { genre })
            });
    },
    'add': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('moviesAdd.ejs', { genres })
            })
    },
    'create': (req, res) => {
        const resultValidation = validationResult(req);
        db.Genre.findAll()
            .then(genres => {
                if (resultValidation.errors.length > 0) {
                    res.render('moviesAdd.ejs', { genres, errors: resultValidation.mapped() })
                }
                let movie = {
                    title: req.body.title,
                    genre_id: req.body.genre_id,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release,
                    length: req.body.length
                }
                db.Movie.create(movie);
                res.redirect('/');
            })

    },
    'edit': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                db.Genre.findAll()
                    .then(genres => {
                        res.render('moviesEdit.ejs', {genres, Movie })
                    })              
            })
    },
    'update': (req, res) => {
        const resultValidation = validationResult(req);
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                db.Genre.findAll()
                    .then(genres => {
                        if (resultValidation.errors.length > 0) {
                        res.render('moviesEdit.ejs', { Movie, genres, errors: resultValidation.mapped() })
                }
                                   
                let movie = {
                    title: req.body.title,
                    genre_id: req.body.genre_id,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release,
                    length: req.body.length
                }
                db.Movie.update(movie, { where: { id: req.params.id } })
                    .then(res.redirect('/movies/details/' + req.params.id))
            })
        })
    },
    'delete': (req, res) => {
        db.Movie.destroy({ where: { id: req.params.id } })
            .then(res.redirect('/'))
    }
}

module.exports = moviesController;