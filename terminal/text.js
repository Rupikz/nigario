import { terminal as term } from 'terminal-kit';
import config from './config';

const healthPositionFirst = {
  x: term.width / 9,
  y: term.height / 10 + 2,
  attr: { color: config.color.textColor, bgColor: config.color.backgroundColor },
};

const healthPositionSecond = {
  x: term.width - term.width / 5,
  y: term.height / 10 + 2,
  attr: { color: config.color.textColor, bgColor: config.color.backgroundColor },
};

const endGamePosition = {
  x: term.width / 2.8,
  y: term.height / 2.2,
  attr: { color: 22, bgColor: config.color.backgroundColor },
};

export {
  healthPositionFirst, healthPositionSecond, endGamePosition,
};
