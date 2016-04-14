"use strict";
var view = require('../view');
var formidable = require('formidable');
var User = require('../models/app_model').farmer;
var encryption = require('../encryption');

class CommentsController {
    index(req, res){
        if (!users_controller.admin_only(req, res)) return;
        User.all(function (error, users) {
            if(error){
                users_controller.render_error(res);
                return;
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(view.render('farmers/index', {users: users}));
        });
    }

    create(req, res, params) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var new_user = User.new(fields);
            new_user.user_type = "editor";
            var salt = encryption.salt();
            new_user.password = encryption.digest(new_user.password + salt);
            new_user.salt = salt;
            new_user.user_type = "editor";
            new_user.save(function(id){
                req.session.user_id = id;
                res.redirect("/measurements");
            });
        });
    }

    signup(req, res){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(view.render('farmers/signup', {}));
    }

    ban(req, res, params) {
        if (!users_controller.admin_only(req, res)) return;
        User.find(params.id, function (error, user) {
            if (error) {
                users_controller.render_error(res);
                return;
            }
            if(user.user_type != "admin") {
                user.user_type = "banned";
                user.save();
            }
            res.redirect('/farmers');
        });
    }

    loadUser(req, res, next) {
        if(req.session && req.session.user_id) {
            User.find(req.session.user_id, function(error, user){
                if(error) {
                    return res.sendStatus(500);
                }
                req.farmer = user;
                return next();
            });
        }
        else {
            req.farmer = {username: "Guest", user_type: "guest"};
            next();
        }
    }

    render_error(res){
        res.writeHead(400, {"Content-Type":"text/html"});
        res.end("<h1>Resource Not Found</h1>");
    }
    redirect(req, res, post_id) {
        res.redirect("/measurements/" + post_id);
    }

    admin_only(req, res){
        if(req.farmer && req.farmer.user_type == "admin") {
            return true;
        }
        res.writeHead(403, {"Content-Type":"text/html"});
        res.end("<h1>Forbidden</h1>");
        return false;
    }

}

var users_controller = new CommentsController();

module.exports = exports = users_controller;
