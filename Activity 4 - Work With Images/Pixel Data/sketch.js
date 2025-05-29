let img, originalImg;

function preload() {
  img = loadImage('Car.jpg', () => {
    img.resize(700, 0); // Resize image to width 700px
  });
}

function setup() {
  createCanvas(img.width, img.height);
  originalImg = img.get(); // Store original image for reset
  image(img, 0, 0);
  noLoop(); // Only redraw when keys are pressed
}

function draw() {
  image(img, 0, 0); // Display current image
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    img = originalImg.get(); // Reset to original
    redraw();
  }

  if (key === 'i' || key === 'I') {
    applyInvert(); // Apply invert filter
  }

  if (key === 'g' || key === 'G') {
    applyGrayscale(); // Apply grayscale filter
  }
}

// Invert Colors
function applyInvert() {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i + 0] = 255 - img.pixels[i + 0]; // Red
    img.pixels[i + 1] = 255 - img.pixels[i + 1]; // Green
    img.pixels[i + 2] = 255 - img.pixels[i + 2]; // Blue
  }
  img.updatePixels();
  redraw();
}

// Grayscale
function applyGrayscale() {
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
