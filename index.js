let environmentHeight = "400";
let environmentWidth = "600";
let timeDelay = 2;

function toPixel(number) {
  return `${number}px`;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const body = document.body;
const environment = document.createElement("div");
environment.style.height = toPixel(environmentHeight);
environment.style.width = toPixel(environmentWidth);
environment.style.backgroundColor = "grey";
environment.style.position = "relative";
environment.style.margin = "auto";

function measureDistance(obj1, obj2) {
  let x1 = Math.abs(obj1.x) + obj1.radius;
  let x2 = Math.abs(obj2.x) + obj2.radius;
  let y1 = Math.abs(obj1.y) + obj1.radius;
  let y2 = Math.abs(obj2.y) + obj2.radius;

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

class Ball {
  constructor(
    x = getRandomNumber(0, environmentWidth),
    y = getRandomNumber(0, environmentHeight),
    w = 200,
    h = 200,
    sx = 0.3,
    sy = 0.3,
    dx = 1,
    dy = 1,
    color = "red"
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.radius = this.w / 2;
    this.color = color;

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
    this.y += this.sy * this.dy * timeDelay;
    this.x += this.sx * this.dx * timeDelay;
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

  ballCollisionCheck(obj1, obj2) {
    console.log(measureDistance(obj1, obj2));
    if (measureDistance(obj1, obj2) <= obj1.w / 2 + obj2.w / 2) {
      let distance = measureDistance(obj1, obj2);
      console.log(
        "collision ajsdlfjlsjadlfjlsdjfljsldjflajsdlfjlsjadfjlsacolllisdfljkasldfjljsdlfjl"
      );
      let temp = obj1.dx;
      obj1.dx = obj2.dx;
      obj2.dx = temp;
      temp = obj1.dy;
      obj1.dy = obj2.dy;
      obj2.dy = temp;
      obj1.element.style.backgroundColor = "purple";
      obj2.element.style.backgroundColor = "purple";
    } else {
      obj2.element.style.backgroundColor = "red";
      obj1.element.style.backgroundColor = "red";
    }
  }
}
const BALL_NUMBER = 2;
let ballArrays = [];
for (let i = 0; i < BALL_NUMBER; i++) {
  ballArrays.push(new Ball());
}

function play() {
  requestAnimationFrame(() => {
    ballArrays.forEach((ball, index) => {
      if (ballArrays[index + 1]) {
        ball.ballCollisionCheck(ball, ballArrays[index + 1]);
      }
      ball.boundryWallDetection();
      ball.moveBall();
    });
    play();
  });
}
body.appendChild(environment);
play();
