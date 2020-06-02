"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.borderRightPosition = exports.borderLeftPosition = exports.borderDownPosition = exports.borderUpPosition = exports.fillPlayingField = void 0;

var _terminalKit = require("terminal-kit");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var backgroundColor = {
  attr: {
    bgColor: _config["default"].color.backgroundColor
  }
};
var borderUpPosition = new _terminalKit.Rect({
  xmin: 0,
  xmax: _terminalKit.terminal.width,
  ymin: 0,
  ymax: 0
});
exports.borderUpPosition = borderUpPosition;
var borderDownPosition = new _terminalKit.Rect({
  xmin: 0,
  xmax: _terminalKit.terminal.width,
  ymin: _terminalKit.terminal.height - 1,
  ymax: _terminalKit.terminal.height
});
exports.borderDownPosition = borderDownPosition;
var borderLeftPosition = new _terminalKit.Rect({
  xmin: 0,
  xmax: 1,
  ymin: 0,
  ymax: _terminalKit.terminal.height
});
exports.borderLeftPosition = borderLeftPosition;
var borderRightPosition = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width - 2,
  xmax: _terminalKit.terminal.width,
  ymin: 0,
  ymax: _terminalKit.terminal.height
});
exports.borderRightPosition = borderRightPosition;
var borderColor = {
  bgColor: _config["default"].color.borderColor
};
var borderUp = {
  attr: borderColor,
  region: borderUpPosition
};
var borderDown = {
  attr: borderColor,
  region: borderDownPosition
};
var borderLeft = {
  attr: borderColor,
  region: borderLeftPosition
};
var borderRight = {
  attr: borderColor,
  region: borderRightPosition
};

var fillPlayingField = function fillPlayingField(screen) {
  screen.fill(backgroundColor);
  screen.fill(borderUp);
  screen.fill(borderDown);
  screen.fill(borderLeft);
  screen.fill(borderRight);
};

exports.fillPlayingField = fillPlayingField;