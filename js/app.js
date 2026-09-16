// ========================================
// SCREEN ELEMENTS
// ========================================

const homeScreen =
    document.getElementById("home-screen");

const challengeScreen =
    document.getElementById("challenge-screen");

const resultScreen =
    document.getElementById("result-screen");


// ========================================
// BUTTONS
// ========================================

const startBtn =
    document.getElementById("start-btn");

const playAgainBtn =
    document.getElementById("play-again-btn");

const homeBtn =
    document.getElementById("home-btn");


// ========================================
// SCREEN CONTROLLER
// ========================================

function showScreen(screen) {

    homeScreen.classList.remove("active");

    challengeScreen.classList.remove("active");

    resultScreen.classList.remove("active");


    screen.classList.add("active");

}


// ========================================
// START GAME
// ========================================

startBtn.addEventListener("click", () => {

    showScreen(challengeScreen);

    startGame();

});


// ========================================
// PLAY AGAIN
// ========================================

playAgainBtn.addEventListener("click", () => {

    showScreen(challengeScreen);

    startGame();

});


// ========================================
// BACK HOME
// ========================================

homeBtn.addEventListener("click", () => {

    showScreen(homeScreen);

});


// ========================================
// ANSWER BUTTONS
// ========================================

const answerButtons =
    document.querySelectorAll(".answer-btn");


answerButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        checkAnswer(index);

    });

});