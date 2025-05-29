let shapes = [];
let cols, rows;
let w, h;
let shapeHue;

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(RADIANS);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateGrid();
  shapeHue = pickNonPinkHue();
  createShapes();
}

function calculateGrid() {
  cols = floor(width / 80);
  rows = floor(height / 80);
  w = width / cols;
  h = height / rows;
}

function pickNonPinkHue() {
  return random(20, 290); // Avoid pink/red
}

function createShapes() {
  shapes = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;

      let r = random();
      let type = r < 0.4 ? 'triangle' : r < 0.7 ? 'hexagon' : 'square';

      let hueOffset = random(-30, 30);
      let hCol = (shapeHue + hueOffset + 360) % 360;
      let shapeColor = color(hCol, random(60, 100), random(60, 100), 90);

      let sizeFactor = random(0.8, 1.1);
      let shapeW = w * sizeFactor * 0.7;
      let shapeH = h * sizeFactor * 0.7;

      let rotateDir = random([1, -1]); // clockwise or counterclockwise

      shapes.push(new Shape(x, y, shapeW, shapeH, type, shapeColor, rotateDir));
    }
  }
}

function draw() {
  drawSmoothGradientBackground();
  for (let s of shapes) {
    s.update();
    s.display();
  }
}

function drawSmoothGradientBackground() {
  let bgHue = (shapeHue + 180) % 360;
  let top = color(bgHue, 60, 20);
  let bottom = color(bgHue, 30, 5);

  let ctx = drawingContext;
  let gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, top.toString());
  gradient.addColorStop(1, bottom.toString());

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

class Shape {
  constructor(x, y, w, h, type, baseColor, rotateDir = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.baseColor = baseColor;
    this.animOffset = random(1000);
    this.rotateDir = rotateDir;
  }

  update() {
    this.hovered = dist(mouseX, mouseY, this.x, this.y) < min(this.w, this.h) / 1.5;
  }

  display() {
    let c = this.hovered ? color(0, 0, 100) : this.baseColor;
    fill(c);
    push();
    translate(this.x, this.y);

    if (this.type === 'triangle') {
      let rot = this.rotateDir * (frameCount * 0.02 + this.animOffset * 0.001);
      rotate(rot);
      this.drawTriangle();
    } else if (this.type === 'square') {
      let bounce = sin(frameCount * 0.07 + this.animOffset) * 4;
      translate(0, bounce);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    } else if (this.type === 'hexagon') {
      let rot = sin(frameCount * 0.03 + this.animOffset) * 0.2;
      rotate(rot);
      this.drawHexagon();
    }

    pop();
  }

  drawTriangle() {
    beginShape();
    vertex(0, -this.h / 2);
    vertex(-this.w / 2, this.h / 2);
    vertex(this.w / 2, this.h / 2);
    endShape(CLOSE);
  }

  drawHexagon() {
    let radius = min(this.w, this.h) / 2;
    let angle = TWO_PI / 6;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = cos(a) * radius;
      let sy = sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

function mousePressed() {
  shapeHue = pickNonPinkHue();
  createShapes();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateGrid();
  createShapes();
}
