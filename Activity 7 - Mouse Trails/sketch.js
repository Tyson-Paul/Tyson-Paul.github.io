let trail = [];
let firecrackers = [];

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(0);
}

function draw() {
  // Main animation loop: updates background, memory trail, firecrackers, and overlay text
  background(0, 0, 0, 10);
  trail.push(new MemoryBubble(mouseX, mouseY));

  for (let i = trail.length - 1; i >= 0; i--) {
    trail[i].update();
    trail[i].display();
    if (trail[i].isFaded()) {
      trail.splice(i, 1);
    }
  }

  for (let i = firecrackers.length - 1; i >= 0; i--) {
    firecrackers[i].update();
    firecrackers[i].display();
    if (firecrackers[i].isDone()) {
      firecrackers.splice(i, 1);
    }
  }

  fill(0, 0, 100, 80);
  textSize(20);
  textAlign(CENTER);
  text("Move your mouse to trace memories... Click to burst emotions!", width / 2, height - 20);
}

function mousePressed() {
  // Adds a new firecracker explosion at mouse position on click
  firecrackers.push(new Firecracker(mouseX, mouseY));
}

// Creates and animates floating memory bubbles
class MemoryBubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 1.5));
    this.alpha = 100;
    this.size = random(10, 20);
    this.hue = (frameCount + random(0, 60)) % 360;
    this.jitter = random(1, 3);
  }

  update() {
    this.pos.add(this.vel);
    this.pos.x += random(-this.jitter, this.jitter);
    this.pos.y += random(-this.jitter, this.jitter);
    this.alpha -= 1.5;
    this.size += 0.3;
  }

  display() {
    fill(this.hue, 80, 100, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isFaded() {
    return this.alpha <= 0;
  }
}

// Manages firecracker particles and explosion logic
class Firecracker {
  constructor(x, y) {
    this.particles = [];
    this.numParticles = int(random(20, 40));
    let baseHue = random(0, 360);
    for (let i = 0; i < this.numParticles; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 6);
      let vel = p5.Vector.fromAngle(angle).mult(speed);
      this.particles.push(new Particle(x, y, vel, baseHue + random(-20, 20)));
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
    this.particles = this.particles.filter(p => !p.isFaded());
  }

  display() {
    for (let p of this.particles) {
      p.display();
    }
  }

  isDone() {
    return this.particles.length === 0;
  }
}

// Controls behavior of individual firecracker particles
class Particle {
  constructor(x, y, velocity, hue) {
    this.pos = createVector(x, y);
    this.vel = velocity;
    this.alpha = 100;
    this.hue = hue % 360;
    this.size = random(4, 8);
    this.gravity = createVector(0, 0.05);
  }

  update() {
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.alpha -= 2;
  }

  display() {
    fill(this.hue, 80, 100, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isFaded() {
    return this.alpha <= 0;
  }
}
