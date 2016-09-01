//Business Logic


function Player(name){
  this.name = name;
  this.score = 0;
  this.avatar = "";
  this.spin =0;
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
  this.occurenceArray=[];
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
    console.log("this is how many points you should be getting "+ occurrenceOfLetter.length * points);
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


var answers = [["Food & Drink", "fish and chips"],["Pop Songs", "all the single ladies"],["Movies", "gone with the wind"],["Television Shows", "rick and morty"],["Types of Fish", "king salmon"],["American Actors", "matthew mcconaughey"],["Portland Places", "hollywood theatre"],["Portland Celebrities", "isaac brock"],["Fashion Designers", "yves saint laurent"],["Rare Elements", "neodymium"],["Microscopic Animals", "tardigrade"],["Programming Languages", "javascript"],["Portland Beers", "upheaval ipa"],["comic Books", "guardians of the galaxy"],["New Television Networks", "viceland"],["Things That Hurt", "broken femur"],["Cartoon Catchphrases", "eat my shorts"],["Food Containers", "soy sauce packet"],["Holliday Foods", "candy corn"],["Parenting Tools", "baby monitor"],["Winter Activities", "ice fishing"],["Things Matt Damon Said", "how do you like them apples"],["Good Times", "have a blast"],["Idioms", "chip off the old block"],["Famous Places", "the eiffel tower"]];

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

var player1="";
var player2="";
var getRandomAnswer = function(){
   var randomNumber =Math.floor((Math.random() * 25) + 1);
   return answersArray[randomNumber];
};
var randomAnswer = getRandomAnswer();

//var randomAnswer = answersArray[0];
console.log(randomAnswer);

///////////////////////////User Interface//////////////////////
$(document).ready(function(){
  $(".arrows").hide();

var updateScores = function(){
  if(isNaN(player1.score)){
    player1.score = 0;
    alert("was not a number player 1");
  }
  if(isNaN(player2.score)){
    player2.score = 0;
    alert("was not a number player 2");
  }
  $("#player-one-score").text(player1.score);
  $("#player-two-score").text(player2.score);
}
 var generateBoard = function(randomAnswer){
   var counter = 1;
   for(var i = 0; i <randomAnswer.hiddenArray.length; i++){
     var nextIndex = (((Math.floor(i/10))*10)+10);
     var nextSpace1 = randomAnswer.answerSplit.indexOf(" ", i);
     if(randomAnswer.answerSplit[i] === " "){
       counter +=1;
       if(counter % 2 === 0){
          $("#displayBoard").append('<br>');
       }
     }
    //  var spaceArray = [];
    //  if ((randomAnswer.answerSplit[i]===" ")){
    //    spaceArray.push(i);
    //  }
    //  for(var i = 0; i <spaceArray.length; i++){
    //    if(i%2===0){
    //    $("#displayBoard").append('<br>')
    //    }
    //  };
    //  if((randomAnswer.answerSplit[i]===" ") && (nextSpace1 < nextIndex)) {
    //    var nextSpace = randomAnswer.answerSplit.indexOf(" ", i);
    //    console.log("this is the next space" + nextSpace);
    //   //  console.log(((Math.floor(i/15))*15)+15);
    //    $("#displayBoard").append('<br>');
    //  }
     if(randomAnswer.hiddenArray[i] === " "){
        $("#displayBoard").append('<span class="blankSpace" type="text" name="name" id="tile'+ i +'"></span>');
     } ///display spaces
     else{
       $("#displayBoard").append('<input maxlength="1" disabled id="tile'+ i +'" class="tiles" type="text" name="name">');
     } ///display answer on board
   }
   $("#clue").text(randomAnswer.clue);
 }///end generarte Board function
 var changeBoard = function(){
    randomAnswer.occurenceArray.forEach(function(i){
      $("#tile" + i).val(randomAnswer.answerSplit[i])
      $("#tile" + i).addClass("animated bounceIn");
      var random1 = Math.floor(Math.random() * 35);
      var random2 = Math.floor(Math.random() * 35);
      $("tile" + i).addClass("animated hinge");
    });
 }
 var idLikeToSolveThePuzzle = function(player, points, nextPlayer){
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
            $("input[id^='tile']").remove();
            $(".blankSpace").remove();
            $("br").remove();
            randomAnswer = "";
            randomAnswer = getRandomAnswer();
            generateBoard(randomAnswer);
            console.log("somebody won");
            updateScores();
            playerTurn(player);
            return;
        }
        else{
          
          alert("haha, you need to refresh the page");
          $("input[id^='tile']").remove();
          generateBoard(randomAnswer);
          changeBoard();
          console.log(solveAttempt+ "from ELSE");
          updateScores();
          playerTurn(nextPlayer);
          return;
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
    $(".blankSpace").remove();
    $("br").remove();
    randomAnswer = "";
    randomAnswer = getRandomAnswer();
    generateBoard(randomAnswer);
    $("#lettersGuessed").remove();
    playerTurn(player1);
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
    $(".scoreGlow").append("<span id='currentSpin'></span>");

    playerTurn(player1);
  });


  var playerTurn = function(player){
    updateScores();
    $("button").off();
    var nextPlayer="";
    if( player === player1){
      nextPlayer=player2;
    }
    if( player === player2){
      nextPlayer=player1;
    }
    $("#spin").click(function(){
      $(this).off();
      var playerSpin =0;
      var playerSpin = spin();
      console.log(playerSpin);
      $("span#currentSpin").text(playerSpin);
      if (playerSpin === "Bankrupt"){
        var playerSpin =0;
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        player.score = 0;
        updateScores();
        playerTurn(nextPlayer);
      } else if (playerSpin === "Lose Turn"){
        var playerSpin =0;
        $(".arrow1").toggle();
        $(".arrow2").toggle();
        playerTurn(nextPlayer);
      } else {
        $("#letterDiv").show();
        $("#spin").attr("disabled","disabled");
      }
      $("#enterLetter").click(function(){
        $(this).off();
        $("#letterDiv").hide();
        $("#spin").removeAttr("disabled");
        var letterGuess = $("input#letterEntryInput").val();
        var letterGuess = letterGuess.toLowerCase();
        $("#lettersGuessed").append(letterGuess);
        var roundScore = 0;
        roundScore =randomAnswer.letterCheck(letterGuess, playerSpin);
        console.log("tis is round score"+roundScore);
        player.score += roundScore;
        updateScores();
        roundOver();
        if(roundScore ===0){
          $(".arrow1").toggle();
          $(".arrow2").toggle();
          playerTurn(nextPlayer);
        }
        else{
          playerTurn(player);
          changeBoard();
        }
      });
      $("#finish").click(function(){
        $(this).off();
        $("#letterDiv").hide();
        var getPlayerScore = player.score;
        console.log("what is players score"+getPlayerScore);
        idLikeToSolveThePuzzle(player, playerSpin, nextPlayer);
        $("#spin").removeAttr("disabled");
      });



    });


  }
});
