"use strict";
var encryption = require('./encryption');
var formidable = require('formidable');
var view = require('./view');
var Farmer = require('./models/app_model').farmer;

const error_message = "Username/Password not found. Please try again.";

class Session {

  // Renders a Login page
  new(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(view.partial('session/new', {message: "", user: req.farmer}));
  }

  // Create session and makes user logged in
  create(req, res) {
    req.session.reset();
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      if(err) return res.sendStatus(500);
      Farmer.where("email ='" + fields.email + "'", function (err, farmers) {
        if(err) {
          return res.end(view.partial('session/new', {
            message: error_message,
            farmer: req.farmer
          }));
        }
        var farmer = farmers[0];
        if(!farmer){
          return res.end(view.partial('session/new', {message: error_message, user: req.farmer}));
        }
        if(farmer.password != encryption.digest(fields.password + farmer.salt)) {
          return res.end(view.partial('session/new', {
            message: error_message,
            farmer: req.farmer
          }));
        }
        req.session.farmer_id = farmer.id;
        return res.redirect('/measurements');
      });
    });
  }

  // Ends a farmer session by flushing the session cookie.
  destroy(req, res) {
    req.session.reset();
    res.end(view.render("session/delete", {farmer: {email: "Guest"}}));
  }

}

module.exports = exports = new Session();
