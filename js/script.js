const rulesModal = document.querySelector('.rules-modal');
const rulesBtn = document.querySelector('.rules-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');

function showRulesModal () {
    rulesModal.classList.add('rules-modal-visible');
}

function hideRulesModal() {
    rulesModal.classList.remove('rules-modal-visible');
}

rulesBtn.addEventListener('click', showRulesModal);
closeModalBtn.addEventListener('click', hideRulesModal);
