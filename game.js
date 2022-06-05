var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

    // Game will be started
$(document).keydown(function() {
    if(!started) {
        started = true;
        nextSequence();
    }
});

    //User Clicks a Button and select colours
$(".btn").click(function() {
    var userChoosenColour = $(this).attr('id');
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})
    //Control user answers 
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Helal len");  
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }  
    }
    else{
        console.log("yanlış mlsf");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}

function nextSequence() {
    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);

}


function playSound(name) {

    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var pickAudio = new Audio("sounds/" + name + ".mp3");
    pickAudio.play();

}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
