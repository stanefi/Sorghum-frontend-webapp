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


app.get('/', measurements_controller.redirect);
app.get('/measurements', measurements_controller.index);
app.get('/measurements/:id', measurements_controller.show);
app.get('/measurements/:id/delete', measurements_controller.destroy);

// Data export route
app.post('/measurements', measurements_controller.export_data);

app.get('/graphData/:x/:y', measurements_controller.sendChartData);
app.get('/map', measurements_controller.map);
app.get('/chart', measurements_controller.show_chart);

app.get('/signup', farmers_controller.signup);
app.post('/farmers', farmers_controller.create);


// Login routes
var session = require('./session');
app.get('/login', session.new);
app.post('/login', session.create);
app.get('/logout', session.destroy);


app.listen(PORT, function () {
    console.log('Sorghum frontend app is running on port', PORT);
});
