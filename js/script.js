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

let score = 0;
let timer;

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
    const { question, answers: [{text_1} , {text_2}, {text_3}, {text_4}]} = questionObj;
    questionText.textContent = question;
    optionsContainer.innerHTML = `
                    <p class="answer">${text_1}</p>
                    <p class="answer">${text_2}</p>
                    <p class="answer">${text_3}</p>
                    <p class="answer">${text_4}</p>
    `
}

const countdown = () => {
    if(timer <= 10) {
        timerEl.style.color = 'crimson';
    }
    timerEl.textContent = ' ' + timer;
    timer--;
    return timer;
}

difficultyLevelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.value === 'easy') {
            timer = 25;
            setInterval(countdown, 1000);
        } else if(btn.value === 'medium') {
            timer = 20;
            setInterval(countdown, 1000);
        } else {
            timer = 15;
            setInterval(countdown, 1000);
        }
        startPlay();
        displayQuestion();
    });
})

rulesBtn.addEventListener('click', showRulesModal);
closeRulesBtn.addEventListener('click', hideRulesModal);
scoresBtn.addEventListener('click', showScoresModal);
closeScoresBtn.addEventListener('click', hideScoresModal);
startBtn.addEventListener('click', start);
