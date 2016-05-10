var assert = require('assert');
var Farmer = require('../models/app_model').farmer;
var encryption = require('../encryption');

var mockupFarmer;
var salt1 = encryption.salt();

describe('App model - Farmer', function() {
    before(function () {
        mockupFarmer = {
            email: "testtest@gmail.com",
            password: encryption.digest('sgdfgdfgsd' + salt1),
            user_type: "admin",
            salt: salt1
        }
    });

    it('Farmer model exists', function () {
        assert.ok(Farmer);
    });


    it('Farmer.new - properties', function() {
        var farmer = Farmer.new(mockupFarmer);
        assert.equal(farmer.email, mockupFarmer.email);
        assert.equal(farmer.password, mockupFarmer.password);
        assert.equal(farmer.user_type, mockupFarmer.user_type);
        assert.equal(farmer.salt, mockupFarmer.salt);
    });

    it('Farmer.new - methods exists (save, update, destroy)', function() {
        var farmer = Farmer.new(mockupFarmer);
        assert.ok(farmer.save);
        assert.ok(farmer.update);
        assert.ok(farmer.destroy);
    });

    it('Farmer.new - no id', function() {
        var farmer = Farmer.new(mockupFarmer);
        assert.equal(farmer.id, undefined);
    });

    it('Farmer - save to DB, correct properties', function(done) {
        var new_farmer = Farmer.new(mockupFarmer);
        new_farmer.save(function (id) {
            assert.ok(id);
            Farmer.find(id, function (error, farmer) {
                assert.equal(error, undefined);
                assert.equal(farmer.email, mockupFarmer.email);
                assert.equal(farmer.password, mockupFarmer.password);
                assert.equal(farmer.user_type, mockupFarmer.user_type);
                assert.equal(farmer.salt, mockupFarmer.salt);
                farmer.destroy();
                done();
            });
        });
    });

    it('Farmer - delete from DB', function(done) {
        var new_farmer = Farmer.new(mockupFarmer);
        new_farmer.save(function (id) {
            assert.ok(id);
            Farmer.find(id, function (error, farmer) {
                farmer.destroy(function () {
                    Farmer.find(id, function (error, farmer2) {
                        assert.ok(error);
                        assert.equal(farmer2, undefined);
                        done();
                    });
                });
            });
        });
    });
});

describe('Security', function() {
    it('Password hashing', function() {
        assert.equal(mockupFarmer.password, encryption.digest('sgdfgdfgsd' + salt1));
    });
});

