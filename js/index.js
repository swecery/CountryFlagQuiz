console.log('ceren');

function saveNicknameAndRedirect() {
    var nicknameInput = document.getElementById("nickname");
    var nickname = nicknameInput.value;
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
        quizInfo.style.display = "block"; // Bilgilendirme metnini görünür hale getir
    }
    
    
});
document.querySelector('.close-button').addEventListener('click', function () {
    document.querySelector('.quiz-info').style.display = 'none';
});
