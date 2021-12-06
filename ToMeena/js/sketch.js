let snd1;
let snd2;
let snd3;
let snd4;
let snd5;

let popup = document.getElementById("popup");

let player;
let things = [];

function preload() {
  snd1 = loadSound("assets/mp3/BadDreams.mp3");
  snd2 = loadSound("assets/mp3/Blackberry.mp3");
  snd3 = loadSound("assets/mp3/LongHill.mp3");
  snd4 = loadSound("assets/mp3/Message.mp3");
  snd5 = loadSound("assets/mp3/Ozymandias.mp3");
  bg = loadImage("assets/img/background.png");

  spriteSheet = loadImage('assets/img/spriteSheet.png');
  spriteData = loadJSON('json/spriteSheet.json');

}

function setup() {
  createCanvas(240*5, 145*5);

  frameRate(12);

  player = new Player (182*5, 100*5, 30);
  things.push(new SoundObject(45*5, 70*5, 230, snd1));
  things.push(new SoundObject(80*5, 160*5, 350, snd2));
  things.push(new SoundObject(106*5, 82*5, 200, snd3));
  things.push(new SoundObject(182*5, 150*5, 175, snd4));
  things.push(new SoundObject(182*5, 25*5, 320, snd5));
}

function draw() {
  push();
  background(bg);
  pop();

  // update and display the sound objects
  for (let i = 0; i < things.length; i++) {
    let thing = things[i];
    thing.interact(player);
    thing.display();
  }

  // update and display the character
  player.update();
  player.move();
  player.show();
  player.display();

}

function keyPressed(e) {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      player.state = 'move-up';
      player.idx = 12;
      break;
    case 'ArrowDown':
    case 'KeyS':
      //console.log('key down');
      player.state = 'move-down';
      player.idx = 8;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      //console.log('key left');
      player.state = 'move-left';
      player.idx = 0;
      break;
    case 'ArrowRight':
    case 'KeyD':
      //console.log('key right');
      player.state = 'move-right';
      player.idx = 4;
      break;
  }
}

function keyReleased() {
  player.state = 'idle';
}

class Player {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.idx = 0;
    this.anim = [];
    this.rad = rad;
    this.step = 5;

    this.state = 'idle';
    this.playerMoveable = {
      up: true,
      down: true,
      left: true,
      right: true
    };

    let frames = spriteData.frames;
    for (let i = 0; i < frames.length; i++) {
      let data = frames[i].position;
      this.anim[i] = spriteSheet.get(data.x, data.y, data.w, data.h);
    };
  }

  move() {
    switch (this.state) {
      case 'idle':
        break;

      case 'move-left':
        if (this.playerMoveable.left) this.x -= 30;
        break;

      case 'move-right':
        if (this.playerMoveable.right) this.x += 30;
        break;

      case 'move-up':
        if (this.playerMoveable.up) this.y -= 30;
        break;

      case 'move-down':
        if (this.playerMoveable.down) this.y += 30;
        break;
    }
    return this;
  }

  update() {
    switch (this.state) {
      case 'idle':
        // this.idx = 0;
        break;

      case 'move-left':
        this.idx >= 3 ? this.idx = 0 : this.idx++;
        break;

      case 'move-right':
        this.idx >= 7? this.idx = 4: this.idx++;
        break;

      case 'move-up':
        this.idx >= 15 ? this.idx = 12 : this.idx++;
        break;

      case 'move-down':
        this.idx >= 11 ? this.idx = 8 : this.idx++;
        break;
    }
    return this;
  }

/////popup
  show(){
    if (this.x <= 375 && this.y <= 520 && this.x >= 95 && this.y >= 200){
      popup1.style.display = "inline";
    }
    else {
      popup1.style.display = "none";
    }

    if (this.x <= 700 && this.y <= 730 && this.x >= 100 && this.y >= 565){
      popup2.style.display = "inline";
    }
    else {
      popup2.style.display = "none";
    }

    if (this.x <= 650 && this.y <= 540 && this.x >= 390 && this.y >= 290){
      popup3.style.display = "inline";
    }
    else {
      popup3.style.display = "none";
    }

    if (this.x <= 945 && this.y <= 735 && this.x >= 835 && this.y >= 590){
      popup4.style.display = "inline";
    }
    else {
      popup4.style.display = "none";
    }

    if (this.x <= 1040 && this.y <= 400 && this.x >= 780 && this.y >= 260){
      popup5.style.display = "inline";
    }
    else {
      popup5.style.display = "none";
    }

  }
/////
  display() {
    push();
    image(this.anim[this.idx], this.x-74, this.y-74, 143, 143);


    // sensing area
    // noFill();
    // stroke(0, 255, 0);
    // circle(this.x, this.y, this.rad * 2);
    // pop();
    //
    // fill(0, 0, 255, 150);
    // rect(780, 150, 260, 250);

  }
}

class SoundObject {
  constructor(x, y, rad, snd) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.snd = snd;
    this.volume = 0;
  }
  interact(char) {
    let distance = dist(this.x, this.y, char.x, char.y);
    this.volume = map(distance, 0, this.rad, 1.0, 0.0, true);

    if (this.volume > 0) {
      console.log(this.snd.isPlaying());
      if (this.snd.isPlaying() == false) {
        this.snd.loop();
      }
    } else {
      this.snd.pause();
    }

    this.snd.setVolume(this.volume);
  }
  display() {
    push();
    translate(this.x, this.y);
    // image
    // noStroke();
    // fill(255, 255, 0);
    // rectMode(CENTER);
    // rect(0, 0, this.rad * 0.3, this.rad * 0.3);
    // // sensing area
    // noFill();
    // stroke(255, 0, 0);
    // circle(0, 0, this.rad);
    // // display text
    // noStroke();
    // fill(255, 0, 0);
    // text(this.volume, 50, 10);
    pop();
  }
}

//
