

function route(app) {
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

    app.post('/login', function(req, res) {
        authenticate(req.body.username, req.body.password, function(err, user) {
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
