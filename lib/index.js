var util = require('util'),
    fs = require('fs'),
    events = require('events');

function Flesh (file, encode) {
  this.file = file;
  this.encode = encode;

  events.EventEmitter.call(this);

  fs.watch(file, {persistent: true}, function (event, filename) {
    this.emit(event, filename);
  }.bind(this));

  this.on('change', this.loadFile.bind(this));

  this.loadFile();
}

util.inherits(Flesh, events.EventEmitter);

Flesh.prototype.loadFile = function () {
  fs.readFile(this.file, this.encode, function (err, data) {
    if (err === null) {
      this.emit('load', data);
    } else {
      this.emit('error', err);
    }
  }.bind(this));
};

module.exports = Flesh;