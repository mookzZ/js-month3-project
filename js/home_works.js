//GMAIL VALIDATION//

const input = document.querySelector('#gmail_input')
const check = document.querySelector('.gmail_btn')
const result = document.querySelector('.gmail_result')

const regExp = /^\w+@gmail\.com$/

check.onclick = () => {
    console.log(input.value)
    if (regExp.test(input.value)) {
        result.innerText = 'good'
        result.style.color = 'green'
    } else {
        result.innerText = 'incorrect email'
        result.style.color = 'red'
    }
}

//MOVING SQUARE//
const redSquare = document.querySelector('.child_block');
let positionX = 0
let positionY = 0

const moveBlock = () => {
    if (positionX < 446 && positionY === 0) {
        positionX += 1
        redSquare.style.left = positionX + 'px'
    } else if (positionX === 446 && positionY < 446) {
        positionY += 1
        redSquare.style.top = positionY + 'px'
    } else if (positionX > 0 && positionY === 446) {
        positionX -= 1
        redSquare.style.left = positionX + 'px'
    } else if (positionX === 0 && positionY > 0) {
        positionY -= 1
        redSquare.style.top = positionY + 'px'
    }
    setTimeout(moveBlock, 5)
}

moveBlock()

// STOPWATCH //

const stopwatchNumber = document.querySelector('.stopwatch_number')
const stopwatchStart = document.querySelector('.stopwatch_start')
const stopwatchResume = document.querySelector('.stopwatch_resume')
const stopwatchStop = document.querySelector('.stopwatch_stop')
const stopwatchClear = document.querySelector('.stopwatch_clear')

let number = 0

const start = () => {
    number += 1
    stopwatchNumber.innerHTML = `${number} сек.`
}

const stop = () => {
    clearInterval()
}

stopwatchStart.onclick = function (startInterval) {
    setInterval(start, 1000)
}
