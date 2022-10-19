const db = require('../database/models');
const sequelize = db.sequelize;
const express = require('express');
const app = express();
const { validationResult } = require('express-validator');
const { moveCursor } = require('readline');




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
                db.Actor.findAll()
                    .then(actors => {
                        res.render('moviesAdd.ejs', { genres, actors })
                    })
            })
    },
    'create': (req, res) => {
        const resultValidation = validationResult(req);
        db.Genre.findAll()
            .then(genres => {
                db.Actor.findAll()
                    .then(actors => {
                        if (resultValidation.errors.length > 0) {
                            return res.render('moviesAdd.ejs', { genres, actors, errors: resultValidation.mapped() })
                        }
                        let movie = {
                            title: req.body.title,
                            genre_id: req.body.genre_id,
                            rating: req.body.rating,
                            awards: req.body.awards,
                            release_date: req.body.release,
                            length: req.body.length
                        }

                        db.Movie.create(movie)
                            .then(movieCreated => {
                                db.Movie.findOne({ where: { title: movie.title } })
                                    .then(movieCreated => {
                                        if (req.body.actors1 != 'actors') {
                                            const actor_movie1 = {
                                                actor_id: req.body.actors1,
                                                movie_id: movieCreated.id
                                            };
                                            db.Actor_Movie.create(actor_movie1);
                                        }
                                        if (req.body.actors2 != 'actors') {
                                            const actor_movie2 = {
                                                actor_id: req.body.actors2,
                                                movie_id: movieCreated.id
                                            };
                                            db.Actor_Movie.create(actor_movie2);
                                        }
                                        if (req.body.actors3 != 'actors') {
                                            const actor_movie3 = {
                                                actor_id: req.body.actors3,
                                                movie_id: movieCreated.id
                                            };
                                            db.Actor_Movie.create(actor_movie3);
                                        }
                                    });
                            });

                        res.redirect('/');
                    });
            })



    },
    'edit': (req, res) => {

        //obtener pelicula por id
        db.Movie.findOne({
            where: { id: req.params.id }, include: [{
                model: db.Actor,
                as: 'actors'
            }]
        })
            .then(Movie => {
                //obtener genres 
                db.Genre.findAll()
                    .then(genres => {
                        //obtener actores
                        db.Actor.findAll()
                            .then(actors => {
                                res.render('moviesEdit.ejs', {
                                    genres, actors, Movie: {
                                        id: Movie.id,
                                        title: Movie.title,
                                        genre_id: Movie.genre_id,
                                        rating: Movie.rating,
                                        awards: Movie.awards,
                                        release_date: new Date(Movie.release_date).toISOString().split("T")[0],
                                        length: Movie.length,
                                        actors: Movie.actors
                                    }
                                })
                            })
                    })
            })
    },
    'update': (req, res) => {
        const resultValidation = validationResult(req);
        db.Movie.findOne({
            where: { id: req.body.id }, include: [{
                model: db.Actor,
                as: 'actors'
            }]
        })
            .then(Movie => {
                db.Genre.findAll()
                    .then( genres => {
                        db.Actor.findAll()
                            .then(async allActors => {
                                if (resultValidation.errors.length > 0) {
                            return res.render('moviesEdit.ejs', { Movie: {
                                id: Movie.id,
                                title: Movie.title,
                                genre_id: Movie.genre_id,
                                rating: Movie.rating,
                                awards: Movie.awards,
                                release_date: new Date(Movie.release_date).toISOString().split("T")[0],
                                length: Movie.length,
                                actors: Movie.actors
                            }, actors: allActors, genres, errors: resultValidation.mapped() })
                        }
                        const actors = []
                        if (req.body.actors1 != undefined) {
                            const algo = await db.Actor.findByPk(req.body.actors1)
                            actors.push(algo)

                        }
                        if (req.body.actors2 != undefined) {
                            const algo = await db.Actor.findByPk(req.body.actors2)
                            actors.push(algo)
                        }
                        if (req.body.actors3 != undefined) {
                            const algo = await db.Actor.findByPk(req.body.actors3)
                            actors.push(algo)
                        }

                        //Movie.title = req.body.title;
                        //Movie.genre_id = req.body.genre_id;
                        //Movie.rating = req.body.rating;
                        //Movie.awards = req.body.awards;
                        //Movie.release_date = req.body.release;
                        // Movie.length = req.body.length;

                        await db.Actor_Movie.destroy({ where: { movie_id: Movie.id } })
                        Movie.actors = []
                        Movie.addActor(actors)
                        console.log(Movie);
                        db.Movie.update({
                            title: req.body.title,
                            genre_id: req.body.genre_id,
                            rating: req.body.rating,
                            awards: req.body.awards,
                            release_date: req.body.release,
                            length: req.body.length,
                        }, { where: { id: req.body.id } })
                            .then(res.redirect('/movies/details/' + req.body.id))
                            })
                        
                    })
            })
    },
    'delete': (req, res) => {
        db.Movie.findOne({ where: { id: req.params.id } })
            .then(movieToDelete => {
                db.Actor_Movie.destroy({ where: { movie_id: movieToDelete.id } })
                    .then(a => {
                        db.Movie.destroy({ where: { id: movieToDelete.id } })
                            .then(res.redirect('/'))
                    })
            })
    }
}

module.exports = moviesController;