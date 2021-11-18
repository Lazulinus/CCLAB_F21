let SLIME_SIZE = 75;
let slimes = [];
let elementNames = [
  "Anemo",
  "Cryo",
  "Dendro",
  "Electro",
  "Geo",
  "Hydro",
  "Pyro",
];
let reactions = [];
let radioAnemo;
let radioCryo;
let radioDendro;
let radioElectro;
let radioGeo;
let radioHydro;
let radioPyro;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.id("p5-canvas");
  radioAnemo = document.getElementById("radio-Anemo");
  radioCryo = document.getElementById("radio-Cryo");
  radioDendro = document.getElementById("radio-Dendro");
  radioElectro = document.getElementById("radio-Electro");
  radioGeo = document.getElementById("radio-Geo");
  radioHydro = document.getElementById("radio-Hydro");
  radioPyro = document.getElementById("radio-Pyro");
}

/*
function keyTyped() {
if (key === "1") {
slimes.push(new Slime(mouseX, mouseY, "Anemo"));
} else if (key === "2") {
slimes.push(new Slime(mouseX, mouseY, "Cryo"));
} else if (key === "3") {
slimes.push(new Slime(mouseX, mouseY, "Dendro"));
} else if (key === "4") {
slimes.push(new Slime(mouseX, mouseY, "Electro"));
} else if (key === "5") {
slimes.push(new Slime(mouseX, mouseY, "Geo"));
} else if (key === "6") {
slimes.push(new Slime(mouseX, mouseY, "Hydro"));
} else if (key === "7") {
slimes.push(new Slime(mouseX, mouseY, "Pyro"));
}
}
*/


function mousePressed() {
  /*
  let randomIndex = floor(random(elementNames.length));
  let name = elementNames[randomIndex];
  slimes.push(new Slime(mouseX, mouseY, name));
  */
}

function buttonPressed() {
  let randomIndex = floor(random(elementNames.length));

  let x = random(width);
  let y = random(height);

  //let name = elementNames[randomIndex];
  let name = "Anemo";
  if (radioAnemo.checked) {
    name = "Anemo";
  } else if (radioCryo.checked) {
    name = "Cryo";
  } else if (radioDendro.checked) {
    name = "Dendro";
  } else if (radioElectro.checked) {
    name = "Electro";
  } else if (radioGeo.checked) {
    name = "Geo";
  } else if (radioHydro.checked) {
    name = "Hydro";
  } else if (radioPyro.checked) {
    name = "Pyro";
  }

  slimes.push(new Slime(x, y, name));
}

function draw() {
  background(255);

  //collision detection
  for (let indexA = 0; indexA < slimes.length; indexA++) {
    let slimeA = slimes[indexA];
    slimeA.update();
    for (let indexB = 0; indexB < slimes.length; indexB++) {
      if (indexA != indexB) {
        let slimeB = slimes[indexB];
        slimeA.checkCollision(slimeB);
      }
    }
    slimeA.display();
    //slimeA.displayDetectingArea();
  }

  //slime is done
  for (let i = slimes.length - 1; i >= 0; i--) {
    let s = slimes[i];
    if (s.isDone == true) {
      slimes.splice(i, 1); // (index, quantity)
    }
  }

  for (let i = reactions.length - 1; i >= 0; i--) {
    let r = reactions[i];
    r.update();
    r.display();
    if (r.isDone) {
      reactions.splice(i, 1);
    }
  }
}

class Slime {
  constructor(startX, startY, element) {
    this.element = element; // string

    this.x = startX;
    this.y = startY;
    this.scl = random(0.5, 1.0);
    this.rad = SLIME_SIZE * this.scl;

    this.strokeWeight1 = 3.5;
    this.strokeWeight2 = 2.5;

    //appearance

    this.color1 = color(255);
    this.color2 = color(255);
    this.color3 = color(255);
    this.color4 = color(255);

    //variables
    this.compression = 0;
    this.stretch = 0;
    this.random = random(6, 10);
    this.xSpeed = 0;
    this.ySpeed = 0;

    if (this.element == "Anemo") {
      this.setupAnemo();
    } else if (this.element == "Cryo") {
      this.setupCryo();
    } else if (this.element == "Dendro") {
      this.setupDendro();
    } else if (this.element == "Electro") {
      this.setupElectro();
    } else if (this.element == "Geo") {
      this.setupGeo();
    } else if (this.element == "Hydro") {
      this.setupHydro();
    } else if (this.element == "Pyro") {
      this.setupPyro();
    }
  }

