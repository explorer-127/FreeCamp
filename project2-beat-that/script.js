// Global Variables 
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORES = 'GAME_STATE_COMPARE_SCORES';
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// Helper Function
var rollDice = function() {
  console.log('Control flow: start of rollDice()')
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1

  console.log('rollDice output, randomInteger: ', randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log('Control flow: start of rollDiceForPlayer()');
  var counter = 0
  while( counter < 2 ){
    playerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log('rollDiceforPlayer changes, playerRolls: ', playerRolls);
  return 'Welcome, Player " + currentPlayer + "<br><br>You rolled:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ". <br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

var getPlayerScore = function(playerInput){
  var playerScore;
    // input validation
    if ( playerInput != 1 && playerInput != 2){
      console.log('Control flow: input validation, invalid input... NOT 1 AND NOT 2');
      return "Error! Please only input '1' or '' to choose which dice to useas the first digit.<br><br> Your dice rolls are:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ".";
    }
    // input == 1
    if ( playerInput == 1){
      console.log('Control flow: input == 1');
      var playerScore = Number(String(playerRolls[0] + String(playerRolls[1]));
      return "Your chosen value is: " + playerScore
    }

    // input == 2
    if ( playerInput == 2){
      console.log('Control flow: input == 2');
      var playerScore = Number(String(playerRolls[1] + String(playerRolls[0]));
      return "Your chosen value is: " + playerScore
    }

    // Store playerScore in array
    allPlayerScore.push(playerScore);

    //clear current player rolls array
    currentPlayerRolls = [];
    return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayerScores = function(){
  compareMessage = "Player 1 score: " + allPlayerScore[0] + "<br>Player 2 score: " + allPlayerScore[1]
    // player 1 wins
    if ( allPlayerScore[0] > allPlayerScore[1] ){
      compareMessage = outMessage + "<br><br>Player 1 wins!";
    }

    // player 2 wins
    if ( allPlayerScore[0] > allPlayerScore[1] ){
      compareMessage = outMessage + "<br><br>Player 2 wins!";

    //tie
    if ( allPlayerScore[0] == allPlayerScore[1] ){
      compareMessage = outMessage + "<br><br>It's a tie!";
  }

  return compareMessage;
};

var resetGame = function(){
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScore = []; 
}

var main = function(input){
  console.log('Checking game state on submit click: ', gameState);
  console.log('Checking currentPlayer on submit click: ', currentPlayer);
  var outputmessage = '';

  if ( gameState == GAME_STATE_DICE_ROLL ){
    console.log('Control flow: gameState == GAME_STATE_DICE_ROLL');

    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ){
    console.log('Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER');

    // Call playerScore function
    outputMessage = getPlayerScore(input);


    if ( currentPlayer == 1 ){
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_CHOOSE_DICE_ORDER;
      return outputMessage + '<br><br>It is now player 2's turn!";"
    }

    if ( currentPlayer == 2){
      console.log("Control flow: end of player 2's turn, Next submit click will calculate score");
      gameState = GAME_STATE_COMPARE_SCORES;

      return outputMessage + "<br><br>Press submit to calulate scores!";
    }
  } 
  
  if ( gameState == GAME_STATE_COMPARE_SCORES){
    console.log('Control flow: gameState == GAME_STATE_COMPARE SCORES');

    outputMessage = comparePlayerScores();

    resetGame();
    console.log("Current player after reset: ", currentPlayer);
    console.log("Game state after reset: ", gameState);
    console.log("allPlayerScore array: ", allPlayerScore);

    return outputMessage;
}
