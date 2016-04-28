"use strict";
var view = require('../view');
var formidable = require('formidable');
var Measurements = require('../models/app_model').measurement;
var marked = require("marked");

class MeasurementsController {
    index(req, res) {
        Measurements.all(function (error, measurements) {
            if(error){
                measurements_controller.render_error();
                return;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(view.render('measurements/index', {pages: measurements, user_panel: measurements_controller.generate_user_panel_html(req.farmer)}));
        });
    }

    show(req, res) {
        Measurements.find(req.params.id, function (error, measurement) {
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(view.render('measurements/show', {measurement: measurement}));
        });
    }

    new(req, res) {
        if (!measurements_controller.editor_only(req, res)) return;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(view.render('measurements/new'));
    }

    edit(req, res){
        if (!measurements_controller.editor_only(req, res)) return;
        Measurements.find(req.params.id, function (error, measurement) {
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(view.render('measurements/edit', measurement));
        });
    }

    update(req, res, params) {
        if (!measurements_controller.editor_only(req, res)) return;
        Measurements.find(params.id, function(error, measurement){
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                measurement.update(fields);
                measurement.save();
                if(fields.talk){
                    var location = '/measurements/' + Number(measurement.id) + '/talk';
                    res.redirect(location);
                }
                else {
                    measurements_controller.redirect_to_measurment(req, res, measurement.id);
                }
            });
        });
    }

    create(req, res) {
        if (!measurements_controller.editor_only(req, res)) return;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var new_page = Measurements.new(fields);
            new_page.talk = "";
            new_page.save();
            measurements_controller.redirect(req, res);
        });
    }

    destroy(req, res, params) {
        if (!measurements_controller.editor_only(req, res)) return;
        Measurements.find(params.id, function(error, measurement){
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            measurement.destroy();
            measurements_controller.index(req, res);
        });
    }

    redirect(req, res) {
        res.redirect('/measurements');
    }

    redirect_to_measurment(req, res, page_id) {
        var location = '/measurements/' + Number(page_id);
        res.redirect(location);
    }

    render_error(res){
        res.writeHead(400, {"Content-Type":"text/html"});
        res.end("<h1>Resource Not Found</h1>");
    }

    editor_only(req, res){
        if(req.farmer && (req.farmer.user_type == "editor" || req.farmer.user_type == "admin")) {
            return true;
        }
        res.writeHead(403, {"Content-Type":"text/html"});
        res.end("<h1>Forbidden</h1>");
        return false;
    }

    generate_user_panel_html(user){
        var panel_html = "<div class='farmer-panel'>";
        if(user.user_type == "guest"){
            panel_html += "<a href='/login' class='btn success'>login</a>";
        }
        else{
            panel_html += user.email + "<a href='/logout' class='btn info btn-small'>logout</a>";
        }
        return panel_html + "</div>";
    }

}
var measurements_controller = new MeasurementsController();

module.exports = exports = measurements_controller;
