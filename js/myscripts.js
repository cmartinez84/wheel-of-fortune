//Business Logic
function Wheel (wedges){
  this.wedges = wedges;
}
Wheel.prototype.spin = function(wedges){
  var randomNumber = Math.floor((Math.random() * 23) + 1);
  console.log(randomNumber);
  var spinOutput = wedges[randomNumber];
  console.log(spinOutput);
}



//User Interface
var wheel = new Wheel(wheelWedges);
var wheelWedges = [300, 900, "Bankrupt", 600, 500, 300, "Lose Turn", 800, 350, 450, 700, 300, "Bankrupt", 5000, 600, 500, 300, 750, 800, 550, 400, 300, 900, 500];

wheel.spin(wheelWedges);
