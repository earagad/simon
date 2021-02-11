

var buttonColors = ["red", "blue", "green", "yellow"]

// we need both so we can compare one to the other
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var blueAudio = new Audio("sounds/blue.mp3");
var greenAudio = new Audio("sounds/green.mp3");
var redAudio = new Audio("sounds/red.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");

// Press any key once website has loaded
$(document).on("keypress", function() {
	nextSequence();
	$(document).off("keypress");
})

function nextSequence() {
	// changes level in h1
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor((Math.random() * 4));
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
	level++;
}


$(".btn").on("click", function() {

	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);
	// nextSequence();
})


function checkAnswer(currentLevel) {

	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
		setTimeout(function() {
			nextSequence()
		},	1000);
		userClickedPattern = [];
		}
	} else  gameOver();
	// if (JSON.stringify(gamePattern) !== JSON.stringify(userClickedPattern)) {
	// 	gameOver();
	// } else nextSequence();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed")
	}, 100);

}


function gameOver() {
	$("h1").text("Game Over, Press Any Key to Restart");
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over")
	}, 300);

	startOver();
}

function startOver() {
	$(document).on("keypress", function() {
		level = 0;
		gamePattern = [];
		userClickedPattern = [];
		$(document).off("keypress");
		setTimeout(function() {
			nextSequence()
		}, 1000);
	})
}


function playSound(sound) {
	switch (sound) {
		case "blue":
			blueAudio.play();
			break;
		case "green":
			greenAudio.play();
			break;
		case "red":
			redAudio.play();
			break;
		case "yellow":
			yellowAudio.play();
			break;
		case "wrong":
			wrongAudio.play();
			break;
		default:
			console.log("didn't work");
	}
}
