const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const passport = require("passport");

//connect Mongoo DB
require('dotenv').config();
require('./db/mongodb')();

//passport stratergy required
require('./mildwares');

//require route 
const indexRoute = require('./routes/index.R');
const usersRoute = require('./routes/users.R');
const authRoute = require("./routes/auth.R");


const app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//passport init
app.use(passport.initialize());

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.use(function(req, res, next) {
  if (req.headers['content-type'] === 'application/json;') {
      req.headers['content-type'] = 'application/json';
  }
  next();
});

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
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
