const floatMenu = document.querySelector(".float-menu");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");

const startBtn = floatMenu.querySelector(".start-btn");

const result = section2.querySelector(".result"),
        playerScore = section2.querySelector("#player-score"),
        computerScore = section2.querySelector("#computer-score");

const rockButton = section3.querySelector(".rock-btn"),
        paperButton = section3.querySelector(".paper-btn"),
        scissorButton = section3.querySelector(".scissor-btn");

const selection = ["Rock", "Paper", "Scissors"];
let stat = 0;
let score = [0,0];

let comp = getComputerChoice().toLowerCase();

function getComputerChoice()
{
    let random = Math.floor(Math.random() * (selection.length));
    return selection[random];
}

function playRound(player, computer)
{
    if (player == computer)
    {
        stat = 3;
        result.innerText = "Tie!";
    }
    else
    {
        if (player == "paper" &&
            computer == "rock")
        {
            stat = 0;
            result.innerText = `You win! ${player} beats ${computer}`;
        }
        else if (player == "scissors" &&
                computer == "paper")
        {
            stat = 0;
            result.innerText = `You win! ${player} beats ${computer}`;
        }
        else if (player == "rock" &&
                computer == "scissors")
        {
            stat = 0;
            result.innerText = `You win! ${player} beats ${computer}`;
        }
        else if (player == "rock" &&
                computer == "paper")
        {
            stat = 1;
            result.innerText = `You lose! ${player} beats ${computer}`;
        }
        else if (player == "paper" &&
                computer == "scissors")
        {
            stat = 1;
            result.innerText = `You lose! ${player} beats ${computer}`;
        }
        else if (player == "scissors" &&
                computer == "rock")
        {
            stat = 1;
            result.innerText = `You lose! ${player} beats ${computer}`;
        }
    }
    game();
    comp = getComputerChoice().toLowerCase();
    
}

function handleRockButton()
{
    playerSelection = "rock";
    playRound(playerSelection, comp);
}

function handlePaperButton()
{
    playerSelection = "paper";
    playRound(playerSelection, comp);
}

function handlescissorButton()
{
    playerSelection = "scissors";
    playRound(playerSelection, comp);
}

function game()
{
    if (stat != 3)
    {
        if (stat == 0)
        {
            score[0] += 1;
        }
        else if (stat == 1)
        {
            score[1] += 1
        }
        playerScore.innerText = score[0];
        computerScore.innerText = score[1];
    }
    if (score[0] == 5)
    {
        result.innerText = "The winner is Player";
        endGame("win", "lose");
    } 
    else if (score[1] == 5) 
    {
        result.innerText = "The winner is Computer";
        endGame("lose", "win");
    }
}

function endGame(player, computer)
{
    score[0] = 0;
    score[1] = 0;
    floatMenu.classList.add("show", player);
    floatMenu.classList.remove("hide", computer);
}

function handleStartBtn()
{
    if (floatMenu.classList.contains("show"))
    {
        floatMenu.classList.add("hide");
        floatMenu.classList.remove("show");
        playerScore.innerText = 0;
        computerScore.innerText = 0;
    }
}

function init()
{
    startBtn.addEventListener("click", handleStartBtn);
    rockButton.addEventListener("click", handleRockButton);
    paperButton.addEventListener("click", handlePaperButton);
    scissorButton.addEventListener("click", handlescissorButton);
}

init();