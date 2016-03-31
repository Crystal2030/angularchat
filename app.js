var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var signedCookieParser = cookieParser('angularchat');

var routes = require('./routes/index');
var users = require('./routes/users');
var settings = require('./settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

var db = mongoose.connect(settings.url);
db.connection.on('error', function(error){
	console.log('Connect database failed: ' + error);
});
db.connection.on('success', function(){
	console.log("Connect database successfully!");
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});
app.use(session({
	secret: settings.cookieSecret,//secret 用来防止篡改 cookie
	key: settings.db,//key 的值为 cookie 的名字
	cookie: {maxAge: 1000*60*60*24*30},
	resave: true,
	saveUninitialized: true,
	//指定保存的位置
	store: sessionStore
}));
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', routes);
app.use('/users', users);

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

var port = process.env.PORT | '3000';
var server = app.listen(port, function(){
  console.log('Listening on ' + port);
});//监听端口
var io = require('socket.io')(server);

/*io.set('authorization', function(request, next) {
  signedCookieParser(request,{},function(err){//解密cookie
    sessionStore.get(request.signedCookies['connect.sid'],function(err,session){//从session中获取会话信息
      if (err) {
        next(err.message, false)
      } else {
        if (session && session.userId) {
          request.session = session;
          next(null, true)
        } else {
          next('No login')
        }
      }
    });
  });
});*/


var messages = [];
//监听 客户端的连接事件
//socket代表与某个客户端的连接对象
io.sockets.on('connection', function(socket){
  console.log('A user connected');
  socket.on('getAllMessages', function(){
    socket.emit('allMessages', messages);
  });
  socket.on('createMessage', function(msg){
    console.log('**********createMessage**********',msg);
    messages.push(msg);
    io.sockets.emit('messageAdded', msg);
  })
});
