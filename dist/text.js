"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endGamePosition = exports.healthPositionSecond = exports.healthPositionFirst = void 0;

var _terminalKit = require("terminal-kit");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var healthPositionFirst = {
  x: _terminalKit.terminal.width / 9,
  y: _terminalKit.terminal.height / 10 + 2,
  attr: {
    color: _config["default"].color.textColor,
    bgColor: _config["default"].color.backgroundColor
  }
};
exports.healthPositionFirst = healthPositionFirst;
var healthPositionSecond = {
  x: _terminalKit.terminal.width - _terminalKit.terminal.width / 5,
  y: _terminalKit.terminal.height / 10 + 2,
  attr: {
    color: _config["default"].color.textColor,
    bgColor: _config["default"].color.backgroundColor
  }
};
exports.healthPositionSecond = healthPositionSecond;
var endGamePosition = {
  x: _terminalKit.terminal.width / 2.8,
  y: _terminalKit.terminal.height / 2.2,
  attr: {
    color: 22,
    bgColor: _config["default"].color.backgroundColor
  }
};
exports.endGamePosition = endGamePosition;