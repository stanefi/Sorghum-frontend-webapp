var $ = require('jquery');
var login = require('./login');
var bootstrap = require('./bootstrap');

$(function(){
    var comment_form = $('form#new-comment-form');
    if(comment_form){
        comment_form.submit(function(event){
            event.preventDefault();
            submit_comment_form(comment_form);
        });
    }
    var snippet_widget = $('form#snippet-widget');
    if(snippet_widget){
        snippet_widget.on('click', function(event) {
            event.preventDefault();
            add_snippet(snippet_widget);
        });
    }
    var show_widget = $('button#show-widget');
    if(show_widget){
        show_widget.on('click', function(event) {
            event.preventDefault();
            $('div#snipped-widget-container').toggle();
            get_code_snippets();
        });
    }
    var load_code = $('button#load-code-button');
    if(load_code){
        load_code.on('click', function(event) {
            event.preventDefault();
            var code_area = $('textarea#code');
            code_area.val(code_area.val() + '\n' + get_code_snippets());
        });
    }
    login();
    bootstrap();
});

function submit_comment_form(form){
    var url = form.attr("action");
    var form_data = {};
    $(form).find("input[name]").each(function (index, node) {
        form_data[node.name] = node.value;
        node.value = "";
    });
    if(!form_data.title || form_data.title == "") {
        return
    }
    $.post(url, form_data).done(function (html_comment) {
        console.log(html_comment);
        $('table#farmers-table').append(html_comment);
    });
}



function add_snippet(snippet_form){
    var language = "";
    $(snippet_form).find("input[name]").each(function (index, node) {
        language = node.value;
        node.value = "";
    });
    var code_field = $('textarea#code');
    var code = code_field.val();
    if(language == "" || !code || code == ""){
        return;
    }
    var snippet = '\n<pre>\n' +
                  '  <code class="' + language + '">\n' +
                  '    ' + code + "\n" +
                  '  </code>\n' +
                  '</pre>\n';
    code_field.val("");

    var content_field = $('textarea#post-content');
    var cursor_position = content_field.prop('selectionStart');
    var content = content_field.val();

    var text_before = content.substring(0,  cursor_position);
    var text_after  = content.substring(cursor_position, content.length);

    content_field.val(text_before + snippet + text_after);

    $('div#snipped-widget-container').toggle();
}

function get_code_snippets(){
    return $('<div>' + $('textarea#post-content').val() + '</div>').find('pre code').text();
}