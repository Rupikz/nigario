"use strict";

var _terminalKit = require("terminal-kit");

var _process = _interopRequireDefault(require("process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_terminalKit.terminal.red('Это моя игра\n');

var screen = new _terminalKit.ScreenBuffer({
  dst: _terminalKit.terminal,
  noFill: true
}); // process.stdin.setRawMode(true);

var backgroundColor = {
  color: 0,
  bgColor: 0
};
var borderColor = {
  bgColor: 24
};
var borderUp = new _terminalKit.Rect({
  xmin: 0,
  xmax: _terminalKit.terminal.width,
  ymin: 0,
  ymax: 0
});
var borderDown = new _terminalKit.Rect({
  xmin: 0,
  xmax: _terminalKit.terminal.width,
  ymin: _terminalKit.terminal.height - 1,
  ymax: _terminalKit.terminal.height
});
var borderLeft = new _terminalKit.Rect({
  xmin: 0,
  xmax: 1,
  ymin: 0,
  ymax: _terminalKit.terminal.height
});
var borderRight = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width - 2,
  xmax: _terminalKit.terminal.width,
  ymin: 0,
  ymax: _terminalKit.terminal.height
});
var platformColor = {
  bgColor: 2
};
var platformLeft = new _terminalKit.Rect({
  xmin: 5,
  xmax: 6,
  ymin: _terminalKit.terminal.height / 2 - _terminalKit.terminal.height / 8,
  ymax: _terminalKit.terminal.height / 2 + _terminalKit.terminal.height / 8
});
var platformRight = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width - 7,
  xmax: _terminalKit.terminal.width - 6,
  ymin: _terminalKit.terminal.height / 2 - _terminalKit.terminal.height / 8,
  ymax: _terminalKit.terminal.height / 2 + _terminalKit.terminal.height / 8
});
var ballColor = {
  bgColor: 22
};
var ballPositionDefault = new _terminalKit.Rect({
  xmin: _terminalKit.terminal.width / 2,
  xmax: _terminalKit.terminal.width / 2 + 1,
  ymin: _terminalKit.terminal.height / 2,
  ymax: _terminalKit.terminal.height / 2
});

var fillPlayers = function fillPlayers() {
  var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : platformLeft;
  var right = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : platformRight;
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : platformColor;
  screen.fill({
    attr: color,
    region: left
  });
  screen.fill({
    attr: color,
    region: right
  });
};

var fillPlayingField = function fillPlayingField() {
  screen.fill({
    attr: backgroundColor
  });
  screen.fill({
    attr: borderColor,
    region: borderUp
  });
  screen.fill({
    attr: borderColor,
    region: borderDown
  });
  screen.fill({
    attr: borderColor,
    region: borderLeft
  });
  screen.fill({
    attr: borderColor,
    region: borderRight
  });
};

var drawBall = function drawBall() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ballPositionDefault;
  screen.fill({
    attr: ballColor,
    region: position
  });
};

var draw = function draw() {
  fillPlayingField();
  fillPlayers();
  drawBall();
  screen.draw(); // term.grabInput();
  // term.on('key', (name, matches, data) => {
  //   console.log(name);
  //   if (name === 'w') {
  //     if (platformLeft.ymin >= 3) {
  //       platformLeft.ymin -= 2;
  //       platformLeft.ymax -= 2;
  //     }
  //   }
  //   if (name === 's') {
  //     if (platformLeft.ymax < term.height - 3) {
  //       platformLeft.ymin += 2;
  //       platformLeft.ymax += 2;
  //     }
  //   }
  //   if (name === 'UP') {
  //     if (platformRight.ymin >= 3) {
  //       platformRight.ymin -= 2;
  //       platformRight.ymax -= 2;
  //     }
  //   }
  //   if (name === 'DOWN') {
  //     if (platformRight.ymax < term.height - 3) {
  //       platformRight.ymin += 2;
  //       platformRight.ymax += 2;
  //     }
  //   }
  //   fillPlayingField();
  //   fillPlayers();
  //   screen.draw();
  //   if (name === 'CTRL_C') {
  //     term.red('Игра окончена\n');
  //     process.exit();
  //   }
  // });
};

draw();