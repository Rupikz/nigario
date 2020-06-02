"use strict";

var _terminalKit = require("terminal-kit");

var _config = _interopRequireDefault(require("./config"));

var _platforms = require("./platforms");

var _text = require("./text");

var _ball = require("./ball");

var _field = require("./field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var screen = new _terminalKit.ScreenBuffer({
  dst: _terminalKit.terminal,
  noFill: true
});
var ballPosition = new _terminalKit.Rect(_ball.ballPositionDefault);

var randomAngle = function randomAngle() {
  return Math.floor(Math.random() * 2) + 2;
};

var screenDrow = function screenDrow() {
  (0, _field.fillPlayingField)(screen);
  (0, _platforms.fillPlatforms)(screen);
  screen.put(_text.healthPositionFirst, _config["default"].text.health, _platforms.health.playerFirst, ' ');
  screen.put(_text.healthPositionSecond, _config["default"].text.health, _platforms.health.playerSecond, ' ');
  (0, _ball.fillBall)(screen, ballPosition);
  screen.draw();
};

var draw = function draw() {
  var ball = {
    direction: !Math.floor(Math.random() * 2) ? 1 : -1,
    angle: !Math.floor(Math.random() * 2) ? randomAngle() : -randomAngle()
  };
  process.stdin.setRawMode(true);

  _terminalKit.terminal.grabInput();

  _terminalKit.terminal.on('key', function (key) {
    if (key === _config["default"].key.firstPlayer.up) {
      if (_platforms.platformLeft.ymin >= 3) {
        _platforms.platformLeft.ymin -= 2;
        _platforms.platformLeft.ymax -= 2;
      }
    }

    if (key === _config["default"].key.firstPlayer.down) {
      if (_platforms.platformLeft.ymax < _terminalKit.terminal.height - 3) {
        _platforms.platformLeft.ymin += 2;
        _platforms.platformLeft.ymax += 2;
      }
    }

    if (key === _config["default"].key.playerSecond.up) {
      if (_platforms.platformRight.ymin >= 3) {
        _platforms.platformRight.ymin -= 2;
        _platforms.platformRight.ymax -= 2;
      }
    }

    if (key === _config["default"].key.playerSecond.down) {
      if (_platforms.platformRight.ymax < _terminalKit.terminal.height - 3) {
        _platforms.platformRight.ymin += 2;
        _platforms.platformRight.ymax += 2;
      }
    }

    if (key === _config["default"].key.close) {
      process.exit();
    }

    screenDrow();
  });

  setInterval(function () {
    if (_field.borderUpPosition.ymax + 1 >= ballPosition.ymin || _field.borderDownPosition.ymin - 1 <= ballPosition.ymax) {
      ball.angle = -ball.angle;
    }

    for (var i = 0; i <= Math.abs(ball.angle); i += 1) {
      ballPosition.xmin += ball.direction;
      ballPosition.xmax += ball.direction;

      if (ballPosition.ymin >= _platforms.platformLeft.ymin && ballPosition.ymin <= _platforms.platformLeft.ymax && _platforms.platformLeft.xmax + 3 > ballPosition.xmin || ballPosition.ymax >= _platforms.platformRight.ymin && ballPosition.ymax <= _platforms.platformRight.ymax && _platforms.platformRight.xmin - 2 < ballPosition.xmax) {
        ball.direction = -ball.direction;

        if (ball.angle < 0) {
          ball.angle = -randomAngle();
        } else {
          ball.angle = randomAngle();
        }
      }

      if (ballPosition.xmax >= _field.borderRightPosition.xmax || ballPosition.xmin <= _field.borderLeftPosition.xmin) {
        if (ballPosition.xmin <= _field.borderLeftPosition.xmin) {
          _platforms.health.playerFirst -= 1;
        }

        if (ballPosition.xmax >= _field.borderRightPosition.xmax) {
          _platforms.health.playerSecond -= 1;
        }

        ball.direction = -ball.direction;

        if (!Math.floor(Math.random() * 2)) {
          ball.angle = -ball.angle;
        }

        ballPosition = new _terminalKit.Rect(_ball.ballPositionDefault);
      }
    }

    if (_platforms.health.playerFirst <= 0 || _platforms.health.playerSecond <= 0) {
      var lostPlayer = _platforms.health.playerFirst < _platforms.health.playerSecond ? _config["default"].text.secondPlayer : _config["default"].text.firstPlayer;
      screen.put(_text.endGamePosition, _config["default"].text.end, lostPlayer);
      screen.draw();
      process.exit();
    }

    ballPosition.ymin += Math.sign(ball.angle);
    ballPosition.ymax += Math.sign(ball.angle);
    screenDrow();
  }, _config["default"].speed);
};

draw();