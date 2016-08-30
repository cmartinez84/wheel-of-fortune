//Business Logic


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

  if (/[aeiou]/.test(letter)){
    return -250;
  }
  else{
    console.log(points);
    console.log(occurrenceOfLetter.length * points);
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

var answers = [["Food & Drink", "a bb ccc dddd ee f g h iii"],["Pop Songs", "all the single ladies"],["Movies", "gone with the wind"],["Television Shows", "rick and morty"],["Types of Fish", "king salmon"],["American Actors", "matthew mcconaughey"],["Portland Places", "hollywood theatre"],["Portland Celebrities", "isaac brock"],["Fashion Designers", "yves saint laurent"],["Rare Elements", "neodymium"],["Microscopic Animals", "tardigrade"],["Programming Languages", "javascript"],["Portland Beers", "upheaval ipa"],["comic Books", "guardians of the galaxy"],["New Television Networks", "viceland"]];
var wheelWedges = [300, 900, "Bankrupt", 600, 500, 300, "Lose Turn", 800, 350, 450, 700, 300, "Bankrupt", 5000, 600, 500, 300, 750, 800, 550, 400, 300, 900, 500];

answers.forEach(function(answer){
  var newAnswer = new AnswerMaker(answer[0],answer[1]);
  answersArray.push(newAnswer);
});

var spin = function(){
  var randomNumber = Math.floor((Math.random() * 23) + 1);
  var spinOutput = wheelWedges[randomNumber];
  return spinOutput;
};

var player1;
var player2;
var getRandomAnswer = function(){
   var randomNumber =Math.floor((Math.random() * 15) + 1);
   return answersArray[randomNumber];
};

//User Interface
$(document).ready(function(){
 var generateBoard = function(randomAnswer){
   for(var i = 0; i <randomAnswer.hiddenArray.length; i++){
     if((randomAnswer.answerSplit[i] === " ")&& ((randomAnswer.answerSplit.indexOf(" ",i  ) > ((Math.floor(i/15))*15)+15)))  {

       $("#displayBoard").append('<br>');
     }
     if(randomAnswer.hiddenArray[i] === " "){
        $("#displayBoard").append('<span class="blankSpace" type="text" name="name" id="tile'+ i +'">');
     } ///display spaces
     else{
       $("#displayBoard").append('<span class="tiles" type="text" name="name">'+randomAnswer.answerSplit[i].toUpperCase()+'</span>');
     } ///display answer on board
   }
 }

  var randomAnswer;
  $("#playerEntryForm").submit(function(event){
    randomAnswer = getRandomAnswer();
    generateBoard(randomAnswer);
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
  var player1Spin;
  var player1Turn = function(){
    $("button").off();
    $("#player-one").toggleClass("Selected");
    $("#player-two").toggleClass("Selected");
    $("#spin").click(function(){
      player1Spin = spin(wheelWedges);
      console.log("this is player 1's spin" + player1Spin)
      $("#player-one-score").text(player1.score);
      console.log("1 " + player1Spin);
      if (player1Spin === "Bankrupt"){
        player1.score = 0;
        player2Turn();
      } else if (player1Spin === "Lose Turn"){
        player2Turn();
      } else {
        $("#letterEntryForm").show();
        $("#letterEntryForm").submit(function(event){
          event.preventDefault();
          var player1LetterGuess = $("input#letterEntryInput").val();
          player1LetterGuess = player1LetterGuess.toLowerCase();
          randomAnswer.letterCheck(player1LetterGuess, player1Spin);
          player1Turn();
        });
      }
    })  ;
  }
  var player2Spin;
  var player2Turn = function(){
    $("button").off();
    $("#player-two").toggleClass("Selected");
    $("#player-one").toggleClass("Selected");
    $("#spin").click(function(){
      player2Spin = spin(wheelWedges);
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

        randomAnswer.letterCheck(player2LetterGuess, player2Spin);
        player2Turn();
      });
    });
  }
});
