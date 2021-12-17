let img;
let cam;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.id("p5-canvas");

  img = createImage(width, height);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(65, 44, 19);

  cam.loadPixels();
  img.loadPixels();

  let gridSize = 25;
  for (let y = 0; y < img.height; y += gridSize) {
  for (let x = 0; x < img.width; x += gridSize) {
      let index = (x + y * img.width) * 4;
      let r = cam.pixels[index + 1];
      let g = cam.pixels[index + 2]/1.65;
      drawFlower(x, y, 0, 3, r, g, 0);
    }
  }
  cam.updatePixels();
  img.updatePixels();
}

function drawPetal(a, s, r, g, b) {
  push();
  angleMode(DEGREES);
  rotate(a);
  noStroke();
  fill(r, g, b);
  beginShape();
  vertex(0 * s, 0 * s);
  vertex(-3 * s, -1 * s);
  vertex(-3 * s, -2 * s);
  vertex(-2 * s, -2 * s);
  vertex(-2 * s, -3 * s);
  vertex(-1 * s, -3 * s);
  endShape(CLOSE);
  pop();
}

function drawFlower(x, y, a, s, r, g, b) {
  push();
  translate(x, y);
  rotate(a);
  drawPetal(0, s, r, g, b);
  drawPetal(72, s, r, g, b);
  drawPetal(144, s, r, g, b);
  drawPetal(216, s, r, g, b);
  drawPetal(288, s, r, g, b);
  pop();
}
