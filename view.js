var fs = require('fs');

// Cache templates in memory
var _templates = {};
function cacheFile(filepath) {
  var data = fs.readFileSync('templates/' + filepath, {encoding: "utf-8"});
  var key = filepath.split('.').shift();
  _templates[key] = data;
}
function cacheDirectory(dir) {
  var files = fs.readdirSync('templates/' + dir);
  files.forEach(function (file) {
    cacheFile(dir + '/' + file);
  });
}
function cacheTemplates() {
  var dirs = fs.readdirSync('templates');
  dirs.forEach(function (dir) {
    cacheDirectory(dir);
  });
}
cacheTemplates();

function partial(partialName, obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return build(partialName, item);
    }).join("");
  } else {
    return build(partialName, obj);
  }
}

function render(template, params, layout) {
  var content = {};
  content["body"] = build(template, params, content);
  if (layout == undefined) return build('layout/default', params, content);
  else if (layout) return build(layout, params, content);
  else return content["body"];
}

function build(template, params, content) {
  return _templates[template].replace(/<%(.*?)%>/g, function (match, code) {
    if (code.startsWith("=")) return eval(code.substr(1));
    eval(code);
    return "";
  });
}

module.exports = exports = {render: render, partial: partial};
