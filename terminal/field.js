import { terminal as term, Rect } from 'terminal-kit';
import config from './config';

const backgroundColor = {
  attr: {
    bgColor: config.color.backgroundColor,
  },
};

const borderUpPosition = new Rect({
  xmin: 0,
  xmax: term.width,
  ymin: 0,
  ymax: 0,
});

const borderDownPosition = new Rect({
  xmin: 0,
  xmax: term.width,
  ymin: term.height - 1,
  ymax: term.height,
});

const borderLeftPosition = new Rect({
  xmin: 0,
  xmax: 1,
  ymin: 0,
  ymax: term.height,
});

const borderRightPosition = new Rect({
  xmin: term.width - 2,
  xmax: term.width,
  ymin: 0,
  ymax: term.height,
});

const borderColor = {
  bgColor: config.color.borderColor,
};

const borderUp = {
  attr: borderColor,
  region: borderUpPosition,
};

const borderDown = {
  attr: borderColor,
  region: borderDownPosition,
};

const borderLeft = {
  attr: borderColor,
  region: borderLeftPosition,
};

const borderRight = {
  attr: borderColor,
  region: borderRightPosition,
};

const fillPlayingField = (screen) => {
  screen.fill(backgroundColor);
  screen.fill(borderUp);
  screen.fill(borderDown);
  screen.fill(borderLeft);
  screen.fill(borderRight);
};

export {
  fillPlayingField, borderUpPosition, borderDownPosition, borderLeftPosition, borderRightPosition,
};
