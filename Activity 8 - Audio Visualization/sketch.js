let mic, soundFile, fft, amp;
let useMic = false;
let useFile = false;
let fileInput, micButton, switchToMicButton;

let particles = [];

function setup() {
  // Initializes canvas, audio input options, and UI buttons
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(20);

  fileInput = createFileInput(handleFile);
  fileInput.position(width / 2 - 120, 10);

  micButton = createButton("Use Microphone");
  micButton.position(width / 2 + 10, 10);
  micButton.mousePressed(() => {
    userStartAudio();
    mic.start(() => {
      fft.setInput(mic);
      amp.setInput(mic);
      useMic = true;
      useFile = false;
      if (soundFile) soundFile.stop();
    });
  });

  switchToMicButton = createButton("Switch to Microphone");
  switchToMicButton.position(width / 2 - 75, 50);
  switchToMicButton.hide();
  switchToMicButton.mousePressed(() => {
    userStartAudio();
    mic.start(() => {
      fft.setInput(mic);
      amp.setInput(mic);
      useMic = true;
      useFile = false;
      if (soundFile) soundFile.stop();
      switchToMicButton.hide();
    });
  });

  mic = new p5.AudioIn();
  fft = new p5.FFT(0.9, 64);
  amp = new p5.Amplitude();
}

function handleFile(file) {
  // Loads and plays uploaded audio file, sets it for FFT and amplitude analysis
  if (file.type === 'audio') {
    if (soundFile) soundFile.stop();
    soundFile = loadSound(file.data, () => {
      fft.setInput(soundFile);
      amp.setInput(soundFile);
      soundFile.play();
      useFile = true;
      useMic = false;
      switchToMicButton.show();
    });
  }
}

function draw() {
  // Core animation loop: visualizes spectrum, energy, and generates particles
  background(0, 0, 0, 20);

  if (!useMic && !useFile) {
    fill(0, 0, 100);
    text("Upload audio or use microphone to start visualization", width / 2, height / 2);
    return;
  }

  let spectrum = fft.analyze();
  let level = amp.getLevel();

  let bassEnergy = fft.getEnergy("bass");
  let bgHue = map(bassEnergy, 0, 255, 180, 360);
  background(bgHue, 60, 15, 10);

  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let barWidth = width / spectrum.length;
    let barHeight = map(spectrum[i], 0, 255, 0, height);
    let hue = map(i, 0, spectrum.length, 0, 360);
    fill(hue, 80, 100);
    rect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
  }

  let midEnergy = fft.getEnergy("mid");
  if (random() < map(midEnergy, 0, 255, 0, 0.3)) {
    particles.push(new Particle(random(width), height / 2));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  // Represents a visual particle that fades and moves randomly
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.alpha = 100;
    this.hue = random(360);
    this.size = random(5, 12);
  }

  update() {
    this.pos.add(this.vel);
    this.alpha -= 2;
  }

  display() {
    fill(this.hue, 80, 100, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
