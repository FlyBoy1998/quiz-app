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

rulesBtn.addEventListener('click', showRulesModal);
closeRulesBtn.addEventListener('click', hideRulesModal);
scoresBtn.addEventListener('click', showScoresModal);
closeScoresBtn.addEventListener('click', hideScoresModal);
startBtn.addEventListener('click', start);
