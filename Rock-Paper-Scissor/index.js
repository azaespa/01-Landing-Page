const floatMenu = document.querySelector(".float-menu");
const section3 = document.querySelector(".section-3");
const section4 = document.querySelector(".section-4");

const startBtn = floatMenu.querySelector(".start-btn");

const rockButton = section3.querySelector(".rock-btn"),
        paperButton = section3.querySelector(".paper-btn"),
        scissorButton = section3.querySelector(".scissor-btn");

const result = section4.querySelector(".result"),
    scores = section4.querySelector(".scores");

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
        scores.innerText = `Player: ${score[0]} Computer: ${score[1]}`;
    }
    if (score[0] == 5)
    {
        result.innerText = "The winner is Player";
        endGame();
    } 
    else if (score[1] == 5) 
    {
        result.innerText = "The winner is Computer";
        endGame();
    }
}

function endGame()
{
    score[0] = 0;
    score[1] = 0;
    scores.innerText = `Player: ${score[0]} Computer: ${score[1]}`;
    floatMenu.classList.add("show");
    floatMenu.classList.remove("hide");
}

function handleStartBtn()
{
    if (floatMenu.classList.contains("show"))
    {
        floatMenu.classList.add("hide");
        floatMenu.classList.remove("show");
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