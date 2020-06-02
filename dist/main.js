"use strict";

var _terminalKit = require("terminal-kit");

var _fs = _interopRequireDefault(require("fs"));

var _platforms = require("./platforms");

var _ball = require("./ball");

var _field = require("./field");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var screen = new _terminalKit.ScreenBuffer({
  dst: _terminalKit.terminal,
  noFill: true
});

_fs["default"].writeFileSync('error.txt', 'Начало');

var ballPosition = _ball.ballPositionDefault;
(0, _field.fillPlayingField)(screen);
(0, _platforms.fillPlatforms)(screen);
(0, _ball.fillBall)(screen);
screen.draw();
process.stdin.setRawMode(true);

_terminalKit.terminal.grabInput();

_terminalKit.terminal.on('key', function (name) {
  if (name === 'w') {
    if (_platforms.platformLeft.ymin >= 3) {
      _platforms.platformLeft.ymin -= 2;
      _platforms.platformLeft.ymax -= 2;
    }
  }

  if (name === 's') {
    if (_platforms.platformLeft.ymax < _terminalKit.terminal.height - 3) {
      _platforms.platformLeft.ymin += 2;
      _platforms.platformLeft.ymax += 2;
    }
  }

  if (name === 'UP') {
    if (_platforms.platformRight.ymin >= 3) {
      _platforms.platformRight.ymin -= 2;
      _platforms.platformRight.ymax -= 2;
    }
  }

  if (name === 'DOWN') {
    if (_platforms.platformRight.ymax < _terminalKit.terminal.height - 3) {
      _platforms.platformRight.ymin += 2;
      _platforms.platformRight.ymax += 2;
    }
  }

  if (name === 'CTRL_C') {
    _terminalKit.terminal.red('Игра окончена\n');

    process.exit();
  }

  (0, _field.fillPlayingField)(screen);
  (0, _platforms.fillPlatforms)(screen);
  (0, _ball.fillBall)(screen);
  screen.draw();
});

var draw = function draw() {
  (0, _field.fillPlayingField)(screen);
  (0, _platforms.fillPlatforms)(screen);
  (0, _ball.fillBall)(screen);
  screen.draw();
  var randomAngle = Math.floor(Math.random() * 3);
  var ball = {
    direction: !Math.floor(Math.random() * 2) ? 2 : -2,
    angle: !Math.floor(Math.random() * 2) ? randomAngle : -randomAngle
  };
  var anim = setInterval(function () {
    for (var i = 0; i <= Math.abs(ball.angle); i += 1) {
      ballPosition.xmin += ball.direction;
      ballPosition.xmax += ball.direction;

      if (ballPosition.ymin >= _platforms.platformLeft.ymin && ballPosition.ymin <= _platforms.platformLeft.ymax && _platforms.platformLeft.xmax + 3 > ballPosition.xmin || ballPosition.ymax >= _platforms.platformRight.ymin && ballPosition.ymax <= _platforms.platformRight.ymax && _platforms.platformRight.xmin - 2 < ballPosition.xmax) {
        // отражение левой и правой ракетки
        ball.direction = -ball.direction;
        var randomAngleChange = Math.abs(Math.floor(Math.random() * 3));

        if (ball.angle < 0) {
          // рандомный угол отражение
          ball.angle = -randomAngleChange;
        } else {
          ball.angle = randomAngleChange;
        }
      }
    }

    if (ballPosition.xmax > _field.borderRightPosition.xmax || ballPosition.xmin < _field.borderLeftPosition.xmin) {
      _fs["default"].appendFileSync('error.txt', JSON.stringify(_platforms.health));

      if (ballPosition.xmin < _field.borderLeftPosition.xmin) {
        // левая граница
        _platforms.health.playerFirst -= 1;
      }

      if (ballPosition.xmax > _field.borderRightPosition.xmax) {
        // правая граница
        _platforms.health.playerSecond -= 1;
      }

      console.log(ballPosition);
      ballPosition = _ball.ballPositionDefault;
      console.log(ballPosition); // fs.appendFileSync('error.txt', JSON.stringify(ballPosition));

      screen.draw();
    } // fs.appendFileSync('error.txt', JSON.stringify(health));


    if (_platforms.health.playerFirst <= 0 || _platforms.health.playerSecond <= 0) {
      // конец игры
      var lostPlayer = _platforms.health.playerFirst < _platforms.health.playerSecond ? 1 : 2;
      screen.put({
        x: _terminalKit.terminal.width / 2,
        y: _terminalKit.terminal.height / 2.2,
        attr: {
          color: 22,
          bgColor: _config["default"].backgroundColor
        }
      }, 'Выйграл игрок: ', lostPlayer);
      screen.draw();
      clearInterval(anim);
      process.exit();
    }

    if (_field.borderUpPosition.ymax + 1 >= ballPosition.ymin || _field.borderDownPosition.ymin - 1 <= ballPosition.ymax) {
      // отражение от верха и низа
      ball.angle = -ball.angle;
    }

    ballPosition.ymin += Math.sign(ball.angle);
    ballPosition.ymax += Math.sign(ball.angle);
    (0, _field.fillPlayingField)(screen);
    (0, _platforms.fillPlatforms)(screen);
    (0, _ball.fillBall)(screen);
    screen.draw();
  }, 180);
};

draw();