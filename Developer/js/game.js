var timeEl = document.querySelector("#time");
var choiceEl = document.querySelector("#question-choices")
var feedbackEl = document.querySelector("#feedback");
var questionTitle = document.querySelector("#question-title")
var currentQuestionIndex = 0;
var timerId;
var time = questions.length * 100;
var startBtn = document.querySelector(".start")
console.log(time);


getQuestions()
function startQuiz() {
    timerId = setInterval(timerCheck, 1000);
    timeEl.textContent = time;
}



function getQuestions() {
    startQuiz();
    var currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title;

    choiceEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.textContent = i + 1 + ") " + choice;

        choiceNode.onclick = choiceClick;
        choiceEl.append(choiceNode);
    });
}

function choiceClick() {
    var currentAnswer = questions[currentQuestionIndex].answer;
    console.log(currentAnswer)
    if (this.value == currentAnswer) {
        feedbackEl.textContent = "Correct!"
        timeEl.textContent = time;
    } else {
        time -= 10;
        feedbackEl.textContent = "Wrong!"
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length){
        quizEnd();
    } else {
        getQuestions();
    }
}
// 
function quizEnd() {
    clearInterval(timerId);

    var endScreenEl = document.querySelector("#end-screen");
    endScreenEl.removeAttribute("class")
    var finalscoreEl = document.querySelector("#final-score");
    finalscoreEl.textContent = time;
}

function timerCheck() {
    time--;
    timeEl.textContent = time;

    if (time <= 0)
        quizEnd();
}


function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "highscores.html";
    }
  }
