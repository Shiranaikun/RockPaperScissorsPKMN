const fighters = ["🧱", "📝", "✂️"]

const submitBTN = document.getElementById("submit-btn")
let rounds = document.getElementById("round-field")
const messageEL = document.getElementById("message")
const roundsCNT = document.getElementById("roundsCounter")
const fighterSLCT = document.getElementById("fighterSelection")
const arenaField = document.getElementById("arena")
const resultField = document.getElementById("result")
let playerChoice = ""

let aiChoice = ""
const pScoreField = document.getElementById("pScore")
const aiScoreField = document.getElementById("AIScore")
let playerPoints = 0
let aiPoints = 0
const audio = new Audio('media/buttonSound.mp3');
const victory = new Audio('media/Victory.mp3')

let isAlive = true

startGame()
submitBTN.addEventListener("click", function () {
    audio.play();
    rounds = document.getElementById("round-field").value
    renderScreen()
})

function renderScreen() {

    if (rounds >= 0 && isAlive === true) {
        let availableFighters = ""

        for (let i = 0; i < fighters.length; i++) {
            availableFighters += fighters[i] + " "
        }
        messageEL.textContent = "Choose your Fighter! "
        roundsCNT.textContent = "Matches left: " + rounds
        AImove()
    }
}

function AImove() {
    aiChoice = Math.floor(Math.random() * fighters.length)
    console.log(aiChoice)
    console.log(fighters[aiChoice])
    aiChoice = fighters[aiChoice]
}

function fight() {

    if (isAlive) {

        if (playerChoice === aiChoice) {
            resultField.textContent = "It's a draw!"
            arenaField.textContent = playerChoice + " VS " + aiChoice
        } else if (playerChoice === fighters[0]) {
            if (aiChoice === fighters[2]) {
                arenaField.textContent = "🧱 VS " + fighters[2]
                resultField.textContent = "The player has won!"
                playerPoints++
            } else {
                resultField.textContent = "The computer has won!"
                arenaField.textContent = "🧱 VS " + fighters[1]
                aiPoints++
            }
        } else if (playerChoice === fighters[1]) {
            if (aiChoice === fighters[0]) {
                arenaField.textContent = "📝 VS " + fighters[0]
                resultField.textContent = "The player has won!"
                playerPoints++
            } else {
                resultField.textContent = "The computer has won!"
                arenaField.textContent = "📝 VS " + fighters[2]
                aiPoints++
            }
        } else if (playerChoice === fighters[2]) {
            if (aiChoice === fighters[1]) {
                arenaField.textContent = fighters[2] + " VS 📝"
                resultField.textContent = "The player has won!"
                playerPoints++
            } else {
                resultField.textContent = "The computer has won!"
                arenaField.textContent = fighters[2] + " VS " + fighters[0]
                aiPoints++
            }
        }
        aiScoreField.textContent = "Computer: " + aiPoints
        pScoreField.textContent = "Player: " + playerPoints
        renderScreen()
    }

    if (rounds === 0) {
        if (aiPoints < playerPoints) {
            messageEL.textContent = "You have won the matches! ";
        }

        else if (aiPoints > playerPoints) {
            messageEL.textContent = "The computer has won the Matches!";
        }

        else {
            messageEL.textContent = "The matches are a draw!";
        }
        isAlive = false
        victory.play()
    }

}


fighterSLCT.addEventListener("click", getUserChoice)

function getUserChoice(event) {
    if (event.target.tagName === "BUTTON") {
        console.log(event.target.id)
        playerChoice = event.target.id
        rounds--;
        renderScreen();
    }
    fight()
}

function startGame() {
    playerPoints = 0
    aiPoints = 0
}
