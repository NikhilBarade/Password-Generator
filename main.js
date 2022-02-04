// Dom Element
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomsymbol
};

//add event to generate password
    generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

   resultEl.innerText = generatePassword (
    hasLower, 
    hasUpper, 
    hasNumber, 
    hasSymbol, 
    length
    );
});
// copy password to clipboard

clipboardEl.addEventListener('click' , () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Hey Nikky Password Copied To Clipboard!');
});

//generate password using a function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. filter out unchecked types
    // 2. loop over length call generator function for each type
    // 3. add finalpw to the pw var and return
    // 4. init pw var

    let generatedPassword = "";

    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount:', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
    );

   // console.log('typesArr:', typesArr);

    if (typesCount === 0) {

        return '';
        
    }

    for(let i=0; i<length; i+= typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

           // console.log('funcName:', funcName);

            generatedPassword +=randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}



//Gererate Function 
//https://net-comber.com/charset.html 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomsymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols [Math.floor(Math.random() * symbols.length)];
}

