const PORT = 8080;

var express = require('express');
var app = express();
var http = require('http');
var router = require('./router');
var db = require('./db');
var view = require('./view');
var fs = require('fs');
var sessions = require('client-sessions');

// Enable sessions
app.use(sessions({
    cookieName: 'session',
    secret: 'an;dddsf,3dsfcmfs',
    duration: 24*60*60*1000,
    activeDuration: 1000*60*5
}));

var measurements_controller = require('./controllers/measurements_controller');
router.addRoute('/', 'GET', measurements_controller.redirect);
router.addResource('measurements', measurements_controller);

var farmers_controller = require('./controllers/farmers_controller');
router.addRoute('/farmers/:id/ban', 'GET', farmers_controller.ban);
router.addRoute('/signup', 'GET', farmers_controller.signup);
router.addResource('farmers', farmers_controller);

// Login routes
var session = require('./session');
app.get('/login', session.new);
app.post('/login', session.create);
app.get('/logout', session.destroy);


app.use(farmers_controller.loadUser);
app.use(express.static('assets'));
app.use(router.route);

app.listen(PORT, function () {
    console.log('Sorghum frontend app is running on port', PORT);
});

