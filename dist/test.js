"use strict";

var term = require('terminal-kit').terminal;

var _require = require('terminal-kit'),
    Rect = _require.Rect;

var ballPositionDefault = {
  xmin: term.width / 2,
  xmax: term.width / 2 + 1,
  ymin: term.height / 2,
  ymax: term.height / 2
};
var ballPositionDefault1 = new Rect({
  xmin: term.width / 2,
  xmax: term.width / 2 + 1,
  ymin: term.height / 2,
  ymax: term.height / 2
});
var ballPosition = new Rect(ballPositionDefault);
var ballPosition1 = ballPositionDefault1;
console.log(ballPosition);
console.log(ballPosition1);
ballPosition.xmin += 33;
ballPosition.xmax += 33;
ballPosition1.xmin += 33;
ballPosition1.xmax += 33;
ballPosition = new Rect(ballPositionDefault);
ballPosition1 = ballPositionDefault1;
console.log(ballPosition);
console.log(ballPosition1);