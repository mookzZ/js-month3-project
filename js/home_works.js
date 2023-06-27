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

// const modal = document.querySelector('.modal')
// const modalTrigger = document.querySelector('#btn-get')
// const closeModalButton = document.querySelector('.modal_close')
//
// const openModal = () => {
//     modal.style.display = 'block'
//     document.body.style.overflow = 'hidden'
// }
//
// const closeModal = () => {
//     modal.style.display = 'none'
//     document.body.style.overflow = ''
// }
//
// modalTrigger.onclick = () => openModal()
// closeModalButton.onclick = () => closeModal()
// modal.onclick = (event) => event.target === modal && closeModal()
//
// window.addEventListener('scroll', function() {
//     if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
//         openModal()
//     }
// })
//
// setTimeout(openModal, 10000)

// CURRENCY CONVERTER

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')

const convert = (element, targetElement, targetElement2, curr) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../json/currency.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            if (curr === 'curSom') {
                targetElement.value = (element.value / response.somUsd).toFixed(2)
                targetElement2.value = (element.value / response.somEur).toFixed(2)
            } else if (curr === 'curUsd') {
                targetElement.value = (element.value * response.somUsd).toFixed(2)
                targetElement2.value = (element.value * response.usdEur).toFixed(2)
            } else {
                targetElement.value = (element.value * response.somEur).toFixed(2)
                targetElement2.value = (element.value * response.eurUsd).toFixed(2)
            }
            element.value === '' && (targetElement.value = '')
            element.value === '' && (targetElement2.value = '')
        }
    }
}

convert(som, usd, eur, 'curSom')
convert(usd, som, eur, 'curUsd')
convert(eur, som, usd, 'curEur')


// CARDS

const card = document.querySelector('.card')
const nextButton = document.querySelector('.next')
const prevButton = document.querySelector('.prev')
let count = 1

const dataRequest = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                        <h3>Title: ${data.title}</h3>
                        <div>ID: ${data.id}</div>
                        <div>${data.completed}</div>
                    `
        })
}

const cardRequest = (button) => {
    if (button === 'next') {
        if (count < 200) {
            count++
            dataRequest()
        } else {
            count = 200
        }
    } else if (button === 'prev') {
        if (count > 1) {
            count--
            dataRequest()
        } else {
            count = 1
        }
    } else {
        count = 1
        dataRequest()
    }
}


nextButton.onclick = () => cardRequest('next')
prevButton.onclick = () => cardRequest('prev')

cardRequest()

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })