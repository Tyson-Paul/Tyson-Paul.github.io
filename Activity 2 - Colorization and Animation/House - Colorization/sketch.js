function setup() {
  createCanvas(400, 400);
  noLoop(); // Stop looping after initial draw
}

function draw() {
  drawGradientSky(); // Draw background sky gradient
  drawSun(320, 40, 50); // Draw sun with glow effect
  drawGround(); // Draw the grassy ground area
  drawHouse(200, 270); // Draw main house structure
  drawPlant(50, 310); // Draw plant on left
  drawPlant(350, 310); // Draw plant on right
}

function drawGradientSky() {
  // Render vertical sky gradient from top to bottom
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(180, 215, 250), color(230, 240, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawSun(x, y, radius) {
  // Draw sun with soft radial glow
  push();
  noStroke();
  for (let r = radius * 1.8; r > radius; r -= 1.5) {
    let alpha = map(r, radius, radius * 1.8, 0, 40);
    fill(255, 210, 60, alpha);
    ellipse(x, y, r * 2);
  }
  fill(255, 230, 100);
  ellipse(x, y, radius * 2);
  pop();
}

function drawGround() {
  // Draw green ground rectangle at bottom
  noStroke();
  fill(60, 110, 50);
  rect(0, 310, width, 100);
}

function drawHouse(cx, baseY) {
  // Draw house with gradient walls, roof, windows, and door
  push();
  rectMode(CENTER);
  for (let i = 0; i < 110; i++) {
    let inter = map(i, 0, 110, 0, 1);
    let c = lerpColor(color(110, 0, 0), color(150, 20, 20), inter);
    stroke(c);
    line(cx - 90, baseY - 55 + i, cx + 90, baseY - 55 + i);
  }
  for (let y = 0; y < 65; y++) {
    let inter = map(y, 0, 65, 0, 1);
    let c = lerpColor(color(80, 50, 20), color(120, 70, 30), inter);
    stroke(c);
    let x1 = cx - 90 + (y * (90 / 65));
    let x2 = cx + 90 - (y * (90 / 65));
    line(x1, baseY - 55 - y, x2, baseY - 55 - y);
  }
  fill(70, 40, 10);
  stroke(50, 30, 10);
  strokeWeight(2);
  rect(cx, baseY + 20, 50, 60, 8);
  noStroke();
  fill(220, 180, 30);
  ellipse(cx + 15, baseY + 30, 10);
  fill(210, 230, 255, 210);
  stroke(110);
  strokeWeight(2);
  rect(cx - 60, baseY - 10, 50, 50, 8);
  rect(cx + 60, baseY - 10, 50, 50, 8);
  stroke(140);
  strokeWeight(1.5);
  line(cx - 60, baseY - 35, cx - 60, baseY + 15);
  line(cx - 85, baseY - 10, cx - 35, baseY - 10);
  line(cx + 60, baseY - 35, cx + 60, baseY + 15);
  line(cx + 35, baseY - 10, cx + 85, baseY - 10);
  pop();
}

function drawPlant(cx, baseY) {
  // Draw plant with stem, leaves, and flower
  push();
  noStroke();
  fill(34, 139, 34);
  rect(cx, baseY - 25, 4, 30, 1);
  fill(28, 120, 30);
  ellipse(cx - 15, baseY - 25, 32, 22);
  ellipse(cx + 15, baseY - 25, 32, 22);
  fill(34, 139, 34);
  ellipse(cx - 15, baseY - 27, 28, 18);
  ellipse(cx + 15, baseY - 27, 28, 18);
  translate(cx, baseY - 45);
  noStroke();
  for (let angle = 0; angle < 360; angle += 45) {
    for (let r = 0; r < 12; r++) {
      let inter = map(r, 0, 11, 0, 1);
      let c = lerpColor(color(255, 182, 193), color(255, 105, 180), inter);
      fill(c);
      push();
      rotate(radians(angle));
      ellipse(0, 7 - r * 0.5, 12 - r * 0.4, 24 - r);
      pop();
    }
  }
  fill(255, 220, 240);
  ellipse(0, 0, 14, 14);
  pop();
}
