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
const redSquare = document.querySelector('.child_block')
let position = 0

function moveBlock() {
    position += 1
    redSquare.style.left = position + "px"
    if (position < 946) {
        setTimeout(moveBlock, 1)
    }
}

moveBlock()
