let vMode = '';
let vBasic = document.querySelector('#v_basic');
let vAdvanced = document.querySelector('#v_advanced');
let advancedDiv = document.querySelector('#advanced');
let generate = document.querySelector('#generate');
let result = document.querySelector('#result');
let min = document.querySelector('#min');
let max = document.querySelector('#max');
let evens = document.querySelector('#even');
let odds = document.querySelector('#odd');
let both = document.querySelector('#both');

chrome.storage.sync.get('mode', ({ mode }) => {
    vMode = mode;
    if (vMode === 'basic') {
        vBasic.checked = true;
        advancedDiv.style.display = 'none';
    } else if (vMode === 'advanced') {
        vAdvanced.checked = true;
        both.checked = true;
    }
});

// check when modes are selected
vBasic.addEventListener('click', () => {
    setMode('basic');
    vBasic.checked = true;
    advancedDiv.style.display = 'none';
    both.checked = true;
});

vAdvanced.addEventListener('click', () => {
    setMode('advanced');
    vAdvanced.checked = true;
    advancedDiv.style.display = 'block';
    both.checked = true;
});

// generate random number when button is clicked
generate.addEventListener('click', () => {
    result.innerHTML = newNum(parseInt(min.value), parseInt(max.value));
});

// set the view mode of extension
function setMode(mode) {
    chrome.storage.sync.set({ mode });
}

// grabs min and max from form
function newNum(min, max) {
    if (evens.checked) {
        return generateNum(min, max, 2);
    }
    else if (odds.checked) {
        return generateNum(min, max, 1);
    }
    return generateNum(min, max);
}

// generates random number
function generateNum(min, max, mode=0) {
    var randn = Math.floor(Math.random() * (max - min + 1)) + min;
    if (mode === 1) {
        do {
            randn = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randn % 2 == 0);
    }
    else if (mode === 2) {
        do {
            randn = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randn % 2 == 1);
    }
    return randn;
}

// checks if number is even or odd
function checkType(num, mode) {
    // check if even
    if (mode === 0) {
        if (num % 2 === 0) {
            return true;
        }
        return false;
    }
    // check if odd
    if (mode === 1) {
        if (num % 2 === 0) {
            return false;
        }
        return true;
    }
}
