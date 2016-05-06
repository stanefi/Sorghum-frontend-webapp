"use strict";
var view = require('../view');
var Measurements = require('../models/app_model').measurement;

class MeasurementsController 
{
    // Render index page with all the measurements (accessibly only by logged user)
    index(req, res) {
        if (!measurements_controller.user_logged_in(req, res)) return;
        Measurements.all(function (error, measurements) {
            if(error){
                measurements_controller.render_error();
                return;
            }
            res.send(view.render('measurements/index', { pages: measurements, user_panel: measurements_controller.generate_user_panel_html(req.farmer)}));
        });
    }

    // Shows a measurement (accessibly only by logged user)
    show(req, res) {
        if (!measurements_controller.user_logged_in(req, res)) return;
        Measurements.find(req.params.id, function (error, measurement) {
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            res.send(view.render('measurements/show', {measurement: measurement}));
        });
    }

    // Removes a measurement (accessibly only by logged user)
    destroy(req, res) {
        if (!measurements_controller.user_logged_in(req, res)) return;
        Measurements.find(req.params.id, function(error, measurement){
            if(error){
                measurements_controller.render_error(res);
                return;
            }
            measurement.destroy();
            measurements_controller.redirect(req, res);
        });
    }
    
    // Export of all the measurements to cvs (accessibly only by logged user)
    export_data(req, res) {
        if (!measurements_controller.user_logged_in(req, res)) return;
        Measurements.all(function(error, records) {
            var csvContent = "data:text/csv;charset=utf-8\n" +
                "ACRES,HEADS_PER_ACRE,ROW_SPACING,APP_AREA,SEEDS_PER_POUND\n"; // collumns

            records.forEach(function(record, index) {
                var dataString = record.ACRES + ',' + record.HEADS_PER_ACRE + ',' +
                    record.ROW_SPACING + ',' + record.APP_AREA + ',' + record.SEEDS_PER_POUND;
                csvContent += index < records.length ? dataString + '\n' : dataString;
            });
            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-disposition':'attachment; filename=export.csv'
            });
            //var encodedUri = encodeURI(csvContent);
            res.end(csvContent);
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

    user_logged_in(req, res){
        if(req.farmer && (req.farmer.user_type == "editor" || req.farmer.user_type == "admin")) {
            return true;
        }
        res.redirect("/login");
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
