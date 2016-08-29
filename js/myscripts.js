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
  });
  this.guessedLetters=[];
  this.wrongGuesses=[];
};

AnswerMaker.prototype.letterCheck = function(letter) {
  var occurrenceOfLetter = [];
  for(var i = 0; i < this.answerSplit.length; i ++){
    if((this.answerSplit[i] === letter) && this.guessedLetters.indexOf(letter) === -1){
      occurrenceOfLetter.push(i);
      this.hiddenArray[i] =letter;
      console.log(letter);
    }
    else if((this.answerSplit.indexOf(letter) === -1)&&(this.wrongGuesses.indexOf(letter)) === -1){
      this.wrongGuesses.push(letter);
    }
  }
  if(this.guessedLetters.indexOf(letter) === -1){
    this.guessedLetters.push(letter);
  }
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

  $("#playerEntryForm").submit(function(event){
    event.preventDefault();
    var player1Name = $("input#player1Input").val();
    var player2Name = $("input#player2Input").val();
    console.log(player1Name);
    console.log(player2Name);
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    $("#player-one").text(player1Name);
    $("#player-two").text(player2Name);
    $("#player-one-score").text(player1.score);
    $("#player-two-score").text(player2.score);
    $("#spin").show();
    $("#playerEntryForm").hide();
  });

  $("#spin").click(function(){

    wheel.spin(wheelWedges);
  });


  $("#letterEntryForm").submit(function(event){

  });


});


var sampleAnswer =  answersArray[0];
