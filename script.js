function getComputerChoice() {
    let result;
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function judgeWinner(playerSelection, computerChoice) {
    let pS = playerSelection.toLowerCase();
    let cC = computerChoice.toLowerCase();
    if (pS === "rock") {
        if (cC === "rock") {
            return "Draw! Both Rocks";
        } else if (cC === "scissors") {
            return "You Win! Rock beats Scissors";
        } else if (cC === "paper") {
            return "You Lose! Paper beats Rock";
        }
    }
    if (pS === "scissors") {
        if (cC === "rock") {
            return "You Lose! Rock Beats Rock";
        } else if (cC === "scissors") {
            return "Draw! Both Scissors";
        } else if (cC === "paper") {
            return "You Win! Scissors beats Paper";
        }
    }
    if (pS === "paper") {
        if (cC === "rock") {
            return "You Win! Paper beats Rock";
        } else if (cC === "scissors") {
            return "You Lose! Scissors beats Paper";
        } else if (cC === "paper") {
            return "Draw! Both Paper";
        }
    }
}

function getPointOfCurrentRound(playerSelection, computerChoice) {
    let pS = playerSelection.toLowerCase();
    let cC = computerChoice.toLowerCase();
    if (pS === "rock") {
        if (cC === "rock") {
            return 0;
        } else if (cC === "scissors") {
            return 1;
        } else if (cC === "paper") {
            return -1;
        }
    }
    if (pS === "scissors") {
        if (cC === "rock") {
            return -1;
        } else if (cC === "scissors") {
            return 0;
        } else if (cC === "paper") {
            return 1;
        }
    }
    if (pS === "paper") {
        if (cC === "rock") {
            return 1;
        } else if (cC === "scissors") {
            return -1;
        } else if (cC === "paper") {
            return 0;
        }
    }
}

function gameRound() {
    let playerSelection = prompt("Make Your Choice(rock, paper or scissors)");
    let computerChoice = getComputerChoice();
    return judgeWinner(playerSelection, computerChoice);
}

function playGame() {
    let point = 0;
    for (let i = 0; i < 5; i++) {
        if (gameRound().startsWith("You Win")) {
            point++;
        }
    }
    console.log("Game Over! Your Point: " + point);
}

const choiceBtns = document.querySelectorAll(".choice");
const playerSelectionBox = document.querySelector("#player-selection");
const computerSelectionBox = document.querySelector('#computer-selection');

let playerPoint = 0;
let round = 1;

function cauculateTotalPoint(currentPoint, pointOfCurrentRound) {
    if (currentPoint > 0) {
        return currentPoint + pointOfCurrentRound;
    } else if (currentPoint === 0) {
        if (pointOfCurrentRound <= 0) {
            return 0;
        } else if (pointOfCurrentRound === 1) {
            return 1;
        }
    }
}

function displayScoreChanging(pointOfCurrentRound) {
    const scoreChangingBox = document.querySelector(".score-changing");
    if (pointOfCurrentRound === 1) {
        scoreChangingBox.setAttribute("id", "score-increasing");
        scoreChangingBox.textContent = "+1";
    } else if (pointOfCurrentRound === -1) {
        scoreChangingBox.setAttribute("id", "score-decreasing");
        scoreChangingBox.textContent = "-1";
    } else if (pointOfCurrentRound === 0) {
        scoreChangingBox.setAttribute("id", "score-drawing");
        scoreChangingBox.textContent = "0";
    }

    scoreChangingBox.style.opacity = "1";

    setTimeout(() => {
        scoreChangingBox.style.opacity = "0";
    }, 480);
}

choiceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        choiceBtns.forEach(button => {
            button.disabled = true;
        });

        let computerSelection = getComputerChoice();
        let playerSelection = btn.getAttribute("id");

        playerSelectionBox.textContent = btn.textContent;
        computerSelectionBox.textContent = document.getElementById(computerSelection).textContent;

        pointOfCurrentRound = getPointOfCurrentRound(playerSelection, computerSelection);
        playerPoint = cauculateTotalPoint(playerPoint, pointOfCurrentRound);
        document.querySelector("#score-display").textContent = "Score: " + playerPoint
        playerSelectionBox.style.transform = "scale(1.2)";
        computerSelectionBox.style.transform = "scale(1.2)";
        document.querySelector("#score-display").style.transform = "scale(1.2)";
        displayScoreChanging(pointOfCurrentRound);

        setTimeout(() => {
            document.querySelector("#score-display").style.transform = "scale(1)";
            playerSelectionBox.style.transform = "scale(1.0)";
            computerSelectionBox.style.transform = "scale(1.0)";
        }, 260);

        setTimeout(() => {
            playerSelectionBox.textContent = "";
            computerSelectionBox.textContent = "";
            choiceBtns.forEach(button => {
                button.disabled = false;
            });
            document.querySelector("#round-display").textContent = "Round: " + ++round;
        }, 680);
    })
})