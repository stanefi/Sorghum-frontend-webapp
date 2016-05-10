'use strict';
var db = require('../db');

class Record {
    constructor(model_name, model, additional_constrains) {
        this.model_name = model_name;
        this.model = model;
        this.attributes = Object.keys(model);
        this.constraints = additional_constrains;
    }

    create() {
        var create_table_attr = [];
        for (var i = 0; i < this.attributes.length; i++) {
            var attribute = this.attributes[i];
            var type = this.model[attribute];
            create_table_attr.push(attribute + ' ' + type);
        }
        var create_script = "CREATE TABLE " + this.model_name + " (id INTEGER PRIMARY KEY, " + create_table_attr.join(', ');
        if (this.constraints){
            create_script += ", " + this.constraints;
        }
        create_script += ")";
        db.run(create_script);
        console.log(create_script);
    }

    new(params) {
        if (!params) {
            params = {};
        }
        var new_record = {id: params['id']};
        for (var i = 0; i < this.attributes.length; i++) {
            var attribute = this.attributes[i];
            new_record[attribute] = params[attribute];
        }

        var that = this;

        new_record.save = function (completion) {
            var keys = Object.keys(this);
            var values = [];
            var attributes = [];
            for (var i = 0; i < keys.length; i++) {
                var attribute = keys[i];
                var value = this[attribute];
                if (!is_function(value)) {
                    attributes.push(attribute);
                    values.push(value);
                }
            }
            var update_string = attributes.map(function (attr) {return attr + ' = ?'}).join(', ');
            var values_string = values.map(function () {return '?'}).join(', ');
            if (this.id) {
                values.push(this.id);
                db.run('UPDATE ' + that.model_name + ' SET ' + update_string + ' WHERE id = ?', values);
            }
            else{
                db.run('INSERT INTO ' + that.model_name + ' (' + attributes.join(', ') + ') values (' + values_string + ')', values, function(error){
                    if(completion){
                        completion(this.lastID);
                        return;
                    }
                });
            }
        };

        new_record.update = function(params) {
            if(!params){
                return;
            }
            var attributes = Object.keys(params);
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];
                this[attribute] = params[attribute];
            }
        };

        new_record.destroy = function(completion) {
            if(!this.id){
                return;
            }
            db.run('DELETE FROM ' + that.model_name + ' WHERE id=?', this.id, function (error) {
                if(completion){
                    completion();
                }
            });
        };

        return new_record;
    }

    find(id, completion) {
        var that = this;
        db.get('SELECT * FROM ' + this.model_name + ' WHERE ID=?', id, function (error, params) {
            if (error) {
                completion(error);
                return;
            }
            if(!params){
                completion({});
                return;
            }
            completion(error, that.new(params));
        });
    }

    all(completion) {
        var that = this;
        db.all('SELECT * FROM ' + this.model_name, function (error, params) {
            if (error) {
                completion(error);
                return;
            }
            var records = [];
            for(var i = 0; i < params.length; i++){
                records.push(that.new(params[i]));
            }
            completion(error, records);
        })
    }

    where(query, completion) {
        if(!query){
            this.all(completion);
            return;
        }
        var that = this;
        db.all('SELECT * FROM ' + this.model_name + ' WHERE ' + query, function (error, params) {
            if (error) {
                completion(error);
                return;
            }
            var records = [];
            for(var i = 0; i < params.length; i++){
                records.push(that.new(params[i]));
            }
            completion(error, records);
        });
    }
}

function is_function(function_to_check) {
    var getType = {};
    return function_to_check && getType.toString.call(function_to_check) === '[object Function]';
}

module.exports = exports = Record;