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
  noLoop();
}

function draw() {
  image(img, 0, 0);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    img = originalImg.get();
    redraw();
  }

  if (key === '1') posterizeStandard(4);
  if (key === '2') posterizeSingleChannel('r', 3);
  if (key === '3') posterizeSingleChannel('b', 3);
  if (key === '4') posterizeSingleChannel('g', 3);
  if (key === '5') posterizeHorizontalBands(4);
  if (key === '6') posterizeVerticalBands(4);
  if (key === '7') posterizeRandomBlocks(3);
}

// 1. Standard Posterize
function posterizeStandard(levels) {
  img = originalImg.get();
  img.loadPixels();
  let step = 255 / (levels - 1);
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = round(img.pixels[i] / step) * step;
    img.pixels[i + 1] = round(img.pixels[i + 1] / step) * step;
    img.pixels[i + 2] = round(img.pixels[i + 2] / step) * step;
  }
  img.updatePixels();
  redraw();
}

// 2–4. Posterize only one color channel
function posterizeSingleChannel(channel, levels) {
  img = originalImg.get();
  img.loadPixels();
  let step = 255 / (levels - 1);
  let cIndex = { r: 0, g: 1, b: 2 };
  let index = cIndex[channel];
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i + index] = round(img.pixels[i + index] / step) * step;
  }
  img.updatePixels();
  redraw();
}

// 5. Posterize Horizontal Bands
function posterizeHorizontalBands(levels) {
  img = originalImg.get();
  img.loadPixels();
  let bandHeight = img.height / levels;
  for (let y = 0; y < img.height; y++) {
    let level = floor(y / bandHeight);
    let step = 255 / (levels - 1);
    for (let x = 0; x < img.width; x++) {
      let idx = (x + y * img.width) * 4;
      for (let c = 0; c < 3; c++) {
        img.pixels[idx + c] = round(img.pixels[idx + c] / step) * step;
      }
    }
  }
  img.updatePixels();
  redraw();
}

// 6. Posterize Vertical Bands
function posterizeVerticalBands(levels) {
  img = originalImg.get();
  img.loadPixels();
  let bandWidth = img.width / levels;
  for (let x = 0; x < img.width; x++) {
    let level = floor(x / bandWidth);
    let step = 255 / (levels - 1);
    for (let y = 0; y < img.height; y++) {
      let idx = (x + y * img.width) * 4;
      for (let c = 0; c < 3; c++) {
        img.pixels[idx + c] = round(img.pixels[idx + c] / step) * step;
      }
    }
  }
  img.updatePixels();
  redraw();
}

// 7. Posterize Random Blocks
function posterizeRandomBlocks(levels) {
  img = originalImg.get();
  img.loadPixels();
  let step = 255 / (levels - 1);
  for (let i = 0; i < img.pixels.length; i += 4) {
    if (random() < 0.5) {
      img.pixels[i] = round(img.pixels[i] / step) * step;
      img.pixels[i + 1] = round(img.pixels[i + 1] / step) * step;
      img.pixels[i + 2] = round(img.pixels[i + 2] / step) * step;
    }
  }
  img.updatePixels();
  redraw();
}
