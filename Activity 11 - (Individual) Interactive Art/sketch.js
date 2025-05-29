// Variables for game elements and assets
let bird;
let pipes = [];
let bgImg, birdImg, pipeTopImg, pipeBottomImg;
let score = 0;
let gameOver = false;
let pulse = 0;
let customFont;
let flapSound, gameOverSound, bgMusic;
let gameStarted = false;

// Load images, fonts, and sounds before the game starts
function preload() {
  bgImg = loadImage('bg.png');
  birdImg = loadImage('bird.png');
  pipeTopImg = loadImage('pipe top.jpg');
  pipeBottomImg = loadImage('pipe bottom.jpg');
  customFont = loadFont('BerkshireSwash-Regular.ttf');

  soundFormats('mp3', 'wav');
  flapSound = loadSound('flap.mp3');
  gameOverSound = loadSound('gameover.mp3');
  bgMusic = loadSound('bg-music.mp3');
}

// Initialize canvas, game objects, and text properties
function setup() {
  createCanvas(500, 500);
  bird = new Bird();
  pipes.push(new Pipe());
  textAlign(CENTER, CENTER);
  textFont(customFont);
  bgMusic.setVolume(0.3);
}

// Main game loop: handles drawing background, bird, pipes, score, and game states
function draw() {
  image(bgImg, 0, 0, width, height);

  if (!gameStarted) {
    textSize(36);
    fill(255, 247, 3);
    text("Flappy Bird", width / 2, height / 2 - 60);
    textSize(20);
    fill(255);
    text("Press SPACE to start and flap", width / 2, height / 2);
    return;
  }

  if (!gameOver) {
    bird.update();
    bird.show();

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        gameOver = true;
        gameOverSound.play();
        bgMusic.stop();
      }

      if (!pipes[i].scored && pipes[i].x + pipes[i].w < bird.x) {
        score++;
        pipes[i].scored = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    if (frameCount % 100 === 0) {
      pipes.push(new Pipe());
    }

    pulse += 0.1;
    fill(247, 239, 7);
    textSize(30 + sin(pulse) * 2);
    text("Score: " + score, width / 2, 50);

  } else {
    pulse += 0.05;
    textSize(40 + sin(pulse) * 7);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2 - 40);

    fill(219, 134, 31);
    textSize(28);
    text("Score: " + score, width / 2, height / 2 + 10);

    textSize(20 + sin(pulse * 2) * 2);
    fill(0);
    text("Press R to Restart", width / 2, height / 2 + 50);
  }
}

// Handle key presses for starting game, flapping, and restarting
function keyPressed() {
  if (!gameStarted && key === ' ') {
    gameStarted = true;
    bgMusic.loop();
  }

  if (gameStarted && !gameOver && key === ' ') {
    bird.up();
    flapSound.play();
  } else if (key === 'r' || key === 'R') {
    restartGame();
  }
}

// Reset game variables and restart game loop
function restartGame() {
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  score = 0;
  gameOver = false;
  pulse = 0;
  gameStarted = true;
  bgMusic.loop();
}

// Bird class: handles bird position, movement, gravity, and rendering
class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 80;
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
      gameOver = true;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  show() {
    image(birdImg, this.x, this.y, 50, 50);
  }
}

// Pipe class: manages pipe position, movement, collision detection, and rendering
class Pipe {
  constructor() {
    this.spacing = 180;
    this.top = random(height / 6, 3 / 5 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 70;
    this.speed = 3;
    this.scored = false;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x + 40 > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    image(pipeTopImg, this.x, 0, this.w, this.top);
    image(pipeBottomImg, this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }
}
