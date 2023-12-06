import questions from "./questions.js";

const rulesModal = document.querySelector('.rules-modal');
const rulesBtn = document.querySelector('.rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');
const scoresBtn = document.querySelector('.scores-btn');
const scoresModal = document.querySelector('.scores-modal');
const closeScoresBtn = document.getElementById('close-scores-btn');
const startBtn = document.querySelector('.start-btn');
const mainMenuContainer = document.querySelector('.main-menu-container');
const difficultyLevelContainer = document.querySelector('.difficulty-level-container');
const difficultyLevelBtns = document.querySelectorAll('.difficulty-level-btn');
const application = document.querySelector('.app');
const optionsContainer = document.querySelector('.options-container');
const questionText = document.querySelector('.question');
const questionNumber = document.querySelector('.question-number');
const questionsTotal = document.querySelector('.total-questions');
const scoreEl = document.querySelector('.score');
const timerEl = document.querySelector('.timer');
const nextBtn = document.querySelector('.next-question-btn');
const resetBtn = document.querySelector('.reset-btn');

let score = 0;
let timer;
let questionIndex = 1;
let interval;

function showRulesModal() {
    rulesModal.classList.add('rules-modal-visible');
}

function hideRulesModal() {
    rulesModal.classList.remove('rules-modal-visible');
}

function showScoresModal() {
    scoresModal.classList.add('scores-modal-visible');
}

function hideScoresModal() {
    scoresModal.classList.remove('scores-modal-visible');
}

function start() {
    mainMenuContainer.classList.add('hidden');
    difficultyLevelContainer.classList.remove('hidden');
}

function startPlay() {
    difficultyLevelContainer.classList.add('hidden');
    application.classList.remove('hidden');
    scoreEl.textContent = score;
}

function randomNoRepeats(array) {
    let copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      let index = Math.floor(Math.random() * copy.length);
      let item = copy[index];
      copy.splice(index, 1);
      return item;
    };
}

function displayQuestion() {
    let chooser = randomNoRepeats(questions);
    let questionObj = chooser();
    const { question, answers: [{text_1} , {text_2}, {text_3}, {text_4}], answers:[{correct_1}, {correct_2}, {correct_3}, {correct_4}]} = questionObj;
    questionText.textContent = question;
    optionsContainer.innerHTML = `
                    <p class="answer" data-correct="${correct_1}">${text_1}</p>
                    <p class="answer" data-correct="${correct_2}">${text_2}</p>
                    <p class="answer" data-correct="${correct_3}">${text_3}</p>
                    <p class="answer" data-correct="${correct_4}">${text_4}</p>
    `;
    const answerOptions = optionsContainer.querySelectorAll('.answer');
    let correctAnswer = optionsContainer.querySelector('[data-correct="true"]');
    answerOptions.forEach((option) => {
        option.addEventListener('click', function gameplay() {
            optionsContainer.classList.add('answers-disabled');
            if(nextBtn.getAttribute('value') === 'easy') {
                if(option === correctAnswer) {
                    score += 100;
                    option.classList.add('answer-correct');
                }
                if(option !== correctAnswer) {
                    score -= 50;
                    option.classList.add('answer-wrong');
                    setTimeout(() => {
                        correctAnswer.classList.add('answer-correct');
                    }, 700);
                }
            }
            if(nextBtn.getAttribute('value') === 'medium') {
                if(option === correctAnswer) {
                    score += 100;
                    option.classList.add('answer-correct');
                }
                if(option !== correctAnswer) {
                    score -= 75;
                    option.classList.add('answer-wrong');
                    setTimeout(() => {
                        correctAnswer.classList.add('answer-correct');
                    }, 700);
                }
            }
            if(nextBtn.getAttribute('value') === 'hard') {
                if(option === correctAnswer) {
                    score += 100;
                    option.classList.add('answer-correct');
                }
                if(option !== correctAnswer) {
                    score -= 100;
                    option.classList.add('answer-wrong');
                    setTimeout(() => {
                        correctAnswer.classList.add('answer-correct');
                    }, 700);
                }
            }
            if(score < 0) {
                score = 0;
            }
            scoreEl.textContent = score;
            stopCountdown();
        })
    })
}

function countdown() {
    if(timer < 0) {
        score -= 50;
        scoreEl.textContent = score;
        nextQuestion();
    }
    if(timer <= 10) {
        timerEl.style.color = 'crimson';
    } else {
        timerEl.style.color = 'rgb(0, 188, 0)';
    }
    timerEl.textContent = ' ' + timer;
    timer--;
}

difficultyLevelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        nextBtn.setAttribute('value', btn.value);
        if(btn.value === 'easy') {
            timer = 25;
            questionsTotal.textContent = 15;
        } else if(btn.value === 'medium') {
            timer = 20;
            questionsTotal.textContent = 20;
        } else {
            timer = 15;
            questionsTotal.textContent = 25;
        }
        startPlay();
        displayQuestion();
        interval = setInterval(countdown, 1000);
    });
})

function nextQuestion() {
    questionIndex++;
    if(nextBtn.getAttribute('value') === 'easy') {
        timer = 25;
    } else if(nextBtn.getAttribute('value') === 'medium') {
        timer = 20;
    } else if(nextBtn.getAttribute('value') === 'hard') {
        timer = 15;
    }

    if(questionIndex > +questionsTotal.textContent) {
        questionIndex = 0;
    }
    questionNumber.textContent = questionIndex;
    optionsContainer.classList.remove('answers-disabled');
    displayQuestion();
    stopCountdown();
    startCountdown();
};

function stopCountdown() {
    clearInterval(interval);
}

function startCountdown() {
    interval = setInterval(countdown, 1000);
}

function reset() {
    questionIndex = 1;
    questionNumber.textContent = questionIndex;
    timerEl.textContent = ' ';
    score = 0;
    scoreEl.textContent = score;
    mainMenuContainer.classList.remove('hidden');
    application.classList.add('hidden');
    stopCountdown();
}

rulesBtn.addEventListener('click', showRulesModal);
closeRulesBtn.addEventListener('click', hideRulesModal);
scoresBtn.addEventListener('click', showScoresModal);
closeScoresBtn.addEventListener('click', hideScoresModal);
startBtn.addEventListener('click', start);
nextBtn.addEventListener('click', nextQuestion);
resetBtn.addEventListener('click', reset);