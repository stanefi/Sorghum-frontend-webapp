'use strict';
var Record = require('../database/record');
var sqlite3 = require('sqlite3');
var db = require('../db');
var measurement_model = require('./measurement.js');
var farmer_model = require('./farmer.js');
var farmers_measurement_model = require('./farmers_measurement');

var Measurement = new Record('measurements', measurement_model);
var Farmer = new Record('farmers',  farmer_model);
var FarmersMeasurement = new Record('farmers_measurements', farmers_measurement_model, "FOREIGN KEY(`measurement_id`) REFERENCES measurements(id), FOREIGN KEY(`farmers_email`) REFERENCES farmers(email)");
var encryption = require('../encryption');


var createDB = function() {
  db.serialize(function () {
    console.log("Creating a new database ...", "\n");
    Measurement.create();
    Farmer.create();
    FarmersMeasurement.create();
    
    addSeeds();
  });
};

// Add test data here:
function addSeeds() {
  var m1 = Measurement.new({
    value1:	4.4,
    value2:	5.5,
    value3:	5.5,
    value4:	5.5,
    value5:	5.5,
    longitude: 0.0,
    latitude:  0.0,
    date_time: "2016-06-03 03:12:00.000",
    image_path: "test.jpg"
  });
  m1.save();
  var m2 = Measurement.new({
    value1:	1.4,
    value2:	3.5,
    value3:	2.5,
    value4:	2.5,
    value5:	3.5,
    longitude: 0.0,
    latitude:  0.0,
    date_time: "2016-06-03 04:12:00.000",
    image_path: "test2.jpg"
  });
  m2.save();

  var salt1 = encryption.salt();
  var user1 = Farmer.new({
    email: "admin@gmail.com",
    password: encryption.digest('pass1234' + salt1),
    user_type: "admin",
    salt: salt1
  });
  user1.save();

  var salt2 = encryption.salt();
  var user2 = Farmer.new({
    email: "testuser@gmail.com",
    password: encryption.digest('pass' + salt2),
    user_type: "standard",
    salt: salt2
  });
  user2.save();
}

module.exports = exports = {
  createDB: createDB,
  measurement: Measurement,
  farmer: Farmer
};