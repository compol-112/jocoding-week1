const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container'); // Changed from lottoNumbersDiv
const yearSpan = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const retryBtn = document.getElementById('retry-btn');
const body = document.body;

let generatedSetsCount = 0;
const MAX_SETS = 5;
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

const displayNumbersSequentially = async (rowElement, numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = '?';
        rowElement.appendChild(numberDiv);
        
        await new Promise(resolve => setTimeout(resolve, 300)); // Slightly faster delay for multiple rows
        numberDiv.textContent = number;
    }

    if (generatedSetsCount === MAX_SETS) {
        retryBtn.disabled = false;
    } else {
        generateBtn.disabled = false; // Re-enable generate button if not all sets are generated
    }
};

const generateNumbers = () => {
    generateBtn.disabled = true; // Disable generate button immediately
    retryBtn.disabled = true; // Also disable retry button during generation

    if (generatedSetsCount < MAX_SETS) {
        const currentSetNumbers = new Set();
        while (currentSetNumbers.size < NUMBER_COUNT) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            currentSetNumbers.add(randomNumber);
        }
        const numbersArray = Array.from(currentSetNumbers).sort((a, b) => a - b);

        const newRowDiv = document.createElement('div');
        newRowDiv.classList.add('lotto-numbers');
        lottoNumbersContainer.appendChild(newRowDiv);
        
        generatedSetsCount++;
        displayNumbersSequentially(newRowDiv, numbersArray);
    }
};

const resetGame = () => {
    lottoNumbersContainer.innerHTML = ''; // Clear all generated rows
    generatedSetsCount = 0;
    generateBtn.disabled = false; // Enable generate button
    retryBtn.disabled = true; // Disable retry button
};

const setYear = () => {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
};

generateBtn.addEventListener('click', generateNumbers);
themeToggle.addEventListener('click', toggleTheme);
retryBtn.addEventListener('click', resetGame); // Call resetGame on retry button click

window.addEventListener('load', () => {
    setYear();
    loadTheme();
    generateBtn.disabled = false; // Ensure generate button is enabled on load
    retryBtn.disabled = true; // Ensure retry button is disabled on load
});