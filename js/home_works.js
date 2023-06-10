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
let positionX = 0
let positionY = 0

function moveBlock() {
    if (positionX < 446) {
        positionX += 1
        redSquare.style.left = positionX + 'px'
        setTimeout(moveBlock, 1)
    } else if (positionY < 446) {
        positionY += 1
        redSquare.style.top = positionY + 'px'
        setTimeout(moveBlock, 1)
    }
}

moveBlock()
