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

playGame();