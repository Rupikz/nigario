import { terminal as term, Rect } from 'terminal-kit';
import config from './config';

const ballColor = {
  bgColor: config.ballColor,
};

const ballPositionDefault = new Rect({
  xmin: term.width / 2,
  xmax: term.width / 2 + 1,
  ymin: term.height / 2,
  ymax: term.height / 2,
});

const fillBall = (screen, position = ballPositionDefault) => {
  screen.fill({
    attr: ballColor,
    region: position,
  });
};

export { fillBall, ballPositionDefault };
