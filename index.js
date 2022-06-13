let environmentHeight = window.innerHeight;
let environmentWidth = window.innerWidth;
let timeDelay = 2;
const colorArray = ["red", "blue", "green", "pink", "yellow", "orange"];

function toPixel(number) {
  return `${number}px`;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function centerCalculation(obj) {
  return { x: obj.x + obj.radius, y: obj.y + obj.radius };
}

function checkOverlap(obj1, obj2) {
  let radiusDistance = obj1.radius + obj2.radius;
  if (measureDistance(obj1, obj2) < radiusDistance * 0.9) {
    obj1.x += radiusDistance * 0.1;
    obj1.y += radiusDistance * 0.1;
    obj2.x -= radiusDistance * 0.1;
    obj2.y -= radiusDistance * 0.1;
  }
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
    color = "red",
    x = getRandomNumber(0, environmentWidth),
    y = getRandomNumber(0, environmentHeight),
    w = getRandomNumber(10, 40),
    h = w,
    sx = getRandomNumber(0.5, 1),
    sy = getRandomNumber(0.5, 1),
    dx = getRandomNumber(-1, 1),
    dy = getRandomNumber(-1, 1)
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
    let maxSpeed = 1;

    if (measureDistance(obj1, obj2) <= obj1.radius + obj2.radius) {
      // let distance = measureDistance(obj1, obj2);
      // let obj1Center = centerCalculation(obj1);
      // let obj2Center = centerCalculation(obj2);
      // let vCollision = {
      //   x: obj2Center.x - obj1Center.x,
      //   y: obj2Center.y - obj1Center.y,
      // };
      // let vCollisionNorm = {
      //   x: vCollision.x / distance,
      //   y: vCollision.y / distance,
      // };
      // let vRelativeVelocity = { x: obj1.sx - obj2.sx, y: obj1.sy - obj2.sy };
      // let speed =
      //   vRelativeVelocity.x * vCollisionNorm.x +
      //   vRelativeVelocity.y +
      //   vCollisionNorm.y;

      checkOverlap(obj1, obj2);

      // obj1.sx -= speed * vCollisionNorm.x;
      // obj1.sy -= speed * vCollisionNorm.y;
      // obj2.sx += speed * vCollisionNorm.x;
      // obj2.sy += speed * vCollisionNorm.y;

      // if (obj1.sx > maxSpeed) obj1.sx = maxSpeed;
      // if (obj2.sx > maxSpeed) obj2.sx = maxSpeed;
      // if (obj1.sy > maxSpeed) obj1.sy = maxSpeed;
      // if (obj2.sy > maxSpeed) obj2.sy = maxSpeed;

      if (obj1.radius > obj2.radius) {
        // checking if obejct 1 is larger than 80%
        if ((obj1.radius / (obj1.radius + obj2.radius)) * 100 > 90) {
          obj2.dx = obj1.dx;
        } else {
          let temp = obj1.dx;
          obj1.dx = obj2.dx;
          obj2.dx = temp;
          temp = obj1.dy;
          obj1.dy = obj2.dy;
          obj2.dy = temp;
        }
      } else if (obj1.radius < obj2.radius) {
        if ((obj2.radius / (obj1.radius + obj2.radius)) * 100 > 90) {
          obj1.dx = obj2.dx;
        } else {
          let temp = obj1.dx;
          obj1.dx = obj2.dx;
          obj2.dx = temp;
          temp = obj1.dy;
          obj1.dy = obj2.dy;
          obj2.dy = temp;
        }
      } else {
        let temp = obj1.dx;
        obj1.dx = obj2.dx;
        obj2.dx = temp;
        temp = obj1.dy;
        obj1.dy = obj2.dy;
        obj2.dy = temp;
      }
    }
  }
}

/* A constant variable that is used to create 10 balls. */
const BALL_NUMBER = 300;
let ballArrays = [];
for (let i = 0; i < BALL_NUMBER; i++) {
  ballArrays.push(new Ball(colorArray[i % 6]));
}

function play() {
  requestAnimationFrame(() => {
    ballArrays.forEach((ball, index) => {
      for (let i = index; i < ballArrays.length - 1; i++) {
        ball.ballCollisionCheck(ball, ballArrays[i + 1]);
      }
      ball.boundryWallDetection();
      ball.moveBall();
    });
    play();
  });
}
body.appendChild(environment);
play();
