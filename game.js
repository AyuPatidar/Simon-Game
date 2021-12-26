var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// to start game
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// to play sound of button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to animate the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// for functions related to button clicked by user
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// To get the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// to check answers of user
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to restart.");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }
}

// to restart game
function startover() {
  level = 0;
  gamePattern = [];
  started = false;
}