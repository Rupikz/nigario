import { terminal as term, ScreenBuffer, Rect } from 'terminal-kit';
import fs from 'fs';
import {
  fillPlatforms, platformLeft, platformRight,
  health, healthPositionFirst, healthPositionSecond,
} from './platforms';
import { fillBall, ballPositionDefault } from './ball';
import {
  fillPlayingField, borderUpPosition, borderDownPosition, borderLeftPosition, borderRightPosition,
} from './field';
import config from './config';

const screen = new ScreenBuffer({ dst: term, noFill: true });
// fs.writeFileSync('error.txt', 'Начало');

let ballPosition = new Rect(ballPositionDefault);

const screenDrow = () => {
  fillPlayingField(screen);
  fillPlatforms(screen);
  fillBall(screen, ballPosition);
  screen.put({
    x: term.width / 20,
    y: term.height / 16,
    attr: { color: 22, bgColor: config.backgroundColor },
  }, 'Сердечек: ', health.playerFirst);
  screen.put({
    x: term.width - term.width / 10,
    y: term.height / 16,
    attr: { color: 22, bgColor: config.backgroundColor },
  }, 'Сердечек: ', health.playerSecond);
  screen.draw();
};

// fs.appendFileSync('error.txt', JSON.stringify(ballPosition));

// fillPlayingField(screen);
// fillPlatforms(screen);
// fillBall(screen, ballPosition);
// screen.draw();

process.stdin.setRawMode(true);
term.grabInput();
term.on('key', (name) => {
  if (name === 'w') {
    if (platformLeft.ymin >= 3) {
      platformLeft.ymin -= 2;
      platformLeft.ymax -= 2;
    }
  }
  if (name === 's') {
    if (platformLeft.ymax < term.height - 3) {
      platformLeft.ymin += 2;
      platformLeft.ymax += 2;
    }
  }

  if (name === 'UP') {
    if (platformRight.ymin >= 3) {
      platformRight.ymin -= 2;
      platformRight.ymax -= 2;
    }
  }
  if (name === 'DOWN') {
    if (platformRight.ymax < term.height - 3) {
      platformRight.ymin += 2;
      platformRight.ymax += 2;
    }
  }

  if (name === 'CTRL_C') {
    term.red('Игра окончена\n');
    process.exit();
  }

  screenDrow();
});
const randomAngle = Math.floor(Math.random() * 2) + 1;

const draw = () => {
  // fillPlayingField(screen);
  // fillPlatforms(screen);
  // fillBall(screen, ballPosition);
  // screen.draw();
  const ball = {
    direction: !Math.floor(Math.random() * 2) ? 2 : -2,
    angle: !Math.floor(Math.random() * 2) ? randomAngle : -randomAngle,
  };

  const anim = setInterval(() => {
    for (let i = 0; i <= Math.abs(ball.angle); i += 1) {
      ballPosition.xmin += ball.direction;
      ballPosition.xmax += ball.direction;

      if ((ballPosition.ymin >= platformLeft.ymin
        && ballPosition.ymin <= platformLeft.ymax
        && platformLeft.xmax + 3 > ballPosition.xmin)
      || (ballPosition.ymax >= platformRight.ymin
        && ballPosition.ymax <= platformRight.ymax
        && platformRight.xmin - 2 < ballPosition.xmax)) { // отражение левой и правой ракетки
        ball.direction = -ball.direction;
        if (ball.angle < 0) { // рандомный угол отражение
          ball.angle = -randomAngle;
        } else {
          ball.angle = randomAngle;
        }
      }
    }

    if (ballPosition.xmax > borderRightPosition.xmax
      || ballPosition.xmin < borderLeftPosition.xmin) {
      if (ballPosition.xmin < borderLeftPosition.xmin) { // левая граница
        health.playerFirst -= 1;
      }
      if (ballPosition.xmax > borderRightPosition.xmax) { // правая граница
        health.playerSecond -= 1;
      }
      ball.direction = -ball.direction;
      ballPosition = new Rect(ballPositionDefault);
      fs.appendFileSync('error.txt', JSON.stringify(health));
    }

    if (health.playerFirst <= 0 || health.playerSecond <= 0) { // конец игры
      const lostPlayer = health.playerFirst < health.playerSecond
        ? 2 : 1;
      screen.put({
        x: term.width / 2,
        y: term.height / 2.2,
        attr: { color: 22, bgColor: config.backgroundColor },
      }, 'Выйграл игрок: ', lostPlayer);
      screen.draw();
      clearInterval(anim);
      process.exit();
    }

    if (borderUpPosition.ymax + 1 >= ballPosition.ymin
        || borderDownPosition.ymin - 1 <= ballPosition.ymax) { // отражение от верха и низа
      ball.angle = -ball.angle;
    }

    ballPosition.ymin += Math.sign(ball.angle);
    ballPosition.ymax += Math.sign(ball.angle);
    screenDrow();
  }, config.speed);
};

draw();
