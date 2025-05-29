let skinColor;
let eyeColor;
let eyeSize;
let armAngle;
let antennaLength;

function setup() {
  createCanvas(500, 700);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  randomizeAlien();
}

function draw() {
  drawGradientBackground();

  push();
  let bobbing = sin(frameCount * 0.05) * 5; // body bobbing animation
  translate(0, bobbing);
  drawAlien();
  pop();
}

function randomizeAlien() {
  skinColor = color(random(360), 80, 100);
  eyeColor = color(random(360), 100, 100);
  eyeSize = random(30, 50);
  armAngle = random(PI / 6, PI / 3);
  antennaLength = random(60, 100);
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 200, 240);
    stroke(inter, 30, 95);
    line(0, y, width, y);
  }
  noStroke();
}

function drawAlien() {
  push();
  translate(width / 2, height / 2 + 100); // centered in canvas
  drawLegs();
  drawBody();
  drawArms();
  drawHead();
  drawEyes();
  drawMouth();
  drawAntennae();
  pop();
}

function drawBody() {
  fill(skinColor);
  beginShape();
  vertex(-90, -120);
  bezierVertex(-150, 100, 150, 100, 90, -120);
  bezierVertex(110, -250, -110, -250, -90, -120);
  endShape(CLOSE);
}

function drawHead() {
  push();
  translate(0, -220);
  fill(skinColor);
  beginShape();
  vertex(-70, -40);
  bezierVertex(-100, 40, 100, 40, 70, -40);
  bezierVertex(60, -110, -60, -110, -70, -40);
  endShape(CLOSE);
  pop();
}

function drawEyes() {
  push();
  translate(0, -270);
  fill(eyeColor);
  let blink = map(sin(frameCount * 0.2), -1, 1, 1, 0.2); // blinking animation
  ellipse(-30, 0, eyeSize, eyeSize * blink);
  ellipse(30, 0, eyeSize, eyeSize * blink);
  fill(0);
  ellipse(-30, 0, eyeSize / 3, (eyeSize / 3) * blink);
  ellipse(30, 0, eyeSize / 3, (eyeSize / 3) * blink);
  pop();
}

function drawMouth() {
  push();
  translate(0, -230);
  fill(0, 0, 20);
  ellipse(0, 20, 40, 10);
  pop();
}

function drawArms() {
  fill(skinColor);
  push();
  // Left arm
  push();
  translate(-85, -120);
  rotate(sin(frameCount * 0.1) * armAngle);
  rect(0, 0, 30, 120, 20); // thicker & longer
  pop();
  // Right arm
  push();
  translate(85, -120);
  rotate(-sin(frameCount * 0.1) * armAngle);
  rect(-30, 0, 30, 120, 20); // thicker & longer
  pop();
  pop();
}

function drawLegs() {
  fill(skinColor);
  let offsetY = -40;

  // Left leg
  beginShape();
  vertex(-40, 60 + offsetY);
  bezierVertex(-60, 120 + offsetY, -60, 170 + offsetY, -30, 200 + offsetY);
  bezierVertex(-10, 210 + offsetY, 0, 180 + offsetY, -10, 140 + offsetY);
  bezierVertex(-20, 110 + offsetY, -30, 90 + offsetY, -40, 80 + offsetY);
  endShape(CLOSE);

  // Right leg
  beginShape();
  vertex(40, 60 + offsetY);
  bezierVertex(60, 120 + offsetY, 60, 170 + offsetY, 30, 200 + offsetY);
  bezierVertex(10, 210 + offsetY, 0, 180 + offsetY, 10, 140 + offsetY);
  bezierVertex(20, 110 + offsetY, 30, 90 + offsetY, 40, 80 + offsetY);
  endShape(CLOSE);
}

function drawAntennae() {
  push();
  translate(0, -310);

  stroke(0);
  strokeWeight(3);
  noFill();

  let sway = sin(frameCount * 0.1) * 10;

  // Left antenna
  push();
  translate(-25, 0);
  beginShape();
  for (let t = 0; t < 10; t++) {
    let x = sin(t * 0.5 + sway * 0.05) * 5;
    let y = -t * 10;
    vertex(x, y);
  }
  endShape();
  let glowY = -10 * 9;
  noStroke();
  fill(eyeColor);
  ellipse(0, glowY, 16, 16);
  fill(eyeColor);
  ellipse(0, glowY, 30 + sin(frameCount * 0.1) * 5, 30 + sin(frameCount * 0.1) * 5);
  pop();

  // Right antenna
  push();
  translate(25, 0);
  beginShape();
  for (let t = 0; t < 10; t++) {
    let x = -sin(t * 0.5 + sway * 0.05) * 5;
    let y = -t * 10;
    vertex(x, y);
  }
  endShape();
  let glowY2 = -10 * 9;
  noStroke();
  fill(eyeColor);
  ellipse(0, glowY2, 16, 16);
  fill(eyeColor);
  ellipse(0, glowY2, 30 + sin(frameCount * 0.1) * 5, 30 + sin(frameCount * 0.1) * 5);
  pop();

  pop();
}

function mousePressed() {
  randomizeAlien();
}
