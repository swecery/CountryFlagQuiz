console.log('ceren');

function saveNicknameAndRedirect() {
    var nicknameInput = document.getElementById("nickname");
    var nickname = nicknameInput.value;

    nickname = nickname.trim();

    nickname = nickname.replace(/ö/g, 'o');
    nickname = nickname.replace(/ä/g, 'a');
    nickname = nickname.replace(/å/g, 'a');

    

    var punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    if (punctuationRegex.test(nickname)) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "Punctuation marks cannot be used.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";

        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }
    if (nickname.length < 3) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "You must use at least 3 letters.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";

        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }







    if (!nickname) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "Please enter your nickname.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";
        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }
    var url = "quiz.html?nickname=" + encodeURIComponent(nickname);
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var nickname = urlParams.get("nickname");
    if (nickname) {
        var nicknameDisplay = document.getElementById("nickname-display");
        nicknameDisplay.textContent = "Start Quiz " + nickname + "!";
    }
    function displayQuizInfo() {
        var quizInfo = document.getElementById("quiz-info");
        quizInfo.style.display = "block";
    }

});
;


function hideQuizInfo() {
    var quizInfo = document.querySelector('.quiz-info');
    quizInfo.style.display = 'none';
}
