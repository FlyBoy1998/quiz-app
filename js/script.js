import questions from "./questions.js";

// DOM elements
const mainMenuContainer = document.querySelector('.main-menu-container');
const rulesModal = document.querySelector('.rules-modal');
const rulesBtn = document.querySelector('.rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');
const scoresBtn = document.querySelector('.scores-btn');
const scoresModal = document.querySelector('.scores-modal');
const closeScoresBtn = document.getElementById('close-scores-btn');
const startBtn = document.querySelector('.start-btn');
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
const gameOverModal = document.querySelector('.game-over-score-modal');
const finalScore = document.querySelector('.final-score');
const playAgainBtn = document.querySelector('.play-again-btn');
const mainMenuBtn = document.querySelector('.main-menu-btn');
const scoresList = document.querySelector('.scores-list');
const newHighScore = document.querySelector('.new-high-score');


// Global variables
let score = 0;
let timer;
let questionIndex = 1;
let interval;
let scoresListArr = [];
let string;
let restring;
let retrArray;

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
    gameOverModal.classList.remove('game-over-modal-visible');
}

function startPlay() {
    difficultyLevelContainer.classList.add('hidden');
    application.classList.remove('hidden');
    scoreEl.textContent = score;
}

// Difficulty Levels
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

// Select a random question without repeating
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
    // Destructure the random question object
    const { question, answers: [{text_1} , {text_2}, {text_3}, {text_4}], answers:[{correct_1}, {correct_2}, {correct_3}, {correct_4}]} = questionObj;
    // Manipulate DOM using the question and options
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
            // Disable the other options once an option has been clicked
            optionsContainer.classList.add('answers-disabled');
            // Easy level conditional statement
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
            // Medium level conditional statement
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
            // Hard level conditional statement
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
            // Stop countdown once an option has been selected
            stopCountdown();
        })
    })
}

// Countdown 
function countdown() {
    if(timer < 0) {
        score -= 50;
        if(score < 0) {
            score = 0;
        }
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

function stopCountdown() {
    clearInterval(interval);
}

function startCountdown() {
    interval = setInterval(countdown, 1000);
}

// Next question functionality
function nextQuestion() {
    questionIndex++;
    // Set countdown based on difficulty level selected
    if(nextBtn.getAttribute('value') === 'easy') {
        timer = 25;
    } else if(nextBtn.getAttribute('value') === 'medium') {
        timer = 20;
    } else if(nextBtn.getAttribute('value') === 'hard') {
        timer = 15;
    }

    // Set functionality for ending game
    if(questionIndex > +questionsTotal.textContent) {
        questionIndex = 0;
        gameOverModal.classList.add('game-over-modal-visible');
        application.classList.add('hidden');
        finalScore.textContent = score;
        // Reset DOM content and add new scores
        scoresList.innerHTML = '';
        saveScore();
        updateDOMfromLocalStorage();
    }
    questionNumber.textContent = questionIndex;
    optionsContainer.classList.remove('answers-disabled');
    displayQuestion();
    stopCountdown();
    startCountdown();
};

// Reset functionality
function reset() {
    questionIndex = 1;
    questionNumber.textContent = questionIndex;
    timerEl.textContent = ' ';
    score = 0;
    scoreEl.textContent = score;
    mainMenuContainer.classList.remove('hidden');
    application.classList.add('hidden');
    optionsContainer.classList.remove('answers-disabled');
    stopCountdown();
}

// Play Again
function playAgain() {
    score = 0;
    newHighScore.classList.remove('new-high-score-visible');
    stopCountdown();
    start()
}

// Return to Main Menu
function mainMenu() {
    mainMenuContainer.classList.remove('hidden');
    difficultyLevelContainer.classList.add('hidden');
    gameOverModal.classList.remove('game-over-modal-visible');
    newHighScore.classList.remove('new-high-score-visible');
    score = 0;
    stopCountdown();
}

// Save scores
function saveScore() {
    // Avoid adding 0 score
    if(score === 0) {
        return;
    } else {
        scoresListArr.push(score);
    }
    // Remove duplicates
    const uniqueValues = [...new Set(scoresListArr)];
    checkForTopFive(uniqueValues, score);
    descendArr(uniqueValues);
    // Set the uniqueValues max length to 5
    if(uniqueValues.length > 5) {
        uniqueValues.length = 5;
    }
    saveToLocalStorage(uniqueValues);
}

// Local Storage
function saveToLocalStorage(scores) {
    // Create the item in localStorage
    if(!localStorage.getItem('savedScores')) {
        string = localStorage.setItem('savedScores', JSON.stringify(scores));
    } else if (localStorage.getItem('savedScores')) {
        // Remove duplicates from localStorage, add the new values and re-arange the array in a descending order
        restring = [...new Set(JSON.parse(localStorage.getItem('savedScores')), scores)];
        restring.push(score);
        descendArr(restring);
        localStorage.removeItem(string);
        string = localStorage.setItem('savedScores', JSON.stringify(restring));
    }
}

// Re-arange the array in a descending order functionality
function descendArr(arr) {
    arr.sort((a, b) => { return b - a });
}

// If a new score is higher than others from top 5
function checkForTopFive(array, score) {
    for(let i = 0; i <= array.length; i++) {
        if(score > array[i]) {
            array.pop(array.length - 1);
            array.push(score);
        }
        // If a NEW HIGH SCORE is set
        if(score > array[0]) {
            array.pop(array.length - 1);
            array.push(score);
            newHighScore.classList.add('new-high-score-visible');
        }
    }
    return array;
}

// Modify DOM based on localStorage savings
function updateDOMfromLocalStorage() {
    retrArray = [...new Set(JSON.parse(localStorage.getItem('savedScores')))];
    retrArray.map((score) => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = score;
        scoresList.appendChild(scoreElement);
    });
}

// Event Listeners
rulesBtn.addEventListener('click', showRulesModal);
closeRulesBtn.addEventListener('click', hideRulesModal);
scoresBtn.addEventListener('click', showScoresModal);
closeScoresBtn.addEventListener('click', hideScoresModal);
startBtn.addEventListener('click', start);
nextBtn.addEventListener('click', nextQuestion);
resetBtn.addEventListener('click', reset);
mainMenuBtn.addEventListener('click', mainMenu);
playAgainBtn.addEventListener('click', playAgain);
window.addEventListener('load', updateDOMfromLocalStorage);