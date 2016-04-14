var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./database/development.sqlite3');

module.exports = exports = db;
