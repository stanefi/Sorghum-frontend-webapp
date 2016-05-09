
var assert = require('assert');
var Measurement = require('../models/app_model').measurement;

var mockupMeasurement;

describe('App model - Measurements', function() {
    before(function(){
        mockupMeasurement = {
            ACRES:	2.4,
            HEADS_PER_ACRE:	800,
            ROW_SPACING:	15,
            APP_AREA:	2.5,
            SEEDS_PER_POUND:	9000,
            longitude: 0.523242,
            latitude:  0.324232,
            date_time: "2016-06-03 03:12:00.000",
            image_path: "test.jpg"
        }
    });

    it('Measurement model exists', function() {
        assert.ok(Measurement);
    });
    
    it('Measurement.new - properties', function() {
        var measurement = Measurement.new(mockupMeasurement);
        assert.equal(measurement.ACRES, mockupMeasurement.ACRES);
        assert.equal(measurement.HEADS_PER_ACRE, mockupMeasurement.HEADS_PER_ACRE);
        assert.equal(measurement.ROW_SPACING, mockupMeasurement.ROW_SPACING);
        assert.equal(measurement.APP_AREA, mockupMeasurement.APP_AREA);
        assert.equal(measurement.SEEDS_PER_POUND, mockupMeasurement.SEEDS_PER_POUND);
        assert.equal(measurement.longitude, mockupMeasurement.longitude);
        assert.equal(measurement.latitude, mockupMeasurement.latitude);
        assert.equal(measurement.date_time, mockupMeasurement.date_time);
        assert.equal(measurement.image_path, mockupMeasurement.image_path);
    });

    it('Measurement.new - methods exists (save, update, destroy)', function() {
        var measurement = Measurement.new(mockupMeasurement);
        assert.ok(measurement.save);
        assert.ok(measurement.update);
        assert.ok(measurement.destroy);
    });

    it('Measurement.new - no id', function() {
        var measurement = Measurement.new(mockupMeasurement);
        assert.equal(measurement.id, undefined);
    });

    it('Measurement - save to DB', function(done) {
        var new_measurement = Measurement.new(mockupMeasurement);
        new_measurement.save(function (id) {
            assert.ok(id);
            Measurement.find(id, function (error, measurement) {
                assert.equal(error, undefined);
                assert.ok(measurement);
                measurement.destroy();
                done();
            });
        });
    });

    it('Measurement - save to DB, correct properties', function(done) {
        var new_measurement = Measurement.new(mockupMeasurement);
        new_measurement.save(function (id) {
            assert.ok(id);
            Measurement.find(id, function (error, measurement) {
                assert.equal(error, undefined);
                assert.equal(measurement.ACRES, mockupMeasurement.ACRES);
                assert.equal(measurement.HEADS_PER_ACRE, mockupMeasurement.HEADS_PER_ACRE);
                assert.equal(measurement.ROW_SPACING, mockupMeasurement.ROW_SPACING);
                assert.equal(measurement.APP_AREA, mockupMeasurement.APP_AREA);
                assert.equal(measurement.SEEDS_PER_POUND, mockupMeasurement.SEEDS_PER_POUND);
                assert.equal(measurement.longitude, mockupMeasurement.longitude);
                assert.equal(measurement.latitude, mockupMeasurement.latitude);
                assert.equal(measurement.date_time, mockupMeasurement.date_time);
                assert.equal(measurement.image_path, mockupMeasurement.image_path);
                measurement.destroy();
                done();
            });
        });
    });

});
