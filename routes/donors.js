var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('aiddb', server);
db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'aiddb' database");
        db.collection('donors', { strict: true }, function(err, collection) {
            if (err) {
                console.log("The 'donors' collection doesn't exist. Creating it with dummy data..");
                populateDB();
            }
        });
    }
});
exports.addDonor = function(req, res) {
    // To add a donor
    var donor = req.body;
    console.log('Adding Donor: ' + JSON.stringify(donor));
    db.collection('donors', function(err, collection) {
        collection.insert(donor, { safe: true }, function(err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
exports.listAllDonors = function(req, res) {
    // To list all registered donors
    db.collection('donors', function(err, collection) {
        collection.find().toArray(function(err, donors) {
            res.send(donors);
        });
    });
};


exports.findDonorById = function(req, res) {
    // To find the donor 
    var id = req.params.id;
    console.log('Retrieving donor: ' + id);
    db.collection('donors', function(err, collection) {
        if (!err) {
            collection.find({ '_id': new BSON.ObjectID(id) }, function(err, donor) {
                res.send(donor);
            });
        }else console.log(err);
    });
};

exports.updateDonor = function(req, res) {
    var id = req.params.id;
    var donor = req.body;
    console.log('Updating donor: ' + id);
    console.log(JSON.stringify(donor));
    db.collection('donors', function(err, collection) {
        collection.update({ '_id': new BSON.ObjectID(id) }, donor, { safe: true }, function(err, result) {
            if (err) {
                console.log('Error updating donor: ' + err);
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('' + result + ' documents updated');
                res.send(donor);
            }
        });
    });
};


var populateDB = function() {

    var donors = [{
        fname: "Dinesh",
        lname: "Raja",
        pmobile: "9942734970",
        smobile: "",
        bloodGroup: "a2p",
        year: "23",
        habits: ['alcohol', 'smoking'],
        conditions: ['bp', 'sugar'],
        address: "Udumalpet"
    }];

    db.collection('donors', function(err, collection) {
        collection.insert(donors, { safe: true }, function(err, result) {});
    });

};
