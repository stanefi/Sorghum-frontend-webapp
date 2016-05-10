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

var addCounties = function () {

};

// var addCounties = function () {

// };

// Add test data here:
function addSeeds() {
  var m1 = Measurement.new({
    ACRES:	2.4,
    HEADS_PER_ACRE:	800,
    ROW_SPACING:	15,
    APP_AREA:	2.5,
    SEEDS_PER_POUND:	9000,
    longitude: 0.0,
    latitude:  0.0,
    date_time: "2016-06-03 03:12:00.000",
    image_path: "test.jpg"
  });
  m1.save();
  /*ACRES:	"FLOAT NOT NULL",
   HEADS_PER_ACRE:	"INTEGER NOT NULL",
   ROW_SPACING:	"INTEGER NOT NULL",
   APP_AREA:	"FLOAT NOT NULL",
   SEEDS_PER_POUND:	"FLOAT NOT NULL",
  *
  * */
  var m2 = Measurement.new({
    ACRES:	1.4,
    HEADS_PER_ACRE:	500,
    ROW_SPACING:	7.5,
    APP_AREA:	2.5,
    SEEDS_PER_POUND:	9000,
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
  addCounties: addCounties(),
  measurement: Measurement,
  farmer: Farmer
};