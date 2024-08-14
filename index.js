var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber= Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).animate({opacity:0.4},100, function() {
    $(this).animate({ opacity: 1 }, 100);
    });

    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
}

$(".btn").on("click",function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass( "pressed" );
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(){
    if (!started) {
         $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) 
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) 
        {
            setTimeout(function() {
                nextSequence(); 
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass( "game-over" );
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

     

