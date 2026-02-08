const generateBtn = document.getElementById('generate-btn');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');
const yearSpan = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const retryBtn = document.getElementById('retry-btn'); // New
const body = document.body;

const generatedNumbers = new Set();

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

const generateNumbers = () => {
    generatedNumbers.clear();
    while (generatedNumbers.size < 5) { // Changed from 6 to 5
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        generatedNumbers.add(randomNumber);
    }

    const numbersArray = Array.from(generatedNumbers).sort((a, b) => a - b);
    displayNumbers(numbersArray);
    retryBtn.disabled = false; // Enable retry button after generation
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

const setYear = () => {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
};

generateBtn.addEventListener('click', generateNumbers);
themeToggle.addEventListener('click', toggleTheme);
retryBtn.addEventListener('click', generateNumbers); // New event listener for retry button

window.addEventListener('load', () => {
    setYear();
    loadTheme();
    // Initial state of retry button
    retryBtn.disabled = true; // Initially disable the retry button
});