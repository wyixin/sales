var crypto = require('crypto');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017;
var dbHost = '202.114.177.31';
var dbName = 'sales';

/* establish the database connection */
var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d) {
    if (e) {
        console.log(e);
    } else {
        console.log('connected to database :: ' + dbName);
    }
});

// users model
var users = db.collection('users');

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

var passwdHash = function(str) {
    return md5(str);
};

exports.authenticate = function(email, pass, cb) {
    users.findOne({email: email}, function(e, u) {
        if(u) {
            if(u.password === passwdHash(pass)) {
                cb(null, u);
            } else {
                cb('password error');            
            }
        } else {
            cb('user not exist');            
        }
    });
};

//data {username: "xxx", password: "xxx", email: "xxx"}
exports.createAccount = function (data, cb) {
    users.findOne({username: data.username}, function(e, u){
        if(u) {
            cb('username token');
        } else {
            users.findOne({email: data.email}, function(e, u){
                if(u) {
                    cb('email token');
                } else {
                    data.password = passwdHash(data.password);
                    users.insert(data, {safe: true}, cb);
                }
            });
        }
    });
};

