var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
// setup static file server
app.use(express.static(__dirname + '/public'));

// express doesnt support layout after 3.0.0
app.use(expressLayouts);
// setup template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index', { title: 'Express' });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
