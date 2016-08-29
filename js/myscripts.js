//Business Logic
function Wheel (wedges){
  this.wedges = wedges;
}

function Player(name){
  this.name = name;
  this.score = 0;
  this.avatar = "";
};

function AnswerMaker (clue, answer){
  this.clue = clue;
  this.answer = answer;
  this.answerSplit = answer.split("");
  this.hiddenArray = this.answerSplit.map(function(i){
    if(i !== " "){
      return "_";
    }
    else{
      return " ";
    }
  })
};



var consonants = ["b","c","d","f","g","h","j","k","l", "m","n","p","q","r","s","t","v","w","x","y","z"];
var vowels = ["a","e","i","o","u"];
var answersArray = [];


var answers = [["Food & Drink", "Fish And Chips"],["Pop Songs", "All My Single Ladies"],["Movies", "Gone With the Wind"]];

answers.forEach(function(answer){
  var newAnswer = new AnswerMaker(answer[0],answer[1]);
  answersArray.push(newAnswer);
});

Wheel.prototype.spin = function(wedges){
  var randomNumber = Math.floor((Math.random() * 23) + 1);
  console.log(randomNumber);
  var spinOutput = wedges[randomNumber];
  console.log(spinOutput);
  if (spinOutput === "Bankrupt"){
    player.score = 0;
    //Change Player
  } else if (spinOutput === "Lose Turn"){
    //Change Player
  } else {
    return spinOutput;
    //Change Player
    console.log(spinOutput);
  }
};


//User Interface
$(document).ready(function(){
  var wheel = new Wheel(wheelWedges);
  var wheelWedges = [300, 900, "Bankrupt", 600, 500, 300, "Lose Turn", 800, 350, 450, 700, 300, "Bankrupt", 5000, 600, 500, 300, 750, 800, 550, 400, 300, 900, 500];


  wheel.spin(wheelWedges);

  $("#letterEntryForm").submit(function(event){

  });
  $("#spin").click(function(){
    wheel.spin(wheelWedges);
  });
});


var sampleAnswer =  answersArray[0];
