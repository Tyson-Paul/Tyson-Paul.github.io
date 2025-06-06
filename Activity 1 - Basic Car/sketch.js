function setup() {
  createCanvas(500, 500);
  noLoop();
  drawCar(width / 2, height / 2, color(25, 25, 112)); // Draw car in center with midnight blue color
}

function drawCar(cx, cy, bodyColor) {
  background(30); // Set background color

  let carWidth = 350;
  let carHeight = 80;
  let wheelSize = 60;

  let x = cx - carWidth / 2;
  let y = cy;

  // Draw glowing headlight effect
  noStroke();
  for (let i = 0; i < 6; i++) {
    fill(255, 255, 180, 60 - i * 10);
    ellipse(x + carWidth + i * 2, y + 25, 70 + i * 10, 35 + i * 5);
  }

  // Draw main body of the car
  fill(bodyColor);
  rect(x, y, carWidth, carHeight, 12);
  rect(x + 50, y - 50, carWidth - 100, 50, 12);

  // Draw door outlines
  stroke(150);
  strokeWeight(2);
  noFill();
  rect(x + 70, y + 5, 95, carHeight - 10, 8);
  rect(x + carWidth - 165, y + 5, 95, carHeight - 10, 8);
  noStroke();

  // Draw door handles
  fill(200);
  rect(x + 120, y + 40, 25, 7, 4);
  rect(x + carWidth - 115, y + 40, 25, 7, 4);

  // Draw front and rear wheels
  drawDetailedTire(x + 65, y + carHeight, wheelSize);
  drawDetailedTire(x + carWidth - 65, y + carHeight, wheelSize);

  // Draw side windows
  let windowY = y - 42;
  let windowH = 35;
  let windowW = 50;

  fill(200, 220, 255, 200);
  rect(x + 75, windowY, windowW, windowH, 5);
  rect(x + carWidth - 125, windowY, windowW, windowH, 5);

  // Draw vertical divider between windows
  let dividerX = x + carWidth / 2;
  stroke(180);
  strokeWeight(4);
  line(dividerX, windowY, dividerX, windowY + windowH);
  noStroke();

  // Draw headlight and tail light
  fill(255, 255, 150);
  ellipse(x + carWidth, y + 25, 20, 12);

  fill(255, 50, 50);
  ellipse(x, y + 25, 16, 12);
}

function drawDetailedTire(x, y, size) {
  // Draw tire with circular rim detailing
  fill(30);
  ellipse(x, y, size, size);

  stroke(100);
  noFill();
  for (let r = size * 0.2; r < size / 2; r += 5) {
    ellipse(x, y, r * 2, r * 2);
  }
}
