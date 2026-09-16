// ========================================
// OUTSMART AI
// GAME ENGINE
// ========================================


// ========================================
// GAME STATE
// ========================================

let currentQuestionIndex = 0;

let score = 0;

let correctAnswers = 0;

let totalQuestions = 10;

let selectedQuestions = [];

let usedQuestionIds = [];

let timeLeft = 10;

let timerInterval;

let questionStartTime;


// ========================================
// PLAYER ANALYTICS
// ========================================

let streak = 0;

let bestStreak = 0;

let totalAnswerTime = 0;


let categoryStats = {};


let difficultyStats = {

    EASY: {
        correct: 0,
        total: 0
    },

    MEDIUM: {
        correct: 0,
        total: 0
    },

    HARD: {
        correct: 0,
        total: 0
    }

};


// ========================================
// START GAME
// ========================================

function startGame() {

    currentQuestionIndex = 0;

    score = 0;

    correctAnswers = 0;

    selectedQuestions = [];

    usedQuestionIds = [];

    timeLeft = 10;

    streak = 0;

    bestStreak = 0;

    totalAnswerTime = 0;


    categoryStats = {};


    difficultyStats = {

        EASY: {
            correct: 0,
            total: 0
        },

        MEDIUM: {
            correct: 0,
            total: 0
        },

        HARD: {
            correct: 0,
            total: 0
        }

    };


    document.getElementById("score")
        .textContent = "000";


    updateStreakUI();


    loadNextAdaptiveQuestion();

}


// ========================================
// NEXT QUESTION
// ========================================

function loadNextAdaptiveQuestion() {

    if (
        currentQuestionIndex >=
        totalQuestions
    ) {

        endGame();

        return;

    }


    const nextQuestion =
        chooseAdaptiveQuestion();


    selectedQuestions.push(
        nextQuestion
    );


    usedQuestionIds.push(
        nextQuestion.id
    );


    loadQuestion(nextQuestion);

}


// ========================================
// ADAPTIVE QUESTION SELECTION
// ========================================

function chooseAdaptiveQuestion() {

    let targetDifficulty;


    if (
        currentQuestionIndex === 0
    ) {

        targetDifficulty = "EASY";

    }

    else if (
        streak >= 2
    ) {

        targetDifficulty = "HARD";

    }

    else if (
        streak === 1
    ) {

        targetDifficulty = "MEDIUM";

    }

    else {

        targetDifficulty = "EASY";

    }


    let availableQuestions =
        questions.filter(question =>

            question.difficulty ===
                targetDifficulty &&

            !usedQuestionIds.includes(
                question.id
            )

        );


    if (
        availableQuestions.length === 0
    ) {

        availableQuestions =
            questions.filter(question =>

                !usedQuestionIds.includes(
                    question.id
                )

            );

    }


    if (
        availableQuestions.length === 0
    ) {

        return questions[
            Math.floor(
                Math.random() *
                questions.length
            )
        ];

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            availableQuestions.length
        );


    return availableQuestions[
        randomIndex
    ];

}


// ========================================
// LOAD QUESTION
// ========================================

function loadQuestion(question) {

    if (!question) {

        endGame();

        return;

    }


    document.getElementById(
        "question-number"
    ).textContent =

        String(
            currentQuestionIndex + 1
        ).padStart(2, "0");


    document.getElementById(
        "question-category"
    ).textContent =

        `${question.category} • ${question.difficulty}`;


    document.getElementById(
        "question"
    ).textContent =

        question.question;



    const oldDisplay =
        document.querySelector(
            ".dynamic-question-display"
        );


    if (oldDisplay) {

        oldDisplay.remove();

    }


    // Create new dynamic display

    const questionTitle =
        document.getElementById(
            "question"
        );


    const displayContainer =
        document.createElement(
            "div"
        );


    displayContainer.className =
        "dynamic-question-display";


    displayContainer.innerHTML =
        question.display;


    questionTitle.after(
        displayContainer
    );


    // Answer buttons

    const answerButtons =
        document.querySelectorAll(
            ".answer-btn"
        );


    answerButtons.forEach(
        (button, index) => {

            const text =
                button.querySelector(
                    "span:last-child"
                );


            text.textContent =
                question.options[index];


            button.classList.remove(
                "correct",
                "wrong"
            );


            button.disabled = false;

        }
    );


    // AI message

    document.getElementById(
        "ai-message"
    ).textContent =

        getAIQuestionMessage(
            question
        );


    // AI confidence

    updateAIConfidence();


    // Timer

    startTimer();

}


// ========================================
// AI QUESTION MESSAGE
// ========================================

function getAIQuestionMessage(
    question
) {

    if (streak >= 3) {

        return "You're on a streak. Let's see if you can handle this.";

    }


    if (streak === 2) {

        return "Two in a row. Interesting...";

    }


    if (streak === 1) {

        return "Nice. Don't get comfortable.";

    }


    if (currentQuestionIndex === 0) {

        return "Let's see what you've got.";

    }


    if (
        question.difficulty ===
        "HARD"
    ) {

        return "This one should slow you down.";

    }


    if (
        question.difficulty ===
        "MEDIUM"
    ) {

        return "Think carefully.";

    }


    return "Let's warm up.";

}


// ========================================
// TIMER
// ========================================

function startTimer() {

    clearInterval(
        timerInterval
    );


    timeLeft = 10;


    questionStartTime =
        Date.now();


    updateTimerUI();


    timerInterval =
        setInterval(() => {

            timeLeft -= 0.1;


            updateTimerUI();


            if (
                timeLeft <= 0
            ) {

                clearInterval(
                    timerInterval
                );


                timeUp();

            }

        }, 100);

}


// ========================================
// TIMER UI
// ========================================

function updateTimerUI() {

    const timer =
        document.getElementById(
            "timer"
        );


    const progress =
        document.getElementById(
            "timer-progress"
        );


    timer.textContent =
        Math.max(
            timeLeft,
            0
        ).toFixed(1);


    progress.style.width =

        `${Math.max(
            (timeLeft / 10) * 100,
            0
        )}%`;

}


// ========================================
// TIME UP
// ========================================

function timeUp() {

    const question =
        selectedQuestions[
            currentQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    streak = 0;


    updateStreakUI();


    trackPerformance(
        question,
        false,
        10
    );


    buttons[
        question.answer
    ].classList.add(
        "correct"
    );


    document.getElementById(
        "ai-message"
    ).textContent =

        "Too slow. The AI takes that one.";


    setTimeout(() => {

        currentQuestionIndex++;

        loadNextAdaptiveQuestion();

    }, 1500);

}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(
    selectedIndex
) {

    clearInterval(
        timerInterval
    );


    const question =
        selectedQuestions[
            currentQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    const responseTime =

        (
            Date.now() -
            questionStartTime
        ) / 1000;


    totalAnswerTime +=
        responseTime;


    // ====================================
    // CORRECT
    // ====================================

    if (
        selectedIndex ===
        question.answer
    ) {

        buttons[
            selectedIndex
        ].classList.add(
            "correct"
        );


        correctAnswers++;


        streak++;


        if (
            streak > bestStreak
        ) {

            bestStreak =
                streak;

        }


        updateStreakUI();


        trackPerformance(
            question,
            true,
            responseTime
        );


        const speedBonus =
            Math.round(
                timeLeft * 10
            );


        const streakBonus =
            streak * 25;


        const earnedPoints =

            question.points +
            speedBonus +
            streakBonus;


        score +=
            earnedPoints;


        document.getElementById(
            "ai-message"
        ).textContent =

            getCorrectAIMessage(
                earnedPoints
            );

    }


    // ====================================
    // WRONG
    // ====================================

    else {

        buttons[
            selectedIndex
        ].classList.add(
            "wrong"
        );


        buttons[
            question.answer
        ].classList.add(
            "correct"
        );


        streak = 0;


        updateStreakUI();


        trackPerformance(
            question,
            false,
            responseTime
        );


        document.getElementById(
            "ai-message"
        ).textContent =

            getWrongAIMessage(
                question
            );

    }


    document.getElementById(
        "score"
    ).textContent =

        String(score)
            .padStart(3, "0");


    updateAIConfidence();


    setTimeout(() => {

        currentQuestionIndex++;

        loadNextAdaptiveQuestion();

    }, 1700);

}


// ========================================
// STREAK UI
// ========================================

function updateStreakUI() {

    const streakElement =
        document.getElementById(
            "streak"
        );


    const streakContainer =
        document.querySelector(
            ".streak-display"
        );


    if (!streakElement) {
        return;
    }


    streakElement.textContent =
        streak;


    if (
        streak >= 2
    ) {

        streakContainer.classList.add(
            "active"
        );

    }

    else {

        streakContainer.classList.remove(
            "active"
        );

    }

}


// ========================================
// TRACK PERFORMANCE
// ========================================

function trackPerformance(
    question,
    correct,
    responseTime
) {

    difficultyStats[
        question.difficulty
    ].total++;


    if (correct) {

        difficultyStats[
            question.difficulty
        ].correct++;

    }


    if (
        !categoryStats[
            question.category
        ]
    ) {

        categoryStats[
            question.category
        ] = {

            correct: 0,

            total: 0,

            totalTime: 0

        };

    }


    categoryStats[
        question.category
    ].total++;


    categoryStats[
        question.category
    ].totalTime +=
        responseTime;


    if (correct) {

        categoryStats[
            question.category
        ].correct++;

    }

}


// ========================================
// CORRECT AI MESSAGE
// ========================================

function getCorrectAIMessage(
    points
) {

    if (
        streak >= 4
    ) {

        return `You're on fire. +${points}. This is getting interesting.`;

    }


    if (
        streak === 3
    ) {

        return `Three in a row. +${points}. I'm paying attention now.`;

    }


    if (
        streak === 2
    ) {

        return `Two correct. +${points}. Not bad.`;

    }


    return `Correct. +${points}. Keep going.`;

}


// ========================================
// WRONG AI MESSAGE
// ========================================

function getWrongAIMessage(
    question
) {

    const messages = [

        `Wrong. The answer was ${question.options[question.answer]}.`,

        "Nope. The machine takes that round.",

        "Incorrect. I thought you'd catch that.",

        "That's not it. Think faster next time."

    ];


    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];

}


// ========================================
// AI CONFIDENCE
// ========================================

function updateAIConfidence() {

    if (
        currentQuestionIndex === 0
    ) {

        setAIConfidence(82);

        return;

    }


    const accuracy =

        correctAnswers /
        currentQuestionIndex;


    if (
        accuracy < 0.4
    ) {

        setAIConfidence(95);

        return;

    }


    if (
        accuracy < 0.7
    ) {

        setAIConfidence(85);

        return;

    }


    if (
        accuracy < 0.9
    ) {

        setAIConfidence(72);

        return;

    }


    setAIConfidence(58);

}


// ========================================
// SET AI CONFIDENCE
// ========================================

function setAIConfidence(
    value
) {

    document.getElementById(
        "confidence"
    ).textContent =
        `${value}%`;


    document.getElementById(
        "confidence-progress"
    ).style.width =
        `${value}%`;

}


// ========================================
// END GAME
// ========================================

function endGame() {

    clearInterval(
        timerInterval
    );


    const accuracy =

        totalQuestions === 0

            ? 0

            : Math.round(

                (
                    correctAnswers /
                    totalQuestions
                ) * 100

            );


    const averageTime =

        totalAnswerTime === 0

            ? 0

            : totalAnswerTime /
              totalQuestions;


    const aiScore =
        calculateAIScore();


    document.getElementById(
        "final-score"
    ).textContent =
        score;


    document.getElementById(
        "correct-score"
    ).textContent =
        `${correctAnswers} / ${totalQuestions}`;


    document.getElementById(
        "speed-score"
    ).textContent =

        `${Math.round(
            Math.max(
                0,
                100 -
                (averageTime * 5)
            )
        )}%`;


    document.getElementById(
        "ai-score"
    ).textContent =
        aiScore;


    updateRank(
        accuracy,
        averageTime
    );


    showScreen(
        resultScreen
    );

}


// ========================================
// AI BENCHMARK
// ========================================

function calculateAIScore() {

    let benchmark = 0;


    selectedQuestions.forEach(
        question => {

            benchmark +=
                question.points;

        }
    );


    benchmark =

        Math.round(
            benchmark * 0.85
        );


    return benchmark;

}


// ========================================
// RANK SYSTEM
// ========================================

function updateRank(
    accuracy,
    averageTime
) {

    const rankElement =
        document.querySelector(
            ".rank"
        );


    const titleElement =
        document.getElementById(
            "result-title"
        );


    let rank;

    let emoji;


    if (
        accuracy >= 90 &&
        averageTime <= 4
    ) {

        rank = "AI SLAYER";

        emoji = "🤖";

        titleElement.textContent =
            "YOU DESTROYED THE AI";

    }

    else if (
        accuracy >= 80
    ) {

        rank = "GENIUS";

        emoji = "👑";

        titleElement.textContent =
            "YOU OUTSMARTED THE AI";

    }

    else if (
        accuracy >= 70
    ) {

        rank = "ELITE";

        emoji = "⚡";

        titleElement.textContent =
            "HUMAN ADVANTAGE DETECTED";

    }

    else if (
        accuracy >= 50
    ) {

        rank = "STRATEGIST";

        emoji = "🧠";

        titleElement.textContent =
            "THE AI IS GETTING WORRIED";

    }

    else if (
        accuracy >= 30
    ) {

        rank = "THINKER";

        emoji = "🔧";

        titleElement.textContent =
            "YOU'RE LEARNING";

    }

    else {

        rank = "ROOKIE";

        emoji = "🪵";

        titleElement.textContent =
            "THE AI WINS THIS ROUND";

    }


    rankElement.innerHTML =
        `<span>${emoji}</span> ${rank}`;

}