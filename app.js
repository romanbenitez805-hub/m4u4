var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config(); // cargar variables de entorno



// Routers
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var loginRouter = require('./routes/admin/login.js');
var adminRouter = require('./routes/index.js'); // <-- agregado

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// configuración de sesiones
app.use(session({
  secret: 'cursom4u4 ',
  resave: false,
  saveUninitialized: true
}));

const secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}


app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin', secured, adminRouter); // <-- montamos el panel admin

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

