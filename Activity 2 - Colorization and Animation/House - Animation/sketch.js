let angle = 0; // Angle controlling circular motion

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

function draw() {
  background(0);

  // Set arc center and radius (higher in sky)
  let cx = width / 2;
  let cy = height - 20; // Move sun/moon arc up
  let r = 280;

  // Sun position
  let sunX = cx + r * cos(angle);
  let sunY = cy - r * sin(angle);

  // Moon position (opposite of sun)
  let moonAngle = angle + PI;
  let moonX = cx + r * cos(moonAngle);
  let moonY = cy - r * sin(moonAngle);

  // Transition factor for sky (0 = day, 1 = night)
  let t = constrain((sunY - height / 2) / (height / 2), 0, 1);
  drawGradientSky(t);

  // Draw sun and moon
  drawSun(sunX, sunY, t);
  drawMoon(moonX, moonY, t);

  // Stars appear with moon (i.e. during night)
  if (t > 0.4) {
    drawStars(t);
  }

  drawGround();
  drawHouse(200, 270);
  drawPlant(50, 310);
  drawPlant(350, 310);

  // Increment angle for continuous circular motion
  angle += 0.005;
  if (angle > TWO_PI) {
    angle -= TWO_PI;
  }
}

function drawGradientSky(t) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let dayColor = lerpColor(color(180, 215, 250), color(230, 240, 255), inter);
    let nightColor = lerpColor(color(20, 30, 80), color(40, 50, 90), inter);
    let skyColor = lerpColor(dayColor, nightColor, t);
    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawSun(x, y, t) {
  let alpha = map(1 - t, 0, 1, 0, 255); // Brightest during day
  push();
  noStroke();

  // Sun glow
  for (let r = 90; r > 50; r -= 1.5) {
    let a = map(r, 50, 90, 0, alpha * 0.2);
    fill(255, 210, 60, a);
    ellipse(x, y, r * 2);
  }

  // Sun core
  fill(255, 230, 100, alpha);
  ellipse(x, y, 100);
  pop();
}

function drawMoon(x, y, t) {
  let alpha = map(t, 0, 1, 0, 255); // Brightest during night
  push();
  noStroke();

  fill(220, 220, 255, alpha);
  ellipse(x, y, 50);

  fill(20, 30, 80, alpha);
  ellipse(x + 10, y - 5, 45); // Crescent effect
  pop();
}

function drawStars(t) {
  let starAlpha = map(t, 0.4, 1, 0, 255);
  fill(255, starAlpha);
  noStroke();
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height * 0.6);
    ellipse(x, y, 1.5);
  }
}

function drawGround() {
  noStroke();
  fill(60, 110, 50);
  rect(0, 310, width, 100);
}

function drawHouse(cx, baseY) {
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
  for (let a = 0; a < 360; a += 45) {
    for (let r = 0; r < 12; r++) {
      let inter = map(r, 0, 11, 0, 1);
      let c = lerpColor(color(255, 182, 193), color(255, 105, 180), inter);
      fill(c);
      push();
      rotate(radians(a));
      ellipse(0, 7 - r * 0.5, 12 - r * 0.4, 24 - r);
      pop();
    }
  }

  fill(255, 220, 240);
  ellipse(0, 0, 14, 14);
  pop();
}
