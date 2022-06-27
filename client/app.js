let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compress = require('compression');

let routes = require('./routes/index');
let users = require('./routes/users');

let app = express();

// view engine setup
if (process.env.NODE_ENV === "development") {
	app.use(logger('dev'));
	app.set('views', path.join(__dirname, 'client/src'));
	app.use(express.static(path.join(__dirname, 'client/src')));
} else {
	//chỉ show log khi lỗi, có thể ghi ra file theo hướng dẫn
	// http://stackoverflow.com/questions/23494956/how-to-use-morgan-logger
	app.use(logger('combined'));
	app.set('views', path.join(__dirname, 'client/public'));
	app.use(express.static(path.join(__dirname, 'client/public')));
}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compress());

app.use('/', routes);
app.use('/users', users);

let port = process.env.port || 3000;
app.listen(port, function () {
	console.log("App running on port " + port + " -mode: " + process.env.NODE_ENV || "not oke");
});

module.exports = app;

