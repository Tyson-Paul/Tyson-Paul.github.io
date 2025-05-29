let message = "Welcome to Bath Spa University";
let letters = [];
let shattered = false;
let bubbles = [];
let sparkles = [];
let customFont;
let textColor;

function preload() {
  customFont = loadFont("BerkshireSwash-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  adjustTextSize();
  createLetters();
  createBubbles();
  textColor = color(0, 0, 20); // Fixed dark gray text color
}

function draw() {
  background(230, 40, 20); // HSB warm red background

  // Lighting
  ambientLight(60);
  pointLight(360, 360, 360, mouseX - width / 2, mouseY - height / 2, 300);

  drawBubbles();

  for (let s of sparkles) {
    s.update();
    s.display();
  }
  sparkles = sparkles.filter(s => !s.isFinished());

  drawTextBackground();

  for (let l of letters) {
    if (shattered && frameCount % 5 === 0) {
      sparkles.push(new Sparkle(l.x, l.y));
    }
    l.update();
    l.display();
  }
}

function drawTextBackground() {
  push();
  rectMode(CENTER);
  fill(255); 
  noStroke();
  let padding = 70;
  let boxWidth = textWidth(message) + padding;
  let boxHeight = textSize() + padding / 5;
  rect(0, 10, boxWidth, boxHeight, 100); // White rounded box behind text
  pop();
}

function mousePressed() {
  shattered = !shattered;
  for (let l of letters) {
    l.toggle(shattered);
  }
}

function adjustTextSize() {
  let testSize = 250;
  textSize(testSize);
  while (textWidth(message) > width * 0.85 && testSize > 35) {
    testSize--;
    textSize(testSize);
  }
}

function createLetters() {
  letters = [];
  let spacing = textWidth(message) / message.length;
  let startX = -textWidth(message) / 2;
  let y = 0;

  for (let i = 0; i < message.length; i++) {
    let char = message[i];
    let x = startX + i * spacing;
    letters.push(new Letter(char, x, y));
  }
}

function createBubbles() {
  bubbles = [];
  for (let i = 0; i < 350; i++) {
    bubbles.push(new Bubble(random(-width / 2, width / 2), random(-height / 2, height / 2), random(4, 10)));
  }
}

function drawBubbles() {
  for (let b of bubbles) {
    b.update();
    b.display();
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.homeY = y;
    this.vx = 0;
    this.vy = 0;
  }

  toggle(shatter) {
    if (shatter) {
      this.vx = random(-3, 3);
      this.vy = random(-3, 3);
    } else {
      this.vx = 0;
      this.vy = 0;
    }
  }

  update() {
    if (shattered) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -width / 2 + 20 || this.x > width / 2 - 20) this.vx *= -1;
      if (this.y < -height / 2 + 20 || this.y > height / 2 - 20) this.vy *= -1;
    } else {
      this.x = lerp(this.x, this.homeX, 0.1);
      this.y = lerp(this.y, this.homeY, 0.1);
    }
  }

  display() {
    push();
    fill(255);
    stroke(0, 0, 100, 50);
    strokeWeight(5);
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = textColor;
    text(this.char, this.x, this.y);
    drawingContext.shadowBlur = 0;
    pop();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.alpha = random(40, 90);
    this.speed = random(0.4, 1);
  }

  update() {
    // Repel from mouse
    let dx = mouseX - width / 2 - this.x;
    let dy = mouseY - height / 2 - this.y;
    let d = sqrt(dx * dx + dy * dy);

    if (d < 100) {
      this.x -= dx * 0.015;
      this.y -= dy * 0.015;
    }

    this.y -= this.speed;
    if (this.y < -height / 2 - this.r) {
      this.y = height / 2 + this.r;
      this.x = random(-width / 2, width / 2);
    }
  }

  display() {
    noStroke();
    fill(200, 40, 100, this.alpha);
    ellipse(this.x, this.y, this.r * 2);
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x + random(-5, 5);
    this.y = y + random(-5, 5);
    this.r = random(1, 3);
    this.lifetime = 255;
    this.col = color(random(180, 360), 80, 100, this.lifetime / 2);
  }

  update() {
    this.lifetime -= 5;
    this.col.setAlpha(this.lifetime / 2);
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2);
  }

  isFinished() {
    return this.lifetime <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  adjustTextSize();
  createLetters();
  createBubbles();
}
