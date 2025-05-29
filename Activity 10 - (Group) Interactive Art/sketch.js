let stars = [];
let moon;
let rocket;
let rocketLaunched = false;
let exhaustParticles = [];
let message = "Welcome to BATH SPA UNIVERSITY";
let messageParticles = [];
let exhaustSpawnInterval = 0;
let exhaustSpawnTimer = 0;

function setup() {
  // Initialize canvas, font, stars, moon, and rocket
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  textSize(36);
  noStroke();
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }
  moon = new Moon(width / 2, height / 2 - 100, 120);
  rocket = new Rocket(-300, height / 2 + 100);
}

function draw() {
  // Render background gradient, stars, moon, rocket and particle effects
  setGradient(0, 0, width, height, color(5, 5, 15), color(0, 0, 0), 'Y');
  for (let star of stars) {
    star.twinkle();
    star.show();
  }
  moon.show();
  if (rocketLaunched) {
    rocket.update();
    rocket.show();
    exhaustSpawnTimer++;
    if (exhaustSpawnTimer > exhaustSpawnInterval && exhaustParticles.length < 150) {
      exhaustParticles.push(new ExhaustParticle(rocket.x - 40, rocket.y + 10));
      exhaustSpawnTimer = 0;
    }
    for (let i = exhaustParticles.length - 1; i >= 0; i--) {
      exhaustParticles[i].update();
      exhaustParticles[i].show();
      if (
        exhaustParticles[i].x > width / 3 &&
        messageParticles.length < message.length
      ) {
        let charIndex = messageParticles.length;
        let totalWidth = textWidth(message);
        let startX = width / 2 - totalWidth / 2;
        let targetX = startX + textWidth(message.substring(0, charIndex));
        let targetY = height / 2 + 180;
        messageParticles.push(
          new MessageParticle(
            exhaustParticles[i].x,
            exhaustParticles[i].y,
            targetX,
            targetY,
            message[charIndex]
          )
        );
        exhaustParticles.splice(i, 1);
      } else if (exhaustParticles[i].lifespan < 0) {
        exhaustParticles.splice(i, 1);
      }
    }
    for (let p of messageParticles) {
      p.update();
      p.show();
    }
  }
}

function mousePressed() {
  // Launch the rocket on mouse press
  if (!rocketLaunched) {
    rocketLaunched = true;
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  // Create vertical or horizontal gradient background
  noFill();
  if (axis === 'Y') {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 2.5);
    this.baseBrightness = random(150, 230);
    this.brightness = this.baseBrightness;
    this.twinkleSpeed = random(0.02, 0.04);
    this.twinkleDir = 1;
    this.shine = random() < 0.2;
    this.shineOffset = random(TWO_PI);
  }
  twinkle() {
    // Animate twinkle brightness of stars
    this.brightness += this.twinkleSpeed * 255 * this.twinkleDir;
    if (this.brightness > 255) this.twinkleDir = -1;
    if (this.brightness < this.baseBrightness * 0.7) this.twinkleDir = 1;
    if (this.shine) {
      this.brightness += 40 * sin(frameCount * 0.05 + this.shineOffset);
      this.brightness = constrain(this.brightness, 0, 255);
    }
  }
  show() {
    // Draw star with glow effect
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(255, 255, 255, this.brightness);
    fill(255, this.brightness);
    ellipse(this.x, this.y, this.size);
    drawingContext.shadowBlur = 0;
  }
}

class Moon {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.r = radius;
  }
  show() {
    // Draw moon with radial gradient and craters
    let grad = drawingContext.createRadialGradient(
      this.x,
      this.y,
      this.r * 0.1,
      this.x,
      this.y,
      this.r
    );
    grad.addColorStop(0, '#dddddd');
    grad.addColorStop(1, '#555555');
    drawingContext.fillStyle = grad;
    ellipse(this.x, this.y, this.r * 2);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(200, 200, 220);
    fill(230);
    ellipse(this.x, this.y, this.r * 2);
    drawingContext.shadowBlur = 0;
    fill(150);
    ellipse(this.x + 35, this.y - 30, 40, 25);
    ellipse(this.x - 40, this.y + 20, 35, 20);
    ellipse(this.x + 15, this.y + 40, 20, 20);
  }
}

class Rocket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 80;
  }
  update() {
    // Move rocket horizontally across the screen
    this.x += this.speed;
  }
  show() {
    // Draw the rocket with gradient and shape
    push();
    translate(this.x, this.y);
    let ctx = drawingContext;
    let grad = ctx.createLinearGradient(-10, -15, 50, 15);
    grad.addColorStop(0, '#ff4c4c');
    grad.addColorStop(1, '#b22222');
    ctx.fillStyle = grad;
    noStroke();
    beginShape();
    vertex(-10, -15);
    vertex(40, -15);
    vertex(60, 0);
    vertex(40, 15);
    vertex(-10, 15);
    endShape(CLOSE);
    fill(255, 215, 0);
    ellipse(15, 0, 20, 20);
    pop();
  }
}

class ExhaustParticle {
  constructor(x, y) {
    this.x = x + random(-4, 4);
    this.y = y + random(-4, 4);
    this.vx = random(-16, -20);
    this.vy = random(-1, 1);
    this.lifespan = 100;
    this.size = random(8, 12);
  }
  update() {
    // Move and fade the exhaust particles
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= 12;
  }
  show() {
    // Draw glowing exhaust particles
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 140, 0, this.lifespan);
    fill(255, 140, 0, this.lifespan);
    ellipse(this.x, this.y, this.size);
    drawingContext.shadowBlur = 0;
  }
}

class MessageParticle {
  constructor(x, y, targetX, targetY, char) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.char = char;
    this.speed = 0.08;
    this.alpha = 0;
    this.floatOffset = random(TWO_PI);
    this.shineOffset = random(TWO_PI);
  }
  update() {
    // Animate the message particles moving to target positions and fading in
    this.x += (this.targetX - this.x) * this.speed;
    this.y += (this.targetY - this.y) * this.speed;
    this.alpha += 12;
    this.alpha = constrain(this.alpha, 0, 255);
  }
  show() {
    // Display each character with floating and glowing effect
    push();
    translate(this.x, this.y);
    let floatY = sin(frameCount * 0.05 + this.floatOffset) * 5;
    let scaleAmt = 1 + sin(frameCount * 0.1 + this.floatOffset) * 0.05;
    let shineAlpha = 150 + 105 * sin(frameCount * 0.15 + this.shineOffset);
    scale(scaleAmt);
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 255, 255, shineAlpha);
    fill(255, this.alpha);
    noStroke();
    textSize(36);
    text(this.char, 0, floatY);
    drawingContext.shadowBlur = 0;
    pop();
  }
}

function windowResized() {
  // Resize canvas on window resize
  resizeCanvas(windowWidth, windowHeight);
}
