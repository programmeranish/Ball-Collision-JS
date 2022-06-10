let environmentHeight = "400";
let environmentWidth = "600";

function toPixel(number) {
  return `${number}px`;
}
function getRandomNumber(limit) {
  return Math.floor(Math.random() * limit);
}

const body = document.body;
const environment = document.createElement("div");
environment.style.height = toPixel(environmentHeight);
environment.style.width = toPixel(environmentWidth);
environment.style.backgroundColor = "grey";
environment.style.position = "relative";
environment.style.margin = "auto";

class Ball {
  constructor(
    x = getRandomNumber(environmentWidth),
    y = getRandomNumber(environmentHeight),
    w = 50,
    h = 50,
    sx = 1,
    sy = 1,
    dx = 1,
    dy = 1,
    color
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.color = color || "red";

    this.element = document.createElement("div");
    this.element.style.width = toPixel(this.w);
    this.element.style.height = toPixel(this.h);
    this.element.style.backgroundColor = this.color;
    this.element.style.position = "absolute";
    this.element.style.borderRadius = "50%";
    this.element.style.top = toPixel(this.y);
    this.element.style.left = toPixel(this.x);
    environment.appendChild(this.element);
  }

  moveBall() {
    this.y += this.sy * this.dy;
    this.x += this.sx * this.dx;
    this.element.style.top = toPixel(this.y);
    this.element.style.left = toPixel(this.x);
  }
  boundryWallDetection() {
    if (this.x >= environmentWidth - this.w) {
      this.dx = -1;
    }
    if (this.x <= 0) {
      this.dx = 1;
    }
    if (this.y >= environmentHeight - this.h) {
      this.dy = -1;
    }
    if (this.y <= 0) {
      this.dy = 1;
    }
  }
}

const ball = new Ball();

function play() {
  window.requestAnimationFrame(() => {
    ball.moveBall();
    ball.boundryWallDetection();
    play();
  });
}
play();

body.appendChild(environment);
