var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();//les ifos sensible
const http = require('http'); // importer http
const{connectToMongoDb}=require ('./config/db')
const session = require("express-session");

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use(session({ //sesion tatini enehou user li hal fl wa9t tawa
  //secret: "net secret ds",
  //resave: false,
  //saveUninitialized: true,
  //cookie:{
    //secure:{secure: false},
    //maxAge: 72 *60 *60, // lezem cookie w token w session andhom nfs lwa9t
  //},
//}))


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
  res.render('error');
});

const server = http.createServer(app); //sna3et serveur
server.listen(process.env.port, () => {
  connectToMongoDb(),
  console.log("app is running on port 3000");

});
