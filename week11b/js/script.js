let sound;
let amp;


function preload() {
  sound = loadSound("assets/beat.mp3");
  song = loadSound("assets/song.mp3");

}

function mousePressed() {
  if (song.isPlaying()==false) {
    song.play();
  }
}

function setup() {

  let canvas = createCanvas(400, 500);
  canvas.mousePressed(userStartAudio); // ***

  //amp = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();


  background(0);
}

function draw() {
  background(0, 10);

  let volume = mic.getLevel();
  console.log(floor(volume*100));
  let dia = map(volume, 0, 1, 10, 400);
  noStroke();
  fill(0, 100, 255);
  ellipse(width/2, height/2, dia, dia);


  // let vol = map(mouseY, 0, height, 1.00, 0.00, true);
  // song.setVolume(vol);

}

function keyPressed(){
  if (key=="p") {
    if (song.isPlaying()==false) {
      song.play();
    }
    else if (key="s") {
      song.stop();
    }
  }

}

function mouseDragged() {
  if (sound.isPlaying() == false) {
  sound.play();
  }
}
