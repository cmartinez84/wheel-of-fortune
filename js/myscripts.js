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
  this.occurenceArray;
};

AnswerMaker.prototype.letterCheck = function(letter, points) {
  var occurrenceOfLetter = [];
  for(var i = 0; i < this.answerSplit.length; i ++){
    if((this.answerSplit[i] === letter) && this.guessedLetters.indexOf(letter) === -1){
      occurrenceOfLetter.push(i);
      this.hiddenArray[i] =letter;
      this.checkSolved();
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
    this.occurenceArray = occurrenceOfLetter;
    this.checkSolved();
    return -250;
  }
  else{
    console.log(points);
    console.log(occurrenceOfLetter.length * points);
    this.occurenceArray = occurrenceOfLetter;
    return occurrenceOfLetter.length * points;
  }
};

AnswerMaker.prototype.buyVowel = function(vowel){
  if (/[aeiou]/.test(vowel)) {
    return this.letterCheck(vowel);
  }
  else{
    alert("choose a consonant");
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

var answers = [["ada","ada"],["Food & Drink", "a bb ccc dddd ee f g h iii"],["Pop Songs", "all the single ladies"],["Movies", "gone with the wind"],["Television Shows", "rick and morty"],["Types of Fish", "king salmon"],["American Actors", "matthew mcconaughey"],["Portland Places", "hollywood theatre"],["Portland Celebrities", "isaac brock"],["Fashion Designers", "yves saint laurent"],["Rare Elements", "neodymium"],["Microscopic Animals", "tardigrade"],["Programming Languages", "javascript"],["Portland Beers", "upheaval ipa"],["comic Books", "guardians of the galaxy"],["New Television Networks", "viceland"]];
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
var randomAnswer = getRandomAnswer();
// var randomAnswer = answersArray[0];
console.log(randomAnswer);

///////////////////////////User Interface//////////////////////
$(document).ready(function(){
 var generateBoard = function(randomAnswer){
   for(var i = 0; i <randomAnswer.hiddenArray.length; i++){
    //  if((randomAnswer.answerSplit[i] === " ")&& ((randomAnswer.answerSplit.indexOf(" ",i  ) > ((Math.floor(i/15))*15)+15)))  {
     //
    //    $("#displayBoard").append('<br>');
    //  }
     if(randomAnswer.hiddenArray[i] === " "){
        $("#displayBoard").append('<span class="blankSpace" type="text" name="name" id="tile'+ i +'">');
     } ///display spaces
     else{
       $("#displayBoard").append('<span id="tile'+ i +'" class="tiles" type="text" name="name">'+randomAnswer.hiddenArray[i].toUpperCase()+'</span>');
     } ///display answer on board
   }
   $("#clue").text(randomAnswer.clue);
 }///end generarte Board function
 var changeBoard = function(){
    randomAnswer.occurenceArray.forEach(function(i){
      $("#tile" + i).text(randomAnswer.answerSplit[i])
      $("#tile" + i).addClass("animated bounceIn");

    });
 }

  $("#playerEntryForm").submit(function(event){
    $("#playersAvatars").addClass("translateAvatars");
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
    player1Turn();
  });

  var player1Spin;
  var player1Turn = function(){
    $("button").off();
    $("#player-one").toggleClass("selected");
    $("#player-two").toggleClass("selected");
    $("#spin").click(function(){
      player1Spin = spin(wheelWedges);
      $("span#currentSpin").text(player1Spin);
      console.log("this is player 1's spin" + player1Spin)
      if (player1Spin === "Bankrupt"){
        player1.score = 0;
        $("player-one-score").text(player1.score);
        player2Turn();
      } else if (player1Spin === "Lose Turn"){
        player2Turn();
      }
    });
    $("#enterLetter").click(function(){
        var player1LetterGuess = $("input#letterEntryInput").val();
        player1LetterGuess = player1LetterGuess.toLowerCase();
        var roundScore =randomAnswer.letterCheck(player1LetterGuess, player1Spin);
        player1.score += roundScore;
        $("#player-one-score").text(player1.score);
        if(roundScore ===0){
          player2Turn();
        }
        else{
          player1Turn();
          changeBoard();
        }
    });
    $("button#vowel").click(function(){
      var vowelInput = $("#vowelInput").val();
      var roundScore = randomAnswer.buyVowel(vowelInput);
      changeBoard();
      player1.score += roundScore;
      $("#player-one-score").text(player1.score);
      alert(roundScore);
    });
  }


  var player2Spin;
  var player2Turn = function(){
    $("button").off();
    $("#player-one").toggleClass("selected");
    $("#player-two").toggleClass("selected");
    $("#spin").click(function(){
      player2Spin = spin(wheelWedges);
      $("span#currentSpin").text(player2Spin);
      console.log("this is player 2's spin" + player2Spin)
      if (player2Spin === "Bankrupt"){
        player2.score = 0;
        $("#player-two-score").text(player2.score);
        player1Turn();
      } else if (player2Spin === "Lose Turn"){
        player1Turn();
      }
    });
    $("#enterLetter").click(function(){
        var player2LetterGuess = $("input#letterEntryInput").val();
        player2LetterGuess = player2LetterGuess.toLowerCase();
        var roundScore =randomAnswer.letterCheck(player2LetterGuess, player2Spin);
        player2.score += roundScore;
        $("#player-two-score").text(player2.score);

        if(roundScore ===0){
          player1Turn();
        }
        else{
          player2Turn();
          changeBoard();
        }
    });
  }////end player 1

});
