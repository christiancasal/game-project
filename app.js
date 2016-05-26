var express = require('express');
var expressHandlebars = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var games_controller = require('./controllers/games_controller.js');
var infos_controller = require('./controllers/infos_controller.js');
var apis_controller = require('./controllers/apis_controller.js');

var app = express();

app.use(session({ secret: 'app', cookie: { maxAge: 600000 }}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', infos_controller);
app.use('/', games_controller);
app.use('/', apis_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// var PORT = process.env.PORT || 8000;
//
// app.listen(PORT, function(){
//   console.log('App listening on PORT ' + PORT);
// });

module.exports = app;
