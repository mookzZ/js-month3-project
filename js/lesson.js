// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

let slide = 0

const autoSlider = () => {
    setInterval(() => {
        if (slide <= 4) {
            hideTabContent()
            showTabContent(slide)
            slide++
        } else {
            slide = 0
            hideTabContent()
            showTabContent(0)
            slide++
        }
    }, 3000)
}

autoSlider()

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

const modalOpen = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', modalOpen)
    }
}

window.addEventListener('scroll', modalOpen)

setTimeout(openModal, 10000)

// weather

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