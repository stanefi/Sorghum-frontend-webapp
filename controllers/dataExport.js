/**
 * Created by Milan on 25.4.2016.
 */
'use strict';
var Record = require('../database/record.js');
var measurement_model = require('../models/measurement.js');
var Measurement = new Record('measurements', measurement_model);

class DataExport {
    constructor() {

    }

    exportAll(req, res) {
        Measurement.all(function(error, records) {
            var csvContent = "data:text/csv;charset=utf-8,";

            records.forEach(function(record, index) {
                var dataString = record.value1 + ',' + record.value2 + ',' +
                    record.value3 + ',' + record.value4 + ',' + record.value5;
                csvContent += index < records.length ? dataString + '\n' : dataString;
            });
            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-disposition':'attachment; filename=export.csv'
            });
            var encodedUri = encodeURI(csvContent);
            res.end(encodedUri);
        });




        //res.end( text_ready );
    }
}

//function createCSVfromQueryResult(error, records) {
//    //console.log("Exporting all");
//
//    var csvContent = "data:text/csv;charset=utf-8,";
//
//    records.forEach(function(record, index) {
//        var dataString = record.value1 + ',' + record.value2 + ',' +
//            record.value3 + ',' + record.value4 + ',' + record.value5;
//        csvContent += index < records.length ? dataString+ "\n" : dataString;
//    });
//};

module.exports = exports = new DataExport();















