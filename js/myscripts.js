function AnswerMaker (clue, answer){
  this.clue = clue;
  this.answer = answer;
}
var answersArray = [];
var answers = [["Food & Drink", "Fish And Chips"],["Pop Songs", "All My Single Ladies"],["Movies", "Gone With the Wind"]];

answers.forEach(function(answer){
  var newAnswer = new AnswerMaker(answer[0],answer[1]);
  answersArray.push(newAnswer);
});

console.log(answersArray);
