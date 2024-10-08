//check whether the game has been started or not using the keypress 
//functiom in jquery
//

const colors=["red","green","blue","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let highestScore;
var score=0
let learn=false;
let start=false;
let level=0;



$(document).keypress(()=>{
    if(!start){
        $('#title').text("Level " + level);
        var displayHighestScore=localStorage.getItem('score');
        $('.Highest').text(displayHighestScore)
        nextSequence();
        $('#quit').prop('disabled',false)
    }
    start=true;

})

//adding click even to all the buttons and adding sound

$('.box').click(function(){
    if(start){
        var userChoice= $(this).attr('id');
        $("#" +userChoice).fadeIn(100).fadeOut(100).fadeIn(100);
        userClickedPattern.push(userChoice);
        playSound(userChoice)
        checkAnswer(userClickedPattern.length-1)
    }
})



//creating next sequence

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            $('.scores').text(level)
            if(score<highestScore){
                return
            }
            else{
                localStorage.setItem('score', level)
            }
            setTimeout(()=>{
                nextSequence()
            },1000)
        }
    }else{
        playSound("wrong.mp3");
        $('#title').text("Game Over Press any key to start the game again! 😔")
        var displayHighestScore=localStorage.getItem('score');
        $('.scores').text(0)
        $('.Highest').text(displayHighestScore)
        start=false;
        gamePattern=[];
        level=0;
        userClickedPattern=[]
    }
}


const nextSequence=()=>{
    userClickedPattern=[]
    level++;
    $('#title').text("Level "+level);
    const randomNumber= Math.floor(Math.random()*colors.length);
    const randomColor=colors[randomNumber];
    $('#'+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    gamePattern.push(randomColor)
}

const playSound=(name)=>{
    var audio= new Audio("./sounds/" + name +'.mp3');
    audio.play()
}

const quit =()=>{
    start=false
    $('#title').text('Press a key to start');
    level=0
    $('.scores').text(level);
    var displayHighestScore=localStorage.getItem('score');
    highestScore=displayHighestScore;
    $('.Highest').text(displayHighestScore)

    if(start==false){
        $('#quit').prop('disabled',true)
        $('.box').prop('disabled',true)
        

    }
learn=false

}


$('#quit').on('click', quit);