  checkCollision(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    if (distance < this.rad + other.rad) {
      // collided
      if (this.element == other.element) {
        // live
      } else {
        let x = (this.x + other.x) / 2;
        let y = (this.y + other.y) / 2;
        // react!
        if (this.element == "Anemo") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 147, 247, 208));
          } else if (other.element == "Cryo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 208, 255, 255));
          } else if (other.element == "Dendro") {
            reactions.push(new ElementalReaction(x, y, "swirl", 178, 229, 46));
          } else if (other.element == "Electro") {
            reactions.push(new ElementalReaction(x, y, "swirl", 217, 180, 250));
          } else if (other.element == "Geo") {
            //
          } else if (other.element == "Hydro") {
            reactions.push(new ElementalReaction(x, y, "swirl", 2, 234, 255));
          } else if (other.element == "Pyro") {
            reactions.push(new ElementalReaction(x, y, "swirl", 255, 169, 114));
          }
        } else if (this.element == "Cryo") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 208, 255, 255));
          } else if (other.element == "Cryo") {
            //
          } else if (other.element == "Dendro") {
            //
          } else if (other.element == "Electro") {
            reactions.push(
              new ElementalReaction(x, y, "superconduct", 155, 187, 255)
            );
          } else if (other.element == "Geo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 208, 255, 255)
            );
          } else if (other.element == "Hydro") {
            reactions.push(
              new ElementalReaction(x, y, "frozen", 208, 255, 255)
            );
          } else if (other.element == "Pyro") {
            reactions.push(new ElementalReaction(x, y, "melt", 208, 255, 255));
          }
        } else if (this.element == "Dendro") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 178, 229, 46));
          } else if (other.element == "Cryo") {
            //
          } else if (other.element == "Dendro") {
            //
          } else if (other.element == "Electro") {
            //
          } else if (other.element == "Geo") {
            //
          } else if (other.element == "Hydro") {
            //
          } else if (other.element == "Pyro") {
            reactions.push(
              new ElementalReaction(x, y, "burning", 178, 229, 46)
            );
          }
        } else if (this.element == "Electro") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 217, 180, 250));
          } else if (other.element == "Cryo") {
            reactions.push(
              new ElementalReaction(x, y, "superconduct", 155, 187, 255)
            );
          } else if (other.element == "Dendro") {
            //
          } else if (other.element == "Electro") {
            //
          } else if (other.element == "Geo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 217, 180, 250)
            );
          } else if (other.element == "Hydro") {
            reactions.push(
              new ElementalReaction(x, y, "charged", 144, 138, 250)
            );
          } else if (other.element == "Pyro") {
            reactions.push(
              new ElementalReaction(x, y, "overloaded", 255, 92, 81)
            );
          }
        } else if (this.element == "Geo") {
          if (other.element == "Anemo") {
            //
          } else if (other.element == "Cryo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 243, 210, 97)
            );
          } else if (other.element == "Dendro") {
            //
          } else if (other.element == "Electro") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 243, 210, 97)
            );
          } else if (other.element == "Geo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 243, 210, 97)
            );
          } else if (other.element == "Hydro") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 243, 210, 97)
            );
          } else if (other.element == "Pyro") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 243, 210, 97)
            );
          }
        } else if (this.element == "Hydro") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 2, 234, 255));
          } else if (other.element == "Cryo") {
            reactions.push(
              new ElementalReaction(x, y, "frozen", 208, 255, 255)
            );
          } else if (other.element == "Dendro") {
            //
          } else if (other.element == "Electro") {
            reactions.push(
              new ElementalReaction(x, y, "charged", 144, 138, 250)
            );
          } else if (other.element == "Geo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 2, 234, 255)
            );
          } else if (other.element == "Hydro") {
            //
          } else if (other.element == "Pyro") {
            reactions.push(
              new ElementalReaction(x, y, "vaporize", 255, 199, 143)
            );
          }
        } else if (this.element == "Pyro") {
          if (other.element == "Anemo") {
            reactions.push(new ElementalReaction(x, y, "swirl", 255, 169, 114));
          } else if (other.element == "Cryo") {
            reactions.push(new ElementalReaction(x, y, "melt", 255, 169, 114));
          } else if (other.element == "Dendro") {
            reactions.push(
              new ElementalReaction(x, y, "burning", 255, 169, 114)
            );
          } else if (other.element == "Electro") {
            reactions.push(
              new ElementalReaction(x, y, "overloaded", 255, 92, 81)
            );
          } else if (other.element == "Geo") {
            reactions.push(
              new ElementalReaction(x, y, "crystalize", 255, 169, 114)
            );
          } else if (other.element == "Hydro") {
            reactions.push(
              new ElementalReaction(x, y, "vaporize", 255, 199, 143)
            );
          } else if (other.element == "Pyro") {
            //
          }
        }
        this.isDone = true;
      }
    }
  }

  update() {
    this.rad = SLIME_SIZE * this.scl;

    this.x = this.x + this.xSpeed;
    this.y = this.y - this.ySpeed;

    if (this.x > width || this.x < 0) {
      this.xSpeed = this.xSpeed * -1;
    }

    if (this.y > height || this.y < 0) {
      this.ySpeed = this.ySpeed * -1;
    }

    this.compression = sin(frameCount / 20) * 8;
    this.stretch = sin(frameCount / 20) * this.random;
    this.x1 = this.x;
    this.x2 = this.x + this.compression;
    this.x3 = this.x - this.compression;
    this.y1 = this.y;
    this.y2 = this.y - this.stretch;
    this.y3 = this.y - this.stretch * 1.5;
  }

  display() {
    push();
    translate(this.x, this.y);
    let sinValue = sin(frameCount * (1.001 - this.scl) * 0.5);
    let rotAngle = map(sinValue, -1, 1, -15, 15);
    rotate(radians(rotAngle));
    scale(this.scl);
    this.drawBody();
    pop();
  }

  displayDetectingArea() {
    push();
    fill(0, 255, 0, 100);
    stroke(255, 0, 0);
    circle(this.x, this.y, this.rad * 2);
    pop();
  }

  drawBody() {
    //body
    push();
    translate(-this.x, -this.y); // ***

    stroke(this.color1);
    strokeWeight(this.strokeWeight1);
    fill(this.color2);
    beginShape();
    curveVertex(this.x1 - 0, this.y1 + 23);
    curveVertex(this.x2 - 60, this.y1 + 20);
    curveVertex(this.x2 - 75, this.y1 + 0);
    curveVertex(this.x1 - 50, this.y2 - 50);
    curveVertex(this.x1 + 0, this.y3 - 70);
    curveVertex(this.x1 + 50, this.y2 - 50);
    curveVertex(this.x3 + 75, this.y1 + 0);
    curveVertex(this.x3 + 60, this.y1 + 20);
    endShape(CLOSE);
    pop();

    //eyes
    push();
    translate(-this.x, -this.y); // ***

    strokeWeight(this.strokeWeight2);
    stroke(this.color3);
    fill(this.color4);
    ellipseMode(CENTER);
    ellipse(this.x - 22, this.y - 28, 12, 22 + this.stretch * 0.75);
    ellipse(this.x + 22, this.y - 28, 12, 22 + this.stretch * 0.75);
    pop();
  }

  setupAnemo() {
    //appearance
    this.color1 = color(123, 239, 223);
    this.color2 = color(165, 247, 229);
    this.color3 = color(242, 201, 139);
    this.color4 = color(245, 253, 224);

    //variables
    this.xSpeed = random(2, 3) * random(-1, 1);
    this.ySpeed = random(2, 3) * random(-1, 1);
  }
  setupCryo() {
    //appearance
    this.color1 = color(37, 152, 211);
    this.color2 = color(157, 219, 248);
    this.color3 = color(196, 77, 129);
    this.color4 = color(242, 252, 233);

    //variables
    this.xSpeed = random(1, 1.75) * random(-1, 1);
    this.ySpeed = random(1, 1.75) * random(-1, 1);
  }
  setupDendro() {
    //appearance
    this.color1 = color(112, 163, 102);
    this.color2 = color(196, 204, 176);
    this.color3 = color(240, 129, 104);
    this.color4 = color(247, 249, 219);

    //variables
    this.xSpeed = random(0.75, 1.5) * random(-1, 1);
    this.ySpeed = random(0.75, 1.5) * random(-1, 1);
  }
  setupElectro() {
    //appearance
    this.color1 = color(102, 70, 127);
    this.color2 = color(145, 81, 166);
    this.color3 = color(224, 142, 218);
    this.color4 = color(248, 250, 229);

    //variables
    this.xSpeed = random(2.25, 3.25) * random(-1, 1);
    this.ySpeed = random(2.25, 3.25) * random(-1, 1);
  }
  setupGeo() {
    //appearance
    this.color1 = color(63, 53, 45);
    this.color2 = color(123, 114, 103);
    this.color3 = color(238, 115, 89);
    this.color4 = color(245, 247, 219);

    //variables
    this.xSpeed = random(0.5, 1.5) * random(-1, 1);
    this.ySpeed = random(0.5, 1.5) * random(-1, 1);
  }
  setupHydro() {
    //appearance
    this.color1 = color(31, 163, 178);
    this.color2 = color(97, 213, 225);
    this.color3 = color(40, 158, 216);
    this.color4 = color(242, 252, 227);

    //variables
    this.xSpeed = random(1.25, 2) * random(-1, 1);
    this.ySpeed = random(1.25, 2) * random(-1, 1);
  }
  setupPyro() {
    //appearance
    this.color1 = color(173, 59, 0);
    this.color2 = color(246, 117, 21);
    this.color3 = color(255, 181, 72);
    this.color4 = color(246, 246, 219);

    //variables
    this.xSpeed = random(1.5, 2) * random(-1, 1);
    this.ySpeed = random(1.5, 2) * random(-1, 1);
  }
}

class ElementalReaction {
  constructor(x, y, t, r, g, b) {
    this.x = x;
    this.y = y;
    this.txt = t;
    this.txtSize = random(30, 40);
    this.color = color(r, g, b);
    //
    this.lifespan = 1.0;
    this.lifeReduction = random(0.01, 0.02);
    this.isDone = false;
  }
  update() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  display() {
    push();
    textAlign(CENTER);
    textSize(this.txtSize * this.lifespan);
    fill(this.color);
    strokeWeight(4);
    text(this.txt, this.x, this.y);
    pop();
  }
}
