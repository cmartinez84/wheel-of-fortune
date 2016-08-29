function Player(name){
  this.name = name;
  this.score = 0;
  this.avatar = "";
};

function AnswerMaker (clue, answer){
  this.clue = clue;
  this.answer = answer;
  this.hiddenAnswerArray = [];

};

AnswerMaker.prototype.hideAnswer = function(){
  var answerLetter = this.answer.split("");
  // answerLetter.map(hiddenAnswerArray.push("_"));
  //   // a-zA-Z
  //   console.log("this.hiddenAnswerArray");
  };

var consonants = ["b","c","d","f","g","h","j","k","l", "m","n","p","q","r","s","t","v","w","x","y","z"];
var vowels = ["a","e","i","o","u"];
var answersArray = [];

var answers = [["Food & Drink", "Fish And Chips"],["Pop Songs", "All My Single Ladies"],["Movies", "Gone With the Wind"]];

answers.forEach(function(answer){
  var newAnswer = new AnswerMaker(answer[0],answer[1]);
  answersArray.push(newAnswer);
});


console.log(answersArray);
