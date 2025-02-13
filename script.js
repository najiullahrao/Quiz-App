const questions = [
    
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "BlueWhale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Kutta", correct: false }
        ]
    },
    {
        question: "How many stars are on the flag of New Zealand?",
        answers: [
            { text: "Six", correct: false },
            { text: "Five", correct: true },
            { text: "Four", correct: false },
            { text: "Three", correct: false }
        ]
    },
    {
        question: "What is the name of the oldest lake in the world?",
        answers: [
            { text: "Lake Superior", correct: false },
            { text: "Lake Huron", correct: false },
            { text: "Lake Baikal", correct: true },
            { text: "LuluSar Lake", correct: false }
        ]
    },
    {
        question: "How many rings does the planet Saturn have?",
        answers: [
            { text: "Seven", correct: true },
            { text: "Ten", correct: false },
            { text: "Fifteen", correct: false },
            { text: "Eight", correct: false }
        ]
    },
    {
        question: "What is the national animal of Germany?",
        answers: [
            { text: "Shahbaz Sharif", correct: false },
            { text: "Lion", correct: false },
            { text: "Trump", correct: false },
            { text: "The Federal Eagle", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }

        button.addEventListener("click", selectAnswer);
    })
};

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }

}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();