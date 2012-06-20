var fs = require('fs');

var filename = __dirname + '/flesh-tmp.txt';

fs.writeFileSync(filename, 'hoge', 'utf8');

var Flesh = require('../');

var watcher = new Flesh(filename, 'utf8');
watcher.on('load', function (data) {
  console.log(data);
});

setTimeout(function () {
  fs.writeFileSync(filename, 'hsaasas', 'utf8');
}, 1000);

setTimeout(function () {
  fs.writeFileSync(filename, 'aggsadga', 'utf8');
}, 2000);