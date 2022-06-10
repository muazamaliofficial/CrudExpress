//Create HTTP errors for Express, Koa, Connect, etc. with ease.
var createError = require('http-errors');
//add express to node js project
var express = require('express');
//The path module provides utilities for working with file and directory paths. It can be accessed using:
var path = require('path');
//Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
var cookieParser = require('cookie-parser');

//HTTP request logger middleware for node.js
var logger = require('morgan');

//require routers
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

//initialize express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//log incoming requests on console
app.use(logger('dev'));
//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
//This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }));
//add cookie-parser middleware defined above
app.use(cookieParser());
//setup static files
app.use(express.static(path.join(__dirname, 'public')));

//a simple get method route which renders a view
app.get('/help', (req,res)=>{
  return res.render("help");
});
app.get('/contact-us', (req,res)=>{
  return res.render("contact-us");
});

//set all paths defined in products router to /
app.use('/', productsRouter);
app.use('/', indexRouter);
//set all paths defined in users router to /users
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
