"use strict";
var view = require('../view');
var Measurements = require('../models/app_model').measurement;
var db = require('../db');
var GoogleMapsAPI = require('googlemaps');
var Measurements = require('../models/app_model').measurement;
var publicConfig = {
  key: 'AIzaSyAJb3bdHTpR_y7uVY1pEqWLBQwG-ACCXt0',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
};
var gmAPI = new GoogleMapsAPI(publicConfig);

function   ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = parseInt(degrees) + parseInt(minutes)/60 + parseInt(seconds)/(60*60);

  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

function ParseDMS(input) {
  var parts = input.split(/[^\d\w]+/);
  var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
  var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
  return lng + "," + lat;
}



class MeasurementsController
{
  // Render index page with all the measurements (accessibly only by logged user)
  index(req, res) {
    if (!measurements_controller.user_logged_in(req, res)) return;


    Measurements.all(function (error, measurements) {

      for (var i = 0; i < measurements.length; i++){

        var measurement = measurements[i];
        var latlng = ParseDMS(measurement.latitude + " " + measurement.longitude);

        var reverseGeocodeParams = {
          "latlng":        latlng,
          "result_type":   "administrative_area_level_2",
          "language":      "en",
          "location_type": "APPROXIMATE"
        };

        gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
          console.log(result);
          if(result[0]!=null && result[0].address_components[0].long_name!=null){
            measurement.county = result[0].address_components[0].long_name;

          }
          else
          {
            measurement.county = "";

          }


          measurement.save();
        });
      }
    })


    Measurements.all(function (error, measurements) {
      if(error){
        measurements_controller.render_error();
        return;
      }
      res.send(view.render('measurements/index', { pages: measurements, current_user: req.farmer}));
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
      res.send(view.render('measurements/show', {measurement: measurement, current_user: req.farmer}));
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

  /**
  *  Returns an object containing two other objects
  *  each containing an array of data for the x/y axis
  *  and its description to be rendered on the plot
  */
  sendChartData(req, res) {
    Measurements.all(function (error, records) {
      res.writeHead(200, {"Content-Type": "application/json"});
      var json = JSON.stringify({
        xAxis: measurements_controller.mapRadioButtonValueToQueryResultItem(req.params.x, records),
        yAxis: measurements_controller.mapRadioButtonValueToQueryResultItem(req.params.y, records)
      });
      res.end(json);
    });
  }

  // Shows chart
  show_chart(req, res) {
    if (!measurements_controller.user_logged_in(req, res)) return;
    res.send(view.render('measurements/chart', {current_user: req.farmer}));
  }

  // Shows the map
  mapseeds(req, res) {
    if (!measurements_controller.user_logged_in(req, res)) return;
    res.send(view.render('measurements/mapseeds', {current_user: req.farmer}));
  }

  mapyield(req, res) {
    if (!measurements_controller.user_logged_in(req, res)) return;
    res.send(view.render('measurements/mapyield', {current_user: req.farmer}));
  }

// Aggregate data
  counties(req, res) {
    if (!measurements_controller.user_logged_in(req, res)) return;
    var that = this;
    db.all('SELECT county, max(SEEDS_PER_POUND) AS "max", min(SEEDS_PER_POUND) AS "min", avg(SEEDS_PER_POUND) AS "avg"'+
    ' FROM measurements GROUP BY county', function (error, measurements) {
      if (error) {
        console.log(error);
        return;
      }
      res.send(view.render('measurements/counties', { pages: measurements, current_user: req.farmer}));
    });
  }

  /**
  * Maps a column of a database query into an array and
  * returns it with its description as an object
  *
  * @param number Number of a selected radio button
  * @param records Result of a database query
  * @returns {*} Column of a database query as an array
  * along with its description
  */
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
