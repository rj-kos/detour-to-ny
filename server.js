// modules

var express 		= require('express');
var app 			= express();
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var mongoose 		= require('mongoose');

//database
var db = require('./config/db');

//listening
var port = process.env.PORT || 3000;

//mongo connection
mongoose.connect(db.url); 

//sessions
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var secretWord = require('./config/secret');

app.use(session({
    secret: secretWord.secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 1 * 24 * 60 * 60 })
}));

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app); // configure our routes

// start app
// startup our app at http://localhost:8080
app.listen(port);               

// expose app           
exports = module.exports = app;                         
