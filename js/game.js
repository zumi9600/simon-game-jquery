// All required variables for the game
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; //This array will store the pattern generated  by nextSequence()
var userClickedPattern = []; //This array will store the pattern generated  by user clicks
var started = false;
var level = 0;
// This event listener starts the game when the user press a key
$(document).keydown(function() {
  if (!started) {
    nextSequence();
  }
  started = true;
});
//This will be executed on click event
$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//This will generate new sequence by using random number
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
//Plays sound of a button
function playSound(name) {
  var clickSound = new Audio("sounds/" + name + ".mp3");
  clickSound.play();
}
//Shows animation effects of buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//Restarts the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
//Checks the whether the game pattern is equal to user-clicked pattern or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var wrongAnswerSound = new Audio("sounds/wrong.mp3");
    wrongAnswerSound.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
