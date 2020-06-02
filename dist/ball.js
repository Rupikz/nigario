"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ballPositionDefault = exports.fillBall = void 0;

var _terminalKit = require("terminal-kit");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ballColor = {
  bgColor: _config["default"].color.ballColor
};
var ballPositionDefault = {
  xmin: _terminalKit.terminal.width / 2,
  xmax: _terminalKit.terminal.width / 2 + 1,
  ymin: _terminalKit.terminal.height / 2,
  ymax: _terminalKit.terminal.height / 2
};
exports.ballPositionDefault = ballPositionDefault;
var ballPositionFill = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width / 2,
  xmax: _terminalKit.terminal.width / 2 + 1,
  ymin: _terminalKit.terminal.height / 2,
  ymax: _terminalKit.terminal.height / 2
});

var fillBall = function fillBall(screen) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ballPositionFill;
  screen.fill({
    attr: ballColor,
    region: position
  });
};

exports.fillBall = fillBall;