var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
    if(!started){
    nextsequence();
    started=true;
    }
});

function nextsequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    level++;
    $("h1").text("Level " + level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(currentLevel==gamePattern.length-1)
        {
            setTimeout(function(){
                nextsequence();
            }, 1000);
            userClickedPattern=[];
        }
        
    }
    else{

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        started=false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
    
}

