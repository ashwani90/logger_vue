
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const connectDB = require('./config/db');
const validateSession = require("./middlewares/validSession");


var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var tasksRouter = require('./routes/tasks');
var timeTableRouter = require('./routes/timeTable');
var docsRouter = require('./routes/index');

require('./config/passport')(passport);

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
var cors = require('cors');

//Connect to db
connectDB();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
require('./config/passport');
app.use(validateSession);

// Mapped to all routers
app.use('/', usersRouter);
app.use('/posts', postsRouter);
app.use('/tasks', tasksRouter);
app.use('/time-table', timeTableRouter);
app.use('/api-docs', docsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ success: false, message: err.message });
});

module.exports = app;
