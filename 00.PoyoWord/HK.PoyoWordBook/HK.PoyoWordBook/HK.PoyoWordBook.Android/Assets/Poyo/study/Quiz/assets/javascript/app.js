var entryMusic    = new Audio("assets/music/entryMusic.mp3")
var questionMusic = new Audio("assets/music/question2.wav")
var correct       = new Audio("assets/music/correct.wav")
var incorrect     = new Audio("assets/music/incorrect.wav")
var wins          = 0;
var losses        = 0;
var timer         = 0;

$(document).ready(function(){
  entryMusic.play();
  $("#gamePanel").hide();

  $("#startButton").on("click", function(){
    entryMusic.pause();
    questionMusic.play();
    questionMusic.loop= true;
    time = 20;
    timer();
    promptQuestions();
    $(".topPanel").hide();
    $("#gamePanel").show();
    $(".dancingTrio").hide();

  }); //End of click function

  function promptQuestions(){
    document.querySelector("#results").innerHTML = "";
    //I can't believe this part actually worked.
    //Random function makes an array in which you can use jQuery Search functions.
    var choiceArray = [];
    $("#choices").empty();
    randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    choiceArray=randomQuestion.answers
    answer = randomQuestion.correct
    document.querySelector("#question").innerHTML = randomQuestion.question;
    for (i=0; i<choiceArray.length; i++){
      $("#choices").append("<p><span id = q" + i + ">" + '<img id="placeholder" width="20" height="20" src="assets/images/pokeball.jpg" /> ' + choiceArray[i] + "</span></p>");
        $("#q" + i).click(function(){
        console.log(this);
        if (this.id[1] == randomQuestion.correct-1){
          correct.play();
          document.querySelector("#results").innerHTML = "You are correct!";
          wins++
          document.querySelector("#wins").innerHTML = "Wins: " + wins;
          setTimeout(go, 1000)
          function go(){
          promptQuestions();
          time = 21;
          };
        }
        else{
          incorrect.play();
          document.querySelector("#results").innerHTML = "You are incorrect!";
          losses++
          document.querySelector("#losses").innerHTML = "Losses: " + losses;
          setTimeout(go, 1000)
          function go(){
          promptQuestions();
          time = 21;
          };
        };
      });
    };
  }; //end of promptQuestions

  function timer(){
    var timing = setInterval(timer, 1000);
    function timer(){
      time--;
      document.querySelector("#timer").innerHTML = "Time remaining: " + time + " seconds.";
      if (time == 0){
        time = 21;
        losses++;
          document.querySelector("#results").innerHTML = "You are too slow!";
        timer();
        promptQuestions();
        document.querySelector("#losses").innerHTML = "Losses: " + losses;
      }; 
    };
  }; //end of timer
});