var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var MongoClient = mongo.MongoClient;
var server = new Server('localhost', 27017, { auto_reconnect: true });
var dbUrl = 'mongodb://dinesh:raja@ds145118.mlab.com:45118/aiddb';


exports.getAppInfo = function(req, res) {
    // To get AppInfo from DB
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        } else {
            db.collection('appinfo', function(err, collection) {
                collection.find().toArray(function(err, appinfo) {
                    res.send(appinfo);
                });
            });
        }
    });
}
