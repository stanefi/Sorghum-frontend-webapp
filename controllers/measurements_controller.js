"use strict";
var view = require('../view');
var Measurements = require('../models/app_model').measurement;
var geocoder = require('geocoder');

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
      var counter = 0;
      measurements.forEach(function(measurement, index, array){
        geocoder.reverseGeocode( measurement.latitude, measurement.longitude, function ( err, data ) {
          if(err){
            console.log(err);
            measurements[index].county = 'n/a';
          } else {
            measurements[index].county = data.results[3].address_components[0].long_name;
          }
          counter++;
          if(counter >= measurements.length){
            console.log(measurements);
            res.send(view.render('measurements/index', { pages: measurements, user_panel: measurements_controller.generate_user_panel_html(req.farmer), current_user: req.farmer}));
          }
        });
      });
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
      res.end(csvContent);
    });
  }

    sendChartData(req, res) {
        Measurements.all(function (error, records) {
            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                xAxis: measurements_controller.mapRadioButtonValueToQueryResultItem(req.params.x, records),
                yAxis: measurements_controller.mapRadioButtonValueToQueryResultItem(req.params.y, records)
            });
            res.end(json);
        });


        console.log("request recieved: " + req.params.x + ", " + req.params.y);
        //var string = "Testing string";
        //res.writeHead(200, {"Content-Type": "text/plain"});
        //res.end(string);
    }

    mapRadioButtonValueToQueryResultItem(number, records) {
        if (number == 1) {
            return {values: records.map(function(row) {return row.ACRES;}), name: "ACRES"};
        } else if (number == 2) {
            return {values: records.map(function(row) {return row.HEADS_PER_ACRE;}), name: "HEADS_PER_ACRE"};
        } else if (number == 3) {
            return {values: records.map(function(row) {return row.ROW_SPACING;}), name: "ROW_SPACING"};
        } else if (number == 4) {
            return {values: records.map(function(row) {return row.APP_AREA;}), name: "APP_AREA"};
        } else if (number == 5) {
            return {values: records.map(function(row) {return row.SEEDS_PER_POUND;}), name: "SEEDS_PER_POUND"};
        }
    }

    getColumnFrom2dArray(matrix, col){
        var column = [];
        for(var i=0; i<matrix.length; i++){
            column.push(matrix[i][col]);
         }
        return column;
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
