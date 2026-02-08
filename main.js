const generateBtn = document.getElementById('generate-btn');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');
const historyList = document.getElementById('history-list');
const yearSpan = document.getElementById('year');

const generatedNumbers = new Set();
let history = [];

const generateNumbers = () => {
    generatedNumbers.clear();
    while (generatedNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const numbersArray = Array.from(generatedNumbers).sort((a, b) => a - b);
    displayNumbers(numbersArray);
    addToHistory(numbersArray);
};

const displayNumbers = (numbers) => {
    lottoNumbersDiv.innerHTML = '';
    numbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        lottoNumbersDiv.appendChild(numberDiv);
    });
};

const addToHistory = (numbers) => {
    const numbersString = numbers.join(', ');
    history.unshift(numbersString);

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem('lotto_history', JSON.stringify(history));
    displayHistory();
};

const displayHistory = () => {
    historyList.innerHTML = '';
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
};

const loadHistory = () => {
    const savedHistory = localStorage.getItem('lotto_history');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        displayHistory();
    }
};

const setYear = () => {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
};

generateBtn.addEventListener('click', generateNumbers);

window.addEventListener('load', () => {
    loadHistory();
    setYear();
});