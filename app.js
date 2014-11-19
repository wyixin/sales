var http = require('http'),
    express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    env = process.env.NODE_ENV || 'development';

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'ssbywyx' })); 
// setup static file server
app.use(express.static(__dirname + '/app/public'));

// express doesnt support layout after 3.0.0
app.use(expressLayouts);
// setup template engine
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'ejs');

if ('development' == env) {
    // dev env placehold
};

require('./app/server/router')(app);

http.createServer(app).listen(3000, function(){
    console.log("Express server is running");
});
