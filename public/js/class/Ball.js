class Ball {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
    this.size = 10;
    this.cleavage = 1;
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  spawn() {
    this.positionX = Math.random() * (1024 - 768) + 768;
    this.positionY = Math.random() * (1024 - 768) + 768;
  }
}

export default Ball;
