const db = require('../src/database/models');
const sequelize = db.sequelize;



const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                console.log(movies)
                res.render('home.ejs', {movies})
            })
    }
}

module.exports = moviesController;