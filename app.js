const express = require('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve(__dirname, './public');
const rutasHome = require('./routes/home');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');


app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use(userLoggedMiddleware);

app.listen(process.env.PORT || 5000 , function (){
    console.log("Servidor corriendo en el puerto 5000");
});

app.use('/', rutasHome);