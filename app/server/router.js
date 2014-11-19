var db = require('./modules/db');

function route(app) {

    app.get('/', function (req, res) {
        res.render('pages/index', { title: 'Express' });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function(){
            res.redirect('/login');
        });
    });

    app.get('/login', function(req, res) {
        if(req.session.user) {
            res.redirect('/'); // redirect to main page if login
        } else {
            res.render('pages/login');
        }
    });

    app.get('/register', function(req, res){
        res.render('pages/register');
    });

    app.post('/register', function(req, res){

        db.createAccount({email: req.body.email, password: req.body.password}, function(err, user){
            if(user) {
                req.session.user = user[0];
                res.redirect('/');
            }
        });
    });
    
    app.post('/login', function(req, res) {
        db.authenticate(req.body.username, req.body.password, function(err, user) {
            if(user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });
        res.end();
    });
};

module.exports = route;
