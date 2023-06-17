const section3 = document.querySelector(".section-3");

const rockButton = document.querySelector(".rock"),
        paperButton = document.querySelector(".paper"),
        scissorsButton = document.querySelector(".scissors");

const result = section3.querySelector(".result");

const playerScore = section3.querySelector(".player"),
        computerScore = section3.querySelector(".computer");

const selection = ["Rock", "Paper", "Scissors"];
let stat = 0;

let computer = getComputerChoice().toLowerCase();

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
}

function handleRockButton()
{
    playerSelection = "rock";
    playRound(playerSelection, computer);
}

function handlePaperButton()
{
    playerSelection = "paper";
    playRound(playerSelection, computer);
}

function handleScissorsButton()
{
    playerSelection = "scissors";
    playRound(playerSelection, computer);
}

function game()
{
    let score = [0,0];
    let end = false;
    // do 
    // {
    //     let player = prompt("Rock/Paper/Scissors?").toLowerCase();
    //     let computer = getComputerChoice().toLowerCase();
    //     playRound(player, computer);
    //     if (stat != 3)
    //     {
    //         if (stat == 0)
    //         {
    //             score[0] += 1;
    //         }
    //         else if (stat == 1)
    //         {
    //             score[1] += 1
    //         }
    //         console.log("Player: %i Computer: %i\n", score[0], score[1]);
    //     }
    //     if (score[0] == 5 ||
    //         score[1] == 5)
    //     {
    //         end = true;
    //     }
    // } while (!end);
}

function init()
{
    rockButton.addEventListener("click", handleRockButton);
    paperButton.addEventListener("click", handlePaperButton);
    scissorsButton.addEventListener("click", handleScissorsButton);
    game();
}

init();