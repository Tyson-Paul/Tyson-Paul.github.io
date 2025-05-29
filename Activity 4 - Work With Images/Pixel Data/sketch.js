let img, originalImg;

function preload() {
  img = loadImage('Car.jpg', () => {
    img.resize(700, 0);
  });
}

function setup() {
  createCanvas(img.width, img.height);
  originalImg = img.get();
  image(img, 0, 0);
  noLoop(); // Draw once unless triggered
}

function draw() {
  // Display the current image
  image(img, 0, 0);
}

function keyPressed() {
  // Handle keyboard input for image filters
  if (key === 'r' || key === 'R') {
    img = originalImg.get();
    redraw();
  }

  if (key === 'i' || key === 'I') {
    applyInvert();
  }

  if (key === 'g' || key === 'G') {
    applyGrayscale();
  }
}

function applyInvert() {
  // Invert image colors
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i + 0] = 255 - img.pixels[i + 0];
    img.pixels[i + 1] = 255 - img.pixels[i + 1];
    img.pixels[i + 2] = 255 - img.pixels[i + 2];
  }
  img.updatePixels();
  redraw();
}

function applyGrayscale() {
  // Convert image to grayscale
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let avg = (img.pixels[i + 0] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    img.pixels[i + 0] = avg;
    img.pixels[i + 1] = avg;
    img.pixels[i + 2] = avg;
  }
  img.updatePixels();
  redraw();
}
