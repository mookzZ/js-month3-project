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

// CURRENCY CONVERTER

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')

const convert = (element, targetElement, targetElement2, curr) => {
    element.oninput = () => {
        const fetchData = async () => {
            try {
                const response = await fetch('../json/currency.json')
                const data = await response.json()
                if (curr === 'curSom') {
                    targetElement.value = (element.value / data.somUsd).toFixed(2)
                    targetElement2.value = (element.value / data.somEur).toFixed(2)
                } else if (curr === 'curUsd') {
                    targetElement.value = (element.value * data.somUsd).toFixed(2)
                    targetElement2.value = (element.value * data.usdEur).toFixed(2)
                } else {
                    targetElement.value = (element.value * data.somEur).toFixed(2)
                    targetElement2.value = (element.value * data.eurUsd).toFixed(2)
                }
                element.value === '' && (targetElement.value = '')
                element.value === '' && (targetElement2.value = '')
            } catch (e) {
                console.error(e, 'error')
            }
        }
        fetchData()
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

const dataRequest = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        card.innerHTML = `
                        <h3>Title: ${data.title}</h3>
                        <div>ID: ${data.id}</div>
                        <div>${data.completed}</div>`
    } catch (e) {
        console.error(e, 'error')
    }
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

////////////////////////

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })


// WEATHER
const city = document.querySelector('.weather_city')
const temp = document.querySelector('.weather_temp')
const apiKey = 'e417df62e04d3b1b111abeab19cea714'

const citySearch = () => {
    const inputCity = document.querySelector('#weather_inputCity')
    inputCity.oninput = (event) => {
        const cityNameValue = event.target.value
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}`)
                const data = await response.json()
                city.innerHTML = `Город: ${data?.name ? data.name : 'City not found...'}`
                temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '°C' : '...'
            } catch (e) {
                console.error(e, 'fatal error')
            }
        }
        fetchWeather()
    }
}

citySearch()