const db = require('../database/models');
const sequelize = db.sequelize;
const express = require('express');
const app = express();
const { validationResult } = require('express-validator');
const User = require('../database/models/User');
const bcrypt = require('bcrypt');



const usersController = {
    'register': (req, res) => {
        res.render('register')
    },
    'login': (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('login', { errors: resultValidation.mapped() })
        }
        return res.render('login')
    },
    'create': (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', { errors: resultValidation.mapped() })
        }
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        db.User.create(user);
        return res.redirect('/users/login');
    },
    'userView': (req, res) => {
        res.render('user', { user: req.session.userLogged })
    },
    'delete': (req, res) => {
        db.User.destroy({ where: { id: req.params.id } })
            .then(res.redirect('/'))
    },
    'loginProcess': (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('login', { errors: resultValidation.mapped() })
        }
        db.User.findOne({ where: { name: req.body.name }, })
            .then(userToLogin => {
                let passwordIsOk = bcrypt.compareSync(req.body.password, userToLogin.password)
                if (passwordIsOk) {
                    delete userToLogin.password
                    req.session.userLogged = userToLogin
                    return res.redirect('/')
                }
                return res.render('login', {
                    errors: {
                        name: {
                            msg: 'La contraseña es incorrecta'
                        }
                    }
                })
            })
            .catch(error => {
                return res.render('login', { error })
            });
    },
    'logout': (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = usersController;