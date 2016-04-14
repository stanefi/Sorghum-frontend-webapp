'use strict';
var Record = require('../database/record');
var sqlite3 = require('sqlite3');
var db = require('../db');
var measurement_model = require('./measurement.js');
var farmer_model = require('./user.js');

var Measurement = new Record('measurements', measurement_model);
var Farmer = new Record('farmers',  farmer_model);
var encryption = require('../encryption');

var createDB = function() {
  db.serialize(function () {
    Measurement.create();
    Farmer.create();
    var m1 = Measurement.new({
      value1:	4.4,
      value2:	5.5,
      value3:	5.5,
      value4:	5.5,
      value5:	5.5,
      longitude: 0.0,
      latitude:  0.0,
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
      image_path: "test2.jpg"
    });
    m2.save();

    var salt1 = encryption.salt();
    var user1 = Farmer.new({
      username: "admin@gmail.com",
      password: encryption.digest('pass1234' + salt1),
      user_type: "admin",
      salt: salt1
    });
    user1.save();

    var salt2 = encryption.salt();
    var user2 = Farmer.new({
      username: "testuser@gmail.com",
      password: encryption.digest('pass' + salt2),
      user_type: "editor",
      salt: salt2
    });
    user2.save();

  });
};


module.exports = exports = {
  createDB: createDB,
  measurement: Measurement,
  farmer: Farmer
};