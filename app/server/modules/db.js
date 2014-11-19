var crypto = require('crypto');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017;
var dbHost = '202.114.177.31';
var dbName = 'test';

/* establish the database connection */
var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d) {
    if (e) {
        console.log(e);
    } else {
        console.log('connected to database :: ' + dbName);
    }
});

var testData = db.collection('testData');
console.log(testData);
//console.log(testData.findOne());
