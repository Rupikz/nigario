import { terminal as term, ScreenBuffer, Rect } from 'terminal-kit';

term.red('Это моя игра\n');

const screen = new ScreenBuffer({ dst: term, noFill: true });

const backgroundColor = {
  color: 0,
  bgColor: 0,
};

const borderColor = {
  bgColor: 24,
};

const borderUp = new Rect({
  xmin: 0,
  xmax: term.width,
  ymin: 0,
  ymax: 0,
});

const borderDown = new Rect({
  xmin: 0,
  xmax: term.width,
  ymin: term.height - 1,
  ymax: term.height,
});

const borderLeft = new Rect({
  xmin: 0,
  xmax: 1,
  ymin: 0,
  ymax: term.height,
});

const borderRight = new Rect({
  xmin: term.width - 2,
  xmax: term.width,
  ymin: 0,
  ymax: term.height,
});

const platformColor = {
  bgColor: 2,
};

const platformLeft = new Rect({
  xmin: 5,
  xmax: 6,
  ymin: term.height / 2 - term.height / 8,
  ymax: term.height / 2 + term.height / 8,
});

const platformRight = new Rect({
  xmin: term.width - 7,
  xmax: term.width - 6,
  ymin: term.height / 2 - term.height / 8,
  ymax: term.height / 2 + term.height / 8,
});

const ballColor = {
  bgColor: 22,
};

const ballPositionDefault = new Rect({
  xmin: term.width / 2,
  xmax: term.width / 2 + 1,
  ymin: term.height / 2,
  ymax: term.height / 2,
});

const fillPlayers = (left = platformLeft, right = platformRight, color = platformColor) => {
  screen.fill({
    attr: color,
    region: left,
  });

  screen.fill({
    attr: color,
    region: right,
  });
};


const fillPlayingField = () => {
  screen.fill({
    attr: backgroundColor,
  });

  screen.fill({
    attr: borderColor,
    region: borderUp,
  });

  screen.fill({
    attr: borderColor,
    region: borderDown,
  });

  screen.fill({
    attr: borderColor,
    region: borderLeft,
  });

  screen.fill({
    attr: borderColor,
    region: borderRight,
  });
};

const drawBall = (position = ballPositionDefault) => {
  screen.fill({
    attr: ballColor,
    region: position,
  });
};

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

  fillPlayingField();
  fillPlayers();
  drawBall();
  screen.draw();
});

const draw = () => {
  fillPlayingField();
  fillPlayers();
  drawBall();
  screen.draw();
  const randomAngle = Math.floor(Math.random() * 3);
  const ball = {
    direction: !Math.floor(Math.random() * 2) ? 2 : -2,
    angle: !Math.floor(Math.random() * 2) ? randomAngle : -randomAngle,
  };

  const anim = setInterval(() => {
    for (let i = 0; i <= Math.abs(ball.angle); i += 1) {
      ballPositionDefault.xmin += ball.direction;
      ballPositionDefault.xmax += ball.direction;

      if ((ballPositionDefault.ymin >= platformLeft.ymin
        && ballPositionDefault.ymin <= platformLeft.ymax
        && platformLeft.xmax + 3 > ballPositionDefault.xmin)
      || (ballPositionDefault.ymax >= platformRight.ymin
        && ballPositionDefault.ymax <= platformRight.ymax
        && platformRight.xmin - 2 < ballPositionDefault.xmax)) { // отражение левой и правой ракетки
        ball.direction = -ball.direction;
      }
    }

    if (ballPositionDefault.xmin < borderLeft.xmin
      || ballPositionDefault.xmax > borderRight.xmax) {
      // term.red('Стоп игра');
      screen.put({
        x: term.width / 2, y: term.height / 2, direction: 'left', attr: { bgColor: 22 },
      }, 'Stop game');
      screen.draw();
      clearInterval(anim);
      process.exit();
    }

    if (borderUp.ymax + 1 >= ballPositionDefault.ymin
        || borderDown.ymin - 1 <= ballPositionDefault.ymax) {
      ball.angle = -ball.angle;
    }

    ballPositionDefault.ymin += Math.sign(ball.angle);
    ballPositionDefault.ymax += Math.sign(ball.angle);
    fillPlayingField();
    fillPlayers();
    drawBall();
    screen.draw();
  }, 180);
};

draw();
