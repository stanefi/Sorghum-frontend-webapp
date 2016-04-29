const PORT = 8080;

var express = require('express');
var app = express();
var http = require('http');
var router = require('./router');
var db = require('./db');
var view = require('./view');
var fs = require('fs');
var sessions = require('client-sessions');
var farmers_controller = require('./controllers/farmers_controller');
var measurements_controller = require('./controllers/measurements_controller');

// Enable sessions
app.use(sessions({
    cookieName: 'session',
    secret: 'an;dddsf,3dsfcmfs',
    duration: 24*60*60*1000,
    activeDuration: 1000*60*5
}));

app.use(farmers_controller.loadUser);
app.use(express.static('assets'));


// router.addRoute('/', 'GET', measurements_controller.redirect);
// router.addResource('measurements', measurements_controller);

app.get('/', measurements_controller.redirect);
app.get('/measurements', measurements_controller.index);
app.get('/measurements/:id', measurements_controller.show);
app.post('/measurements/:id', measurements_controller.update);
app.get('/measurements/:id/edit', measurements_controller.edit);

app.get('/signup', farmers_controller.signup);
app.post('/farmers', farmers_controller.create);


// router.addRoute('/farmers/:id/ban', 'GET', farmers_controller.ban);
// // router.addRoute('/signup', 'GET', farmers_controller.signup);
// router.addResource('farmers', farmers_controller);

// Login routes
var session = require('./session');
app.get('/login', session.new);
app.post('/login', session.create);
app.get('/logout', session.destroy);

// Data export route
var dataExport = require('./controllers/dataExport');
app.post('/measurements', dataExport.exportAll);


// app.use(router.route);

app.listen(PORT, function () {
    console.log('Sorghum frontend app is running on port', PORT);
});

