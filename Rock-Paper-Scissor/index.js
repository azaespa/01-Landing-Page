const floatMenu = document.querySelector(".float-menu");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");

const startBtn = floatMenu.querySelector(".start-btn");

const rockButton = section2.querySelector(".rock"),
        paperButton = section2.querySelector(".paper"),
        scissorsButton = section2.querySelector(".scissors");

const result = section3.querySelector(".result"),
    scores = section3.querySelector(".scores");

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
    // Paper beats Rock
    // Scissor beats Paper
    // Rock beats Scissor
    // If player inputs paper and computer inputs rock.
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

function handleScissorsButton()
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
}

function handleStartBtn()
{
    console.log("start button is working");
}

function init()
{
    startBtn.addEventListener("click", handleStartBtn);
    rockButton.addEventListener("click", handleRockButton);
    paperButton.addEventListener("click", handlePaperButton);
    scissorsButton.addEventListener("click", handleScissorsButton);
}

init();