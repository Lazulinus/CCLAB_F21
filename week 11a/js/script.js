
function preload() {
  //async download first!!
  img = loadImage("asset/testimage.jpg");
}

function setup() {
  createCanvas(400, 500);
  background(220);
  img = loadImage("asset/testimage.jpg");
  circleImg = loadImage("asset/sprite.png")
}

function draw() {
  background(0);

  //tint(0, 255, 255, 150); //(r, g, b, a) hue change/color balance
  //filters are useful but expensive
  // filter (BLUR, 6);
  // filter(GRAY);
  // filter(INVERT);
  blendMode(ADD);
  tint(226,159,147);
  imageMode(CENTER);
  image(circleImg, mouseX, mouseY, 100, 100);

  // push();
  // translate(mouseX, mouseY);
  // imageMode(CENTER);
  // image(img, 0, 0, 100, 100) //(img, x, y, width, height)
  // pop();
}
