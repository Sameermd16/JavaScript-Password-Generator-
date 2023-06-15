//DOM elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

//generator functions
//generates random number between 0 to 25 i.e total of 26 characters
//  randomNumber = Math.floor(Math.random() * 26)
const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//something happens when clicked on generate password button
//listening for event
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value 
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked 
    const hasNumber = numbersEl.checked 
    const hasSymbol = symbolsEl.checked 

    resultEl.textContent = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

//generate password function 
function generatePassword(upper, lower, number, symbol, length) {
    // 1. in it pw var 
    // 2. filter out unchecked types
    // 3. loop over length call generator function for each type
    // 4. add final pw to the pw var and return 
    let Password = ''

    const typesCount = upper + lower + number + symbol //4

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])
    // console.log("types array: ", typesArr)

    if(typesArr === 0) {
        return ''
    }
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            // console.log("funcName: ", funcName)
            Password += randomFunc[funcName]()
        })
    }
    const finalPassword = Password.slice(0, length)
    return finalPassword
}

//copy to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const myPassword = resultEl.textContent
    if(!myPassword) {
        return;
    }
    textarea.value = myPassword
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('password copied')
})

function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
