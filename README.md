# _Wheel Of Fortune_

#### _Online Wheel of Fortune game for Epicodus, Aug 30, 2016_

#### By _**Chris Martinez, Blake Scala, Ryan Vinyard, Stephen Burden, and Larry Tunseth**_

## Description

_This website is a Wheel of Fortune style game. Like hangman, players must attempt to guess a hidden phrase. Correct guesses are awarded with values between $300 to $5000, determined by spinning a wheel. Guessing the entire phrase correctly awards you even more points. Players may also land on "Bankrupt" or "Lose a Turn" during their spin resuting in a wiped score or a loss of guess._

## Setup/Installation Requirements

* _Clone this repository_
* _Open an HTTP server in the cloned directory_
* _This page requires bootstrap, jquery, scripts.js, and styles.css to run_
* _Link to repository: 'https://github.com/cmartinez84/wheel-of-fortune'_


## Known Bugs

_No known bugs have been found to date._

## Support and contact details

_Feel free to reach out to Larry Tunseth at larrydeantun@gmail.com or !EMAILS! with questions or concerns, or requests to work on this project yourself!_

## Technologies Used

_HTML, CSS, Bootstrap, JQuery, JavaScript_

## Specifications

| Behavior | Input Ex. | Output Ex. |
| --- | --- | --- |
| Users can enter two player names |  Submit: Mike, Dave |  Player1: Mike, Player2: Dave |
| A category/clue is displayed when game begins | Sumbit |  Category: "Best US Cities" |
| Game displays phrase with letters hidden  | Phrase: "Portland, Oregon" |  Phrase: "________, ______" |
| A player spins the wheel for a point value or bankrupt/lose a turn  | Spin the wheel  | Face Value: "$300"  |
| A player guesses a consonant and its displayed on the board if correct | Guessed letter: R  | Phrase: "__r_____, _r____ |
| Player is awarded the face value of the wheel for every letter guessed correctly | There's 2 R's | Mike's total points: $600 |
| If a player guesses correctly they spin again. |  Mike was correct | Spin Again  |
| A player is allowed to guess vowels for a charge of $250 | Guessed letter: I | There's no I's  | Mike's total points: $350 |
| If a player guesses incorrectly its player 2's turn | Mike was incorrect | Dave Spins |
| If a player lands on "Lose a turn" their turn is over and it's the next players turn | Face Value: "Lose a Turn" | It's Mikes turn |
| If a player lands on "Bankrupt" it wipes their total score and they lose their turn | Face Value: "Bankrupt" | Mike's total points: $0, it's Dave's turn|
| If a player guesses the entire phrase they recieve $2,500 for each remaining letter | Guessed Phrase: "Portland, Oregon" | $27,500 |
### License


Copyright (c) 2016 **_MIT Licence_**
