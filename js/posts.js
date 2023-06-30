const fetchCards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        const cardCont = document.querySelector('.cards_inner')
        let count = 0
        data.forEach(() => {
            const card = document.createElement('div')
            card.classList.add('card')
            const img = document.createElement('img')
            img.src = '../img/red.png'
            const span = document.createElement('span')
            span.innerHTML = data[count].title
            const p = document.createElement('p')
            p.innerHTML = data[count].body
            card.append(img, span, p)
            cardCont.append(card)
            count++
        })
        console.log(data)
    } catch (e) {
        console.error(e, 'error')
    }
}

fetchCards()

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