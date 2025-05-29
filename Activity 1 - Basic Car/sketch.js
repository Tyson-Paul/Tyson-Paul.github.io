function setup() {
  createCanvas(500, 500);
  noLoop();
  drawCar(width / 2, height / 2, color(25, 25, 112)); // Midnight Blue Car
}

function drawCar(cx, cy, bodyColor) {
  background(30); // Dark background for contrast

  let carWidth = 350;  // Increased width for longer car
  let carHeight = 80;
  let wheelSize = 60;

  let x = cx - carWidth / 2;
  let y = cy;

  // Glowing headlights
  noStroke();
  for (let i = 0; i < 6; i++) {
    fill(255, 255, 180, 60 - i * 10);
    ellipse(x + carWidth + i * 2, y + 25, 70 + i * 10, 35 + i * 5);
  }

  // Car body
  fill(bodyColor);
  rect(x, y, carWidth, carHeight, 12);
  rect(x + 50, y - 50, carWidth - 100, 50, 12);

  // Doors outlines (shifted to accommodate longer car)
  stroke(150);
  strokeWeight(2);
  noFill();
  rect(x + 70, y + 5, 95, carHeight - 10, 8); // Left door
  rect(x + carWidth - 165, y + 5, 95, carHeight - 10, 8); // Right door
  noStroke();

  // Door handles (adjusted for new door positions)
  fill(200);
  rect(x + 120, y + 40, 25, 7, 4); // Left handle
  rect(x + carWidth - 115, y + 40, 25, 7, 4); // Right handle

  // Wheels with inner lines (moved outward)
  drawDetailedTire(x + 65, y + carHeight, wheelSize);
  drawDetailedTire(x + carWidth - 65, y + carHeight, wheelSize);

  // Window positions (raised slightly, adjusted for wider car)
  let windowY = y - 42;
  let windowH = 35;
  let windowW = 50;

  fill(200, 220, 255, 200);
  rect(x + 75, windowY, windowW, windowH, 5); // Left window
  rect(x + carWidth - 125, windowY, windowW, windowH, 5); // Right window

  // Divider between windows (center B-pillar)
  let dividerX = x + carWidth / 2;
  stroke(180);
  strokeWeight(4);
  line(dividerX, windowY, dividerX, windowY + windowH);
  noStroke();

  // Headlights
  fill(255, 255, 150);
  ellipse(x + carWidth, y + 25, 20, 12);

  // Tail light
  fill(255, 50, 50);
  ellipse(x, y + 25, 16, 12);
}

function drawDetailedTire(x, y, size) {
  fill(30);
  ellipse(x, y, size, size);

  // Internal circular lines for rim effect
  stroke(100);
  noFill();
  for (let r = size * 0.2; r < size / 2; r += 5) {
    ellipse(x, y, r * 2, r * 2);
  }
}
