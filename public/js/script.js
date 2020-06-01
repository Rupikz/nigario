import Ball from './class/Ball';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ball = new Ball();
ball.spawn();
console.log(ball);
const drawBall = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.positionX, ball.positionY, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

drawBall();
