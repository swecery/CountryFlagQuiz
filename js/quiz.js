
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

    function loadImages() {
        var current = questions[currentQuestion];
        $("#flag-image").attr("src", current.image);
    }

    function displayQuestion() {
        if (currentQuestion >= 0 && currentQuestion < questions.length) {
            var current = questions[currentQuestion];
            $("#question").text(current.question);
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
            loadImages();
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
            $(".go-leader").html(`
            <button class="button" id="results-button">See Results</button> 
            <button class="button" id="restart-button">Restart</button>
        `);
            $("#results-button").click(function () {
                goToResults();
            });
            $("#restart-button").click(function () {
                quizRestart();
            });
            $(".go-leader").show();
            
            
            const nickname = window.location.href.split("?")[1].split("=")[1];
            let data = JSON.parse(localStorage.getItem("userData")) || [];
            if (!data) {
                data = [];
            }
            data.push({ nickname, score });
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(data);
        }
    }function quizRestart() {
        currentQuestion = 0;
        score = 0;
        const nickname = window.location.href.split("?")[1].split("=")[1];
        let data = JSON.parse(localStorage.getItem("userData")) || [];
        data = data.filter(entry => entry.nickname !== nickname);
        localStorage.setItem("userData", JSON.stringify(data));
        $("#flag-image").show();
        $(".go-leader").hide();
        displayQuestion();
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
