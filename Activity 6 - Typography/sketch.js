let fonts = [];
let fontNames = [
  'IslandMoments-Regular.ttf',
  'Limelight-Regular.ttf',
  'DancingScript-VariableFont_wght.ttf',
  'PermanentMarker-Regular.ttf',
  'ShadowsIntoLight-Regular.ttf'
];

let words = ["Nothing", "Is", "Impossible"];
let fontSize = 50;
let wordPositions = [];
let boxHeights = [0, 0, 0];
let boxTargetHeights = [0, 0, 0];
let clicked = [false, false, false];
let frameIndex = 0;

let boxGradients = [
  ["#8338ec", "#3a0ca3"],
  ["#ff9a8b", "#ff6a88"],
  ["#06d6a0", "#1b9aaa"],
  ["#f15bb5", "#9b5de5"],
  ["#f7971e", "#ffd200"]
];

function preload() {
  // Load all fonts before sketch starts
  for (let name of fontNames) {
    fonts.push(loadFont(name));
  }
}

function setup() {
  // Initialize canvas, font, text alignment, and word positions
  createCanvas(windowWidth, windowHeight);
  textFont(fonts[frameIndex]);
  textAlign(CENTER, BOTTOM);
  noStroke();

  let spacing = width / (words.length + 1);
  for (let i = 0; i < words.length; i++) {
    wordPositions.push({
      x: spacing * (i + 1),
      y: height - 50
    });
  }
}

function draw() {
  // Draw gradient background, animated boxes, and floating or bouncing text
  drawDarkGradientBackground();

  let t = millis() / 1000;
  let colors = boxGradients[frameIndex];

  for (let i = 0; i < words.length; i++) {
    boxHeights[i] = lerp(boxHeights[i], boxTargetHeights[i], 0.1);
    let boxY = height - boxHeights[i] / 2;

    let grad = drawingContext.createLinearGradient(0, boxY - boxHeights[i] / 2, 0, boxY + boxHeights[i] / 2);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
    drawingContext.fillStyle = grad;
    rectMode(CENTER);
    rect(wordPositions[i].x, boxY, 270, boxHeights[i]);

    if (clicked[i]) {
      fill(255);
      let bounce = sin(t * 3 + i) * 5;
      textFont(fonts[frameIndex]);
      textSize(fontSize + bounce);
      text(words[i], wordPositions[i].x, boxY - boxHeights[i] / 2 - 20);
    }
  }

  for (let i = 0; i < words.length; i++) {
    if (!clicked[i]) {
      let floatOffset = sin(t * 2 + i) * 5;
      fill(255);
      textFont(fonts[frameIndex]);
      textSize(fontSize);
      text(words[i], wordPositions[i].x, wordPositions[i].y + floatOffset);
    }
  }
}

function mousePressed() {
  // Detect word click to animate box or cycle to next style frame
  let wordClicked = false;
  for (let i = 0; i < words.length; i++) {
    let d = dist(mouseX, mouseY, wordPositions[i].x, wordPositions[i].y);
    if (d < 100 && !clicked[i]) {
      clicked[i] = true;
      boxTargetHeights[i] = 500 + i * 30;
      wordClicked = true;
    }
  }

  if (!wordClicked) {
    frameIndex = (frameIndex + 1) % fonts.length;
    textFont(fonts[frameIndex]);
    for (let i = 0; i < words.length; i++) {
      clicked[i] = false;
      boxHeights[i] = 0;
      boxTargetHeights[i] = 0;
    }
  }
}

function drawDarkGradientBackground() {
  // Render a vertical dark gradient background using RGB values
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let r = lerp(10, 40, inter);
    let g = lerp(10, 30, inter);
    let b = lerp(30, 60, inter);
    stroke(r, g, b);
    line(0, y, width, y);
  }
}
