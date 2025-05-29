let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let temperatures = [19.5, 20.5, 23.5, 27.5, 31.5, 33.5, 35.5, 36.5, 33.5, 29.5, 25.5, 21.5];
let colors = [];
let animatedTemps = Array(12).fill(0);
let maxTemp = 40;
let animationSpeed = 0.2;
let waveOffset = 0;
let lastResetTime = 0;
let bgParticles = [];

function setup() {
  // Setup canvas, color mapping for months, and initialize background particles
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  for (let i = 0; i < months.length; i++) {
    colors[i] = color(
      map(i, 0, months.length, 120, 255),
      100 + (i * 10) % 155,
      255 - (i * 15) % 255,
      180
    );
  }

  for (let i = 0; i < 100; i++) {
    bgParticles.push({
      x: random(width),
      y: random(height),
      r: random(1, 3),
      dx: random(-0.5, 0.5),
      dy: random(-0.5, 0.5)
    });
  }

  lastResetTime = millis();
}

function draw() {
  // Main animation loop for visualizing temperature graph and interactions
  drawMovingBackground();
  drawTitle();
  drawAxes();
  animateGraph();
  drawStackedArea();
  drawLabels();
  drawHoverEffect();

  waveOffset += 0.03;

  if (millis() - lastResetTime > 7000) {
    animatedTemps = Array(12).fill(0);
    lastResetTime = millis();
  }
}

function drawMovingBackground() {
  // Creates animated star-like particles in the background
  background(15, 15, 25);

  noStroke();
  fill(255, 255, 255, 10);
  for (let p of bgParticles) {
    ellipse(p.x, p.y, p.r * 2);
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
}

function drawTitle() {
  // Displays chart title and animated subtitle with source reference
  textAlign(CENTER, TOP);
  fill(255);
  textSize(28);
  text("UAE Monthly Average Temperatures", width / 2, 40);

  push();
  fill(150, 200, 255);
  textSize(20);
  let waveY = 80 + sin(waveOffset) * 5;
  text("2003–2017", width / 2, waveY);
  pop();

  fill(180);
  textSize(14);
  text("Data Source: opendata.fcsc.gov.ae", width / 2, 110);
}

function drawAxes() {
  // Draws X and Y axes with labeled temperature ticks
  stroke(180);
  strokeWeight(1);
  let baseY = height - 120;
  let topY = 140;
  line(80, baseY, width - 100, baseY);
  line(80, topY, 80, baseY);

  for (let t = 10; t <= maxTemp; t += 5) {
    let y = map(t, 0, maxTemp, baseY, topY);
    stroke(60);
    line(80, y, width - 100, y);
    noStroke();
    fill(200);
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(t + "°C", 75, y);
  }
}

function animateGraph() {
  // Increments animated temperature values smoothly towards actual data
  for (let i = 0; i < temperatures.length; i++) {
    if (animatedTemps[i] < temperatures[i]) {
      animatedTemps[i] += animationSpeed;
      if (animatedTemps[i] > temperatures[i]) {
        animatedTemps[i] = temperatures[i];
      }
    }
  }
}

function drawStackedArea() {
  // Draws stacked area temperature graph with animated segments
  let graphStartX = 80;
  let graphEndX = width - 100;
  let baseY = height - 120;
  let topY = 140;

  for (let i = 0; i < months.length; i++) {
    let x = map(i, 0, months.length - 1, graphStartX, graphEndX);
    let y = map(animatedTemps[i], 0, maxTemp, baseY, topY);
    if (i > 0) {
      let prevX = map(i - 1, 0, months.length - 1, graphStartX, graphEndX);
      let prevY = map(animatedTemps[i - 1], 0, maxTemp, baseY, topY);

      fill(colors[i]);
      stroke(colors[i]);
      strokeWeight(1);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = colors[i];
      beginShape();
      vertex(prevX, baseY);
      vertex(prevX, prevY);
      vertex(x, y);
      vertex(x, baseY);
      endShape(CLOSE);
      drawingContext.shadowBlur = 0;
    }
  }
}

function drawLabels() {
  // Draws month labels along the X-axis
  let graphStartX = 80;
  let graphEndX = width - 100;
  let baseY = height - 110;

  for (let i = 0; i < months.length; i++) {
    let x = map(i, 0, months.length - 1, graphStartX, graphEndX);
    fill(220);
    textSize(13);
    textAlign(CENTER, TOP);
    text(months[i], x, baseY);
  }
}

function drawHoverEffect() {
  // Highlights data point and displays temperature value when hovered
  let graphStartX = 80;
  let graphEndX = width - 100;
  let baseY = height - 120;
  let topY = 140;

  for (let i = 0; i < months.length; i++) {
    let x = map(i, 0, months.length - 1, graphStartX, graphEndX);
    let y = map(animatedTemps[i], 0, maxTemp, baseY, topY);

    if (dist(mouseX, mouseY, x, y) < 10) {
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 10, 10);
      fill(255);
      textSize(14);
      textAlign(CENTER, BOTTOM);
      text(temperatures[i] + "°C", x, y - 12);
    }
  }
}
