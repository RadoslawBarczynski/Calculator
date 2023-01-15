//display variables
const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber');
const mathSign = document.querySelector('.mathSign');

//panel variables
const numbersButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

//history variables
const calculatorHistory = document.querySelector('.history');
const historyClearButton = document.querySelector('.history-btn');

let result = '';


function displayNumber(){
    if(this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
    if(this.textContent === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '.0'
    currentNumber.innerHTML += this.textContent;
}

function operate(){
    if(currentNumber.innerHTML === '' && this.textContent ==='-'){
        currentNumber.innerHTML = '-';
        return;
    }

    else if(currentNumber.innerHTML === ''){
        return;
    }

    if(mathSign.innerHTML !== ''){
       calculateResults(); 
    }
    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = '';
}

function calculateResults(){
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operate = mathSign.innerHTML;

    switch(operate){
        case '+':
            result = a + b;
            break;
        case '-':
            result = b - a;
            break;
        case 'x':
            result = a * b;
            break;
        case ':':
            result = b / a;
            break;
        case '2^':
            result = b**a;
    }

    addToHistory();
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function addToHistory(){
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML}
     ${previousNumber.innerHTML} = ${result}`
     newHistoryItem.classList.add('history-item');
     calculatorHistory.appendChild(newHistoryItem);
}

function clearResult(){
    result = '';
    previousNumber.innerHTML = '';
    currentNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function clearHistory(){
    var delChild = calculatorHistory.lastChild;
    while(delChild){
        calculatorHistory.removeChild(delChild);
        delChild = calculatorHistory.lastChild;
    }
}


//eventlisteners
operatorButtons.forEach((button) => button.addEventListener('click', operate));
numbersButtons.forEach((button) => button.addEventListener('click', displayNumber));
equalsButton.addEventListener('click', calculateResults);
clearButton.addEventListener('click', clearResult);
historyClearButton.addEventListener('click', clearHistory);

