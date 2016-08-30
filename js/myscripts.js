//Business Logic
function Wheel (wedges){
  this.wedges = wedges;
}

function Player(name){
  this.name = name;
  this.score = 0;
  this.avatar = "";
  // this.spinNumber = spinNumber;
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

AnswerMaker.prototype.letterCheck = function(letter, points) {
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
  return occurrenceOfLetter.length * points;
  console.log(occurrenceOfLetter.length * points);
};

AnswerMaker.prototype.idLikeToSolveThePuzzle = function (guess, points){
  var guessString = guess.join("");
  var hiddenString = this.hiddenArray.join("");
  if(guessString === this.answer){
    return ((hiddenString.replace(/[^_]/g, "").length)*points);
  }
  else{
    console.log("your phrase does not match. boo");
    //this will end players turn
  }
}

AnswerMaker.prototype.checkSolved = function(){
  if (this.hiddenArray.indexOf("_") === -1){
    alert("you are  a winner!");
  }
  else{
    console.log("you aren't winning");
  }
}

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
  var spinOutput = wedges[randomNumber];
  return spinOutput;
};


//User Interface
$(document).ready(function(){
  var wheel = new Wheel(wheelWedges);
  var wheelWedges = [300, 900, "Bankrupt", 600, 500, 300, "Lose Turn", 800, 350, 450, 700, 300, "Bankrupt", 5000, 600, 500, 300, 750, 800, 550, 400, 300, 900, 500];
  var player1;
  var player2;
  $("#playerEntryForm").submit(function(event){
    event.preventDefault();
    var player1Name = $("input#player1Input").val();
    var player2Name = $("input#player2Input").val();
    player1 = new Player(player1Name);
    player2 = new Player(player2Name);
    $("#player-one").text(player1Name);
    $("#player-two").text(player2Name);
    $("#player-one-score").text(player1.score);
    $("#player-two-score").text(player2.score);
    $("#spin").show();
    $("#playerEntryForm").hide();
    player1Turn();
  });

  var player1Turn = function(){
    $("button").off();
    $("#player-one").toggleClass("Selected");
    $("#player-one").toggleClass("Selected");
    $("#spin").click(function(){
      var player1Spin = wheel.spin(wheelWedges);
      $("#player-one-score").text(player1.score);
      console.log(player1Spin);
      console.log(player1.score);
      if (player1Spin === "Bankrupt"){
        player1.score = 0;
        player2Turn();
      } else if (player1Spin === "Lose Turn"){
        player2Turn();
      } else {
        //Go to guess board.
        $("#letterEntryForm").show();
      }
      $("#letterEntryForm").submit(function(event){
        event.preventDefault();
        var player1LetterGuess = $("input#letterEntryInput").val();
        console.log(player1LetterGuess);
        console.log(player1Spin);
        sampleAnswer.letterCheck(player1LetterGuess, player1Spin);
      });
    });
  }
  var player2Turn = function(){
    $("button").off();
    $("#player-two").toggleClass("Selected");
    $("#player-two").toggleClass("Selected");
    $("#spin").click(function(){
      var player2Spin = wheel.spin(wheelWedges);
      $("#player-two-score").text(player2.score);
      if (player2Spin === "Bankrupt"){
        player2.score = 0;
        player1Turn();
      } else if (player2Spin === "Lose Turn"){
        player1Turn();
      } else {
        //Go to guess board.
        $("#letterEntryForm").show();
      }
      $("#letterEntryForm").submit(function(event){
        event.preventDefault();
        var player2LetterGuess = $("input#letterEntryInput").val();
        console.log(player2LetterGuess);
        console.log(player2Spin);
        sampleAnswer.letterCheck(player2LetterGuess, player2Spin);
      });
    });
  }
});

var sampleAnswer =  answersArray[0];
