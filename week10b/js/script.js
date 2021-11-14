function showAlert() {
  alert('whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or take up arms against a sea of trouble. and by opposing, end them. to die, to sleep - no more- and by a sleep, to say, we end the heartache and thousand natural shocks that flesh is heir to. tis a consummation devoutly to be sought. to die, to slee, to sleep perchance to dream, ay theres the rub.');

}

let x = 0;
let g =0;

function addDiv(){
  //create html element
  //change properties
  //attach to document
  let newElt = document.createElement ("div");
  newElt.style.backgroundColor = "light grey"
  newElt.style.width = "50px";
  newElt.style.height = "50px";
  newElt.style.position = "absolute";
  newElt.style.right = "300px";
  newElt.style.top = "150px";

  //attach the elt to the document
  //document.body.appendChild(newElt);
  document.getElementById('box').appendChild(newElt);

}


function change(){
  // x += 20;
  g += 20;
  let b = document.getElementById('box');
  console.log(document);
  b.innerHTML = "to sleep perchance to dream";
  b.style.left = x + "px";
  b.style.backgroundColor = "rgb(255,"+g+", 255)";
}
