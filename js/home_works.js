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
let isNumberRising = true

const risingNumber = () => {
    stopwatchStart.disabled = false
    isNumberRising = true
}

const start = () => {
    if (isNumberRising === true) {
        number += 1
        stopwatchNumber.innerHTML = `${number} сек.`
        setTimeout(start, 1000)
        isNumberRising = true
        stopwatchStart.disabled = true
    }
}

const stop = () => {
    stopwatchResume.disabled = false
    isNumberRising = false
}

const resume = () => {
    stopwatchResume.disabled = true
    isNumberRising = true
}

const clear = () => {
    isNumberRising = false
    number = 0
    stopwatchNumber.innerHTML = `${number} сек.`
}

stopwatchStart.onclick = () => {
    risingNumber()
    start()
}
stopwatchStop.onclick = () => {stop()}
stopwatchResume.onclick = () => {
    resume()
    start()
}
stopwatchClear.onclick = () => {
    clear()
    stopwatchStart.disabled = false
}

// MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
modal.onclick = (event) => event.target === modal && closeModal()

window.addEventListener('scroll', function() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        openModal()
    }
})

setTimeout(openModal, 10000)