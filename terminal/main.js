import { terminal as term, ScreenBuffer, Rect } from 'terminal-kit';
import config from './config';
import {
  fillPlatforms,
  platformLeft,
  platformRight,
  health,
} from './platforms';
import {
  healthPositionFirst,
  healthPositionSecond,
  endGamePosition,
} from './text';
import {
  fillBall,
  ballPositionDefault,
} from './ball';
import {
  fillPlayingField,
  borderUpPosition,
  borderDownPosition,
  borderLeftPosition,
  borderRightPosition,
} from './field';

const screen = new ScreenBuffer({ dst: term, noFill: true });
let ballPosition = new Rect(ballPositionDefault);
const randomAngle = () => Math.floor(Math.random() * 2) + 2;

const screenDrow = () => {
  fillPlayingField(screen);
  fillPlatforms(screen);
  screen.put(healthPositionFirst, config.text.health, health.playerFirst, ' ');
  screen.put(healthPositionSecond, config.text.health, health.playerSecond, ' ');
  fillBall(screen, ballPosition);
  screen.draw();
};

const draw = () => {
  const ball = {
    direction: !Math.floor(Math.random() * 2) ? 1 : -1,
    angle: !Math.floor(Math.random() * 2) ? randomAngle() : -randomAngle(),
  };

  process.stdin.setRawMode(true);
  term.grabInput();
  term.on('key', (key) => {
    if (key === config.key.firstPlayer.up) {
      if (platformLeft.ymin >= 3) {
        platformLeft.ymin -= 2;
        platformLeft.ymax -= 2;
      }
    }
    if (key === config.key.firstPlayer.down) {
      if (platformLeft.ymax < term.height - 3) {
        platformLeft.ymin += 2;
        platformLeft.ymax += 2;
      }
    }
    if (key === config.key.playerSecond.up) {
      if (platformRight.ymin >= 3) {
        platformRight.ymin -= 2;
        platformRight.ymax -= 2;
      }
    }
    if (key === config.key.playerSecond.down) {
      if (platformRight.ymax < term.height - 3) {
        platformRight.ymin += 2;
        platformRight.ymax += 2;
      }
    }
    if (key === config.key.close) {
      process.exit();
    }
    screenDrow();
  });

  setInterval(() => {
    if (borderUpPosition.ymax + 1 >= ballPosition.ymin
      || borderDownPosition.ymin - 1 <= ballPosition.ymax) {
      ball.angle = -ball.angle;
    }

    for (let i = 0; i <= Math.abs(ball.angle); i += 1) {
      ballPosition.xmin += ball.direction;
      ballPosition.xmax += ball.direction;

      if ((ballPosition.ymin >= platformLeft.ymin
        && ballPosition.ymin <= platformLeft.ymax
        && platformLeft.xmax + 3 > ballPosition.xmin)
      || (ballPosition.ymax >= platformRight.ymin
        && ballPosition.ymax <= platformRight.ymax
        && platformRight.xmin - 2 < ballPosition.xmax)) {
        ball.direction = -ball.direction;
        if (ball.angle < 0) {
          ball.angle = -randomAngle();
        } else {
          ball.angle = randomAngle();
        }
      }

      if (ballPosition.xmax >= borderRightPosition.xmax
        || ballPosition.xmin <= borderLeftPosition.xmin) {
        if (ballPosition.xmin <= borderLeftPosition.xmin) {
          health.playerFirst -= 1;
        }
        if (ballPosition.xmax >= borderRightPosition.xmax) {
          health.playerSecond -= 1;
        }
        ball.direction = -ball.direction;
        if (!Math.floor(Math.random() * 2)) {
          ball.angle = -ball.angle;
        }
        ballPosition = new Rect(ballPositionDefault);
      }
    }

    if (health.playerFirst <= 0 || health.playerSecond <= 0) {
      const lostPlayer = health.playerFirst < health.playerSecond
        ? config.text.secondPlayer : config.text.firstPlayer;
      screen.put(endGamePosition, config.text.end, lostPlayer);
      screen.draw();
      process.exit();
    }

    ballPosition.ymin += Math.sign(ball.angle);
    ballPosition.ymax += Math.sign(ball.angle);
    screenDrow();
  }, config.speed);
};

draw();
