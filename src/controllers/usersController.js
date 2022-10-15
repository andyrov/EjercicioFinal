const db = require('../database/models');
const sequelize = db.sequelize;
const express = require('express');
const app = express();
const { validationResult } = require('express-validator');
const User = require('../database/models/User');



const usersController = {
    'register': (req, res) => {
        res.render('register.ejs')
    },
    'login': (req, res) => {
        res.render('login.ejs',)    
    },
    'create': (req, res) => {
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        db.User.create(user);
        res.redirect('/users/login');
    },
    'userView': (req, res) => {
        db.User.findByPk(req.params.id)
            .then(User => {
                res.render('user.ejs', {User})
            })
    },
    'delete': (req, res) => {
        db.User.destroy({ where: { id: req.params.id } })
            .then(res.redirect('/'))
    }
}

module.exports = usersController;