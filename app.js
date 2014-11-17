var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'ssbywyx' })); 
// setup static file server
app.use(express.static(__dirname + '/public'));

// express doesnt support layout after 3.0.0
app.use(expressLayouts);
// setup template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// dummy data
var users = {
    tj: {name: 'tj', salt: 'f4d2'} //password
};

// use defined functions

function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    return fn(null, user);
};



app.get('/', function (req, res) {
    res.render('pages/index', { title: 'Express' });
});

app.get('/login', function(req, res) {
    if(req.session.user) {
        res.redirect('/index'); // redirect to main page if login
    } else {
        res.render('pages/login');
    }
});

app.post('/login', function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user) {
        if(user) {
            req.session.user = user;
        } else {
            res.redirect('/login');
        }
    });
    res.end();
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
