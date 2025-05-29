let img;
let currentShape = 1; // Default: Ellipse

function preload() {
  // Load and resize image before setup
  img = loadImage('Car.jpg', () => {
    img.resize(700, 0);
  });
}

function setup() {
  // Set up canvas and prepare image pixels
  createCanvas(img.width, img.height);
  background(255);
  img.loadPixels();
  textSize(16);
  fill(0);
  text("Press 1: Ellipse | 2: Rectangle | 3: Triangle", 10, 20);
}

function draw() {
  // Draw colored shapes based on image pixels while mouse is pressed
  if (mouseIsPressed) {
    for (let i = 0; i < 30; i++) {
      let x = floor(mouseX + random(-20, 20));
      let y = floor(mouseY + random(-20, 20));
      x = constrain(x, 0, img.width - 1);
      y = constrain(y, 0, img.height - 1);

      let col = img.get(x, y);
      fill(col);
      noStroke();

      let w = random(6, 12);
      let h = random(6, 12);

      switch (currentShape) {
        case 1:
          ellipse(x, y, w, h);
          break;
        case 2:
          rect(x, y, w, h);
          break;
        case 3:
          triangle(x, y - h / 2, x - w / 2, y + h / 2, x + w / 2, y + h / 2);
          break;
      }
    }
  }
}

function keyPressed() {
  // Change drawing shape based on key input
  if (key === '1') {
    currentShape = 1;
  } else if (key === '2') {
    currentShape = 2;
  } else if (key === '3') {
    currentShape = 3;
  }
}
