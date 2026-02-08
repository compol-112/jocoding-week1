const generateBtn = document.getElementById('generate-btn');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');
const yearSpan = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const retryBtn = document.getElementById('retry-btn');
const body = document.body;

const generatedNumbers = new Set();
const NUMBER_COUNT = 5;

const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeText.textContent = 'Dark Mode';
    } else {
        body.classList.remove('dark-mode');
        themeText.textContent = 'Light Mode';
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

const toggleTheme = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    applyTheme(!isDarkMode);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
};

const displayNumbersSequentially = async (numbers) => {
    lottoNumbersDiv.innerHTML = '';
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = '?';
        lottoNumbersDiv.appendChild(numberDiv);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        numberDiv.textContent = number;
    }
    retryBtn.disabled = false;
};

const generateNumbers = () => {
    retryBtn.disabled = true;
    generatedNumbers.clear();
    while (generatedNumbers.size < NUMBER_COUNT) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const numbersArray = Array.from(generatedNumbers).sort((a, b) => a - b);
    displayNumbersSequentially(numbersArray);
};

const setYear = () => {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
};

generateBtn.addEventListener('click', generateNumbers);
themeToggle.addEventListener('click', toggleTheme);
retryBtn.addEventListener('click', generateNumbers);

window.addEventListener('load', () => {
    setYear();
    loadTheme();
    retryBtn.disabled = true;
});