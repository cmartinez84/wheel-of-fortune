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
  this.solvedStatus = 1;
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
// AnswerMaker.prototype.idLikeToSolveThePuzzle = function (guess, points){
//   var guessString = guess.join("");
//   var hiddenString = this.hiddenArray.join("");
//   if(guessString === this.answer){
//     return ((hiddenString.replace(/[^_]/g, "").length)*points);
//   }
//   else{
//     console.log("your phrase does not match. boo");
//     //this will end players turn
//   }
// }

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


var answers = [["ada","ada"],["Food & Drink", "fish and chips"],["Pop Songs", "all the single ladies"],["Movies", "gone with the wind"],["Television Shows", "rick and morty"],["Types of Fish", "king salmon"],["American Actors", "matthew mcconaughey"],["Portland Places", "hollywood theatre"],["Portland Celebrities", "isaac brock"],["Fashion Designers", "yves saint laurent"],["Rare Elements", "neodymium"],["Microscopic Animals", "tardigrade"],["Programming Languages", "javascript"],["Portland Beers", "upheaval ipa"],["comic Books", "guardians of the galaxy"],["New Television Networks", "viceland"],["Things That Hurt", "broken femur"],["Cartoon Catchphrases", "eat my shorts"],["Food Containers", "soy sauce packet"],["Holliday Foods", "candy corn"],["Parenting Tools", "baby monitor"],["Winter Activities", "ice fishing"],["Things Matt Damon Said", "how do you like them apples"],["Good Times", "have a blast"],["Idioms", "chip off the old block"],["Famous Places", "the eiffel tower"]];

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
   var randomNumber =Math.floor((Math.random() * 25) + 1);
   return answersArray[randomNumber];
};
var randomAnswer = getRandomAnswer();
// var randomAnswer = answersArray[0];
console.log(randomAnswer);

///////////////////////////User Interface//////////////////////
$(document).ready(function(){
  $(".arrows").hide();

 var generateBoard = function(randomAnswer){
   for(var i = 0; i <randomAnswer.hiddenArray.length; i++){
    //  if((randomAnswer.answerSplit[i] === " ")&& ((randomAnswer.answerSplit.indexOf(" ",i  ) > ((Math.floor(i/15))*15)+15)))  {
     //
    //    $("#displayBoard").append('<br>');
    //  }
     if(randomAnswer.hiddenArray[i] === " "){
        $("#displayBoard").append('<span class="blankSpace" type="text" name="name" id="tile'+ i +'"></span>');
     } ///display spaces
     else{
       $("#displayBoard").append('<input disabled id="tile'+ i +'" class="tiles" type="text" name="name">');
     } ///display answer on board
   }
   $("#clue").text(randomAnswer.clue);
 }///end generarte Board function
 var changeBoard = function(){
    randomAnswer.occurenceArray.forEach(function(i){
      $("#tile" + i).val(randomAnswer.answerSplit[i])
      $("#tile" + i).addClass("animated bounceIn");
    });
 }
 var idLikeToSolveThePuzzle = function(player, points){
  $("input[id^='tile']").removeAttr("disabled");
    var hiddenString = randomAnswer.hiddenArray.join("");
    hiddenString = hiddenString.replace(/\s/g, '');
    hiddenString= hiddenString.replace(/[_-]/g, "");
    console.log(hiddenString);
  $("input[id^='tile']").keyup(function(){
    var solveAttempt="";
    var noSpaceAnswer = randomAnswer.answer.replace(/\s/g, '');
    for(var i =0; i<randomAnswer.hiddenArray.length; i++){
      var try1 = $("#tile"+i).val();
      solveAttempt = solveAttempt + try1;
      if(solveAttempt.length === noSpaceAnswer.length){
        if(noSpaceAnswer === solveAttempt){
          // alert("hurray");
          // $(".tiles").addClass("selected");
          player.score += (points * (noSpaceAnswer.length - hiddenString.length));
          var compare1 = solveAttempt;
          var compare2 = randomAnswer.answerSplit.join("");
          if(compare1 === compare2){
            $("input[id^='tile']").remove();
            $("span").remove();
            randomAnswer = getRandomAnswer();
            generateBoard(randomAnswer);
          }
        }
        else{
          alert("you suck");
          $("input[id^='tile']").remove();
          generateBoard(randomAnswer);
          changeBoard();
          return "unsolved";
        }
      }
    }
  });
}
var roundOver = function(){
  var compare1 = randomAnswer.hiddenArray.join("");
  var compare2 = randomAnswer.answerSplit.join("");
  if(compare1 === compare2){
    $("input[id^='tile']").remove();
    $("span").remove();
    randomAnswer = getRandomAnswer();
    generateBoard(randomAnswer);
  }
}

  $("#playerEntryForm").submit(function(event){
    $(".arrow1").toggle();
    $("#playersDiv").hide();
    $("#spinDiv").show();
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
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player1.score = 0;
        $("player-one-score").text(player1.score);
        player2Turn();
      } else if (player1Spin === "Lose Turn"){
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player2Turn();
      } else {
        $("#letterDiv").show();
        $("#spin").attr("disabled","disabled");
      }
    });
    $("#enterLetter").click(function(){
      $("#letterDiv").hide();
      $("#spin").removeAttr("disabled");
      var player1LetterGuess = $("input#letterEntryInput").val();
      player1LetterGuess = player1LetterGuess.toLowerCase();
      $("#lettersGuessed").append(player1LetterGuess);
      var roundScore =randomAnswer.letterCheck(player1LetterGuess, player1Spin);
      player1.score += roundScore;
      $("#player-one-score").text(player1.score);
      roundOver();
      if(roundScore ===0){
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player2Turn();
      }
      else{
        player1Turn();
        changeBoard();
      }
    });
    $("button#vowel").click(function(){
      $("#letterDiv").hide();
      $("#spin").removeAttr("disabled");
      var vowelInput = $("#vowelInput").val();
      var roundScore = randomAnswer.buyVowel(vowelInput);
      changeBoard();
      player1.score += roundScore;
      $("#player-one-score").text(player1.score);
      alert(roundScore);
    });
    $("#finish").click(function(){
      $("#letterDiv").hide();
      idLikeToSolveThePuzzle(player1, player1Spin);
      $("#spin").removeAttr("disabled");
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
      console.log("this is player 2's spin" + player2Spin);
      if (player2Spin === "Bankrupt"){
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player2.score = 0;
        $("#player-two-score").text(player2.score);
        player1Turn();
      } else if (player2Spin === "Lose Turn"){
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player1Turn();
      } else{
        $("#letterDiv").show();
        $("#spin").attr("disabled","disabled");
      }
    });
    $("#enterLetter").click(function(){
      $("#spin").removeAttr("disabled");
      $("#letterDiv").hide();
      var player2LetterGuess = $("input#letterEntryInput").val();
      player2LetterGuess = player2LetterGuess.toLowerCase();
      $("#lettersGuessed").append(player2LetterGuess);
      var roundScore =randomAnswer.letterCheck(player2LetterGuess, player2Spin);
      player2.score += roundScore;
      $("#player-two-score").text(player2.score);
      if(roundScore ===0){
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player1Turn();
      }
      else{
        player2Turn();
        changeBoard();
      }
    });

    $("button#vowel").click(function(){
      $("#spin").removeAttr("disabled");
      $("#letterDiv").hide();
      var vowelInput = $("#vowelInput").val();
      var roundScore = randomAnswer.buyVowel(vowelInput);
      changeBoard();
      player2.score += roundScore;
      $("#player-one-score").text(player2.score);
      alert(roundScore);
    });
    $("#finish").click(function(){
      idLikeToSolveThePuzzle(player2, player2Spin);
      // $("#spin").removeAttr("disabled");
      // $("#letterDiv").hide();
    });
  };
});
