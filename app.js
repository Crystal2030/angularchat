var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var signedCookieParser = cookieParser('angularchat');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var User = require('./controllers/user');
var msgModel = require('./controllers/messages');
var async = require('async');

var routes = require('./routes/index');
var users = require('./routes/users');
var settings = require('./settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

var db = mongoose.connect(settings.url);
db.connection.on('error', function (error) {
    console.log('Connect database failed: ' + error);
});
db.connection.on('success', function () {
    console.log("Connect database successfully!");
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
var sessionStore = new MongoStore({
	url: settings.url
});
app.use(expressSession({
    secret: settings.cookieSecret,//secret 用来防止篡改 cookie
	resave:true,
	saveUninitialized:false,
    //指定保存的位置
    store: sessionStore
}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.PORT | '3000';
var server = app.listen(port, function () {
    console.log('Listening on ' + port);
});//监听端口

var io = require('socket.io')(server);

io.set('authorization', function(handshake, callback) {
	signedCookieParser(handshake,{},function(err){//解密cookie
		sessionStore.get(handshake.signedCookies['angularchat'],function(err,session){//从session中获取会话信息
			if (err) {
				callback(err.message, false)
			} else {
				if (session && session.userId) {
					handshake.session = session;
					console.log('0000000000',handshake.session)
					callback(null, true)
				} else {
					callback('Not login')
				}
			}
		});
	});
});

var SYSTEM = {
    name: 'System',
    avatarUrl: 'https://secure.gravatar.com/avatar/50d11d6a57cfd40e0878c8ac307f3e01?s=48'
}

//监听 客户端的连接事件
//socket代表与某个客户端的连接对象
io.sockets.on('connection', function (socket) {
	/*console.log('1111111111111',socket.handshake);
	var userId = '56fe5cc8c96b593c17c4d617';
	var currentUser ;
	User.findUserById({_id:userId},function(err,user){
		if(err){
			currentUser = {username:'匿名'};
		}else{
			currentUser = user;
			users.push(currentUser);
			//增加一条消息
			socket.broadcast.emit('messageAdded', {
				content: currentUser.username + '进入了聊天室',
				creator: SYSTEM,
				createAt: new Date()
			})
			socket.on('disconnect', function () {
				//给别人增加一条消息
				socket.broadcast.emit('messageAdded', {
					content: currentUser.username + '离开了聊天室',
					creator: SYSTEM,
					createAt: new Date()
				});
			});
			socket.emit('connected');
		}
	});*/
    socket.on('getRoom', function () {
	    //使用async来并行地对数据库进行读取
        async.parallel([
            function(done){
                User.getOnlineUsers(done);
            },
            function(done){
	            msgModel.read(done);
            }
        ],
        function(err, results){
            if(err){
                socket.emit('err',{msg: err});
            }else{
                socket.emit('roomData', {
                    users: results[0],
                    messages: results[1]
                })
            }
        })

    });
    socket.on('createMessage', function (message) {
	    msgModel.create(message, function(err, message){
	        if(err){
                socket.emit('err',{msg: err});
            }else{
                io.sockets.emit('messageAdded', message);
            }
        })
    });


});
