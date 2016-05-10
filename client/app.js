var $ = require('jquery');
jQuery = $;
var login = require('./login');
var bootstrap = require('./bootstrap');
var table_sort = require('tablesorter');

$(function(){
    login();
    bootstrap();
    $('#measurements_table').tablesorter();
});