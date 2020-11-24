var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');  
var indexRouter = require('./routes/index');
var personnelRouter = require('./routes/personnel');

var app = express();

// view engine setup
app.set('views', path.join("./", 'views'));
// app.set('view engine', 'jade');
//模板类型指定为html
app.engine('html', ejs.__express)
//启动视图引擎
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//静态地图资源
app.use(express.static(path.join('./', 'public'), { setHeaders:(res,path,stat)=>{
  res.set({
    'Content-Type': "image/png;charset=UTF8", 
    'Access-Control-Allow-Origin': '*' ,
  })
}}));


app.use('/', indexRouter);
app.use('/personnel', personnelRouter);

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
