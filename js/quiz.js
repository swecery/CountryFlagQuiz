
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
        if (currentQuestion >= 0 && currentQuestion < questions.length) {
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
        } else {
            console.log("Quiz finish.");
        }
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
            $("#question").text("Quiz Finished! Result: " + score);
            $("#answers").empty();
            $("#flag-image").hide();
            $("#time-remaining").hide();
            $(".go-leader").html('<button class="button" id="results-button">See Results</button>');
            $("#results-button").click(function () {
                goToResults();
            });
            const nickname = window.location.href.split("?")[1].split("=")[1];
            let data = JSON.parse(localStorage.getItem("userData")) || [];
            if (!data) {
                data = [];
            }
            data.push({ nickname, score });
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(data);
        }
    }
    function goToResults() {
        $(".question-card").css("display", "none");
        $(".results").css("display", "block");
        let userData = JSON.parse(localStorage.getItem("userData")) || [];
        userData.sort(function (a, b) {
            return b.score - a.score;
        });
        var resultHTML = '';
        userData.forEach(function (user, index) {
            resultHTML += '<li>' + user.nickname + ' - ' + user.score + ' points</li>';
        });
        $(".result-list").html(resultHTML);

    }

    displayQuestion();
});
