"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.healthPositionSecond = exports.healthPositionFirst = exports.health = exports.platformRight = exports.platformLeft = exports.fillPlatforms = void 0;

var _terminalKit = require("terminal-kit");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var health = {
  playerFirst: 3,
  playerSecond: 3
};
exports.health = health;
var healthPositionFirst = {
  x: _terminalKit.terminal.width / 20,
  y: _terminalKit.terminal.height / 20,
  attr: {
    color: 24,
    bgColor: _config["default"].backgroundColor
  }
};
exports.healthPositionFirst = healthPositionFirst;
var healthPositionSecond = {
  x: _terminalKit.terminal.width - _terminalKit.terminal.width / 20,
  y: _terminalKit.terminal.height / 20,
  attr: {
    color: 24,
    bgColor: _config["default"].backgroundColor
  }
};
exports.healthPositionSecond = healthPositionSecond;
var platformColor = {
  bgColor: _config["default"].platformColor
};
var platformLeft = new _terminalKit.Rect({
  xmin: 5,
  xmax: 6,
  ymin: _terminalKit.terminal.height / 2 - _terminalKit.terminal.height / 8,
  ymax: _terminalKit.terminal.height / 2 + _terminalKit.terminal.height / 8
});
exports.platformLeft = platformLeft;
var platformRight = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width - 7,
  xmax: _terminalKit.terminal.width - 6,
  ymin: _terminalKit.terminal.height / 2 - _terminalKit.terminal.height / 8,
  ymax: _terminalKit.terminal.height / 2 + _terminalKit.terminal.height / 8
});
exports.platformRight = platformRight;

var fillPlatforms = function fillPlatforms(screen) {
  var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : platformLeft;
  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : platformRight;
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : platformColor;
  screen.fill({
    attr: color,
    region: left
  });
  screen.fill({
    attr: color,
    region: right
  });
};

exports.fillPlatforms = fillPlatforms;