/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 179;
    this.spriteWidth = this.width * 0.5;
    this.spriteHeight = this.height * 0.5;
    this.image = new Image();
    this.image.src = "./boom.png";
    this.frame = 0;
    this.frameRate = 20;
    this.sound = new Audio();
    this.sound.src = "./sound/boom2.wav";
    this.sound.volume = 0.015;
  }

  update() {
    if (!this.frame) this.sound.play();
    if (this.frameRate++ % 10 === 0) this.frame++;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.random() * Math.PI * 2);

    ctx.drawImage(
      this.image,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      0 - this.spriteWidth * 0.5,
      0 - this.spriteHeight * 0.5,
      this.spriteWidth,
      this.spriteHeight
    );
    ctx.restore();
  }
}

function collision(e) {
  let posX = e.x - canvasPosition.x,
    posY = e.y - canvasPosition.y;

  explosions.push(new Explosion(posX, posY));
}

window.addEventListener("click", collision);
// window.addEventListener("mousemove", collision);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].draw();
    explosions[i].update();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
