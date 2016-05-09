var assert = require('assert');
var AppModel = require('../models/app_model');

describe('App model', function() {
    it('Model exists', function() {
        assert.ok(AppModel);
    });
    it('Model create database method exists', function() {
        assert.ok(AppModel.createDB);
    });
});
