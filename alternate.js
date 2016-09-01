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
