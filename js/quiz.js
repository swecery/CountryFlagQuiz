
$(document).ready(function () {
    var currentQuestion = 0;
    var score = 0; 
    var countdown = 15; 
    var countdownInterval;
    function startCountdown() {
        countdown = 15;
        countdownInterval = setInterval(function () {
            countdown--;
            $("#countdown").text(countdown);

            if (countdown === 0) {
                clearInterval(countdownInterval); 
                checkAnswer(-1); 
            }
        }, 1000); 
    }
    function displayQuestion() {
        var current = questions[currentQuestion];
        $("#question").text(current.question);
        $("#flag-image").attr("src", current.image);
        $("#countdown").text(countdown);
        var answersList = $("#answers").empty();

        current.answers.forEach(function (answer, index) {
            var listItem = $("<li></li>");
            var answerButton = $("<button class='answer'></button>").text(answer);
            answerButton.on("click", function () {
                checkAnswer(index);
            });

            listItem.append(answerButton);
            answersList.append(listItem);
        });
        startCountdown(); 
    }
    function checkAnswer(userAnswerIndex) {
        clearInterval(countdownInterval); 
        if (userAnswerIndex === questions[currentQuestion].correctAnswer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            $("#question").text("Quiz Finished! Your Score: " + score);
            $("#answers").empty();
            $("#flag-image").attr("src", "");
            $("#time-remaining").hide(); 
        }
    }

    displayQuestion();
});
