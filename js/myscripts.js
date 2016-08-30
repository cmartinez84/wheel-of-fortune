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
  console.log(occurrenceOfLetter.length * points);
  return occurrenceOfLetter.length * points;
  if (/[aeiou]/.test(letter)){

    return -250;

  }
  else{

    return occurrenceOfLetter.length * points;
  }
};

AnswerMaker.prototype.buyVowel = function(vowel){
  if (/[aeiou]/.test(vowel)) {
  this.letterCheck(vowel);

  }
}
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

var answers = [["Food & Drink", "fish and chips and chips and chips and chips and chips and chips and chips"],["Pop Songs", "all the single ladies"],["Movies", "gone with the wind"],["Television Shows", "rick and morty"],["Types of Fish", "king salmon"],["American Actors", "matthew mcconaughey"],["Portland Places", "hollywood theatre"],["Portland Celebrities", "isaac brock"],["Fashion Designers", "yves saint laurent"],["Rare Elements", "neodymium"],["Microscopic Animals", "tardigrade"],["Programming Languages", "javascript"],["Portland Beers", "upheaval ipa"],["comic Books", "guardians of the galaxy"],["New Television Networks", "viceland"]];

answers.forEach(function(answer){
  var newAnswer = new AnswerMaker(answer[0],answer[1]);
  answersArray.push(newAnswer);
});

Wheel.prototype.spin = function(wedges){
  var randomNumber = Math.floor((Math.random() * 23) + 1);
  var spinOutput = wedges[randomNumber];
  return spinOutput;
};

var sampleAnswer =  answersArray[0];
//User Interface
$(document).ready(function(){
  var wheel = new Wheel(wheelWedges);
  var wheelWedges = [300, 900, "Bankrupt", 600, 500, 300, "Lose Turn", 800, 350, 450, 700, 300, "Bankrupt", 5000, 600, 500, 300, 750, 800, 550, 400, 300, 900, 500];
  var player1;
  var player2;
  for(var i = 0; i <sampleAnswer.hiddenArray.length; i++){
    if((sampleAnswer.answerSplit[i] === " ")&& ((sampleAnswer.answerSplit.indexOf(" ",  ) > ((Math.floor(i/15))*15)+15)))  {
      console.log("what happened");
      $("#displayBoard").append('<br>');
    }
    if(sampleAnswer.hiddenArray[i] === " "){
       $("#displayBoard").append('<span class="blankSpace" type="text" name="name" id="tile'+ i +'">');
    } ///display spaces
    else{
      $("#displayBoard").append('<span class="tiles" type="text" name="name">'+sampleAnswer.answerSplit[i].toUpperCase()+'</span>');
    } ///display answer on board
  }


  //sampleAnswer.answerSplit.index()) <= 0

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
    $("#player-two").toggleClass("Selected");
    $("#spin").click(function(){
      var player1Spin = wheel.spin(wheelWedges);
      $("#player-one-score").text(player1.score);
      console.log("1 " + player1Spin);
      if (player1Spin === "Bankrupt"){
        player1.score = 0;
        player2Turn();
      } else if (player1Spin === "Lose Turn"){
        player2Turn();
      } else {
        $("#letterEntryForm").show();
      }
      $("#letterEntryForm").submit(function(event){
        event.preventDefault();
        var player1LetterGuess = $("input#letterEntryInput").val();
        player1LetterGuess = player1LetterGuess.toLowerCase();
        console.log(player1LetterGuess);
        sampleAnswer.letterCheck(player1LetterGuess, player1Spin);
      });
    });
  }
  var player2Turn = function(){
    $("button").off();
    $("#player-two").toggleClass("Selected");
    $("#player-one").toggleClass("Selected");
    $("#spin").click(function(){
      var player2Spin = wheel.spin(wheelWedges);
      $("#player-two-score").text(player2.score);
      console.log("2 " + player2Spin);
      if (player2Spin === "Bankrupt"){
        player2.score = 0;
        player1Turn();
      } else if (player2Spin === "Lose Turn"){
        player1Turn();
      } else {
        $("#letterEntryForm").show();
      }
      $("#letterEntryForm").submit(function(event){
        event.preventDefault();
        var player2LetterGuess = $("input#letterEntryInput").val();
        player2LetterGuess = player2LetterGuess.toLowerCase();
        console.log(player2LetterGuess);
        sampleAnswer.letterCheck(player2LetterGuess, player2Spin);
      });
    });
  }
});
var sampleAnswer =  answersArray[0];
