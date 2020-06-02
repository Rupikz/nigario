import { terminal as term, Rect } from 'terminal-kit';
import config from './config';

const health = {
  playerFirst: 3,
  playerSecond: 3,
};

const healthPositionFirst = {
  x: term.width / 20,
  y: term.height / 20,
  attr: { color: 24, bgColor: config.backgroundColor },
};

const healthPositionSecond = {
  x: term.width - term.width / 20,
  y: term.height / 20,
  attr: { color: 24, bgColor: config.backgroundColor },
};

const platformColor = {
  bgColor: config.platformColor,
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


const fillPlatforms = (screen, left = platformLeft,
  right = platformRight, color = platformColor) => {
  screen.fill({
    attr: color,
    region: left,
  });

  screen.fill({
    attr: color,
    region: right,
  });
};

export {
  fillPlatforms, platformLeft, platformRight,
  health, healthPositionFirst, healthPositionSecond,
};
