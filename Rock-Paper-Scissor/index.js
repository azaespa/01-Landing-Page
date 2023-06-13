const rockButton = document.querySelector(".rock"),
        paperButton = document.querySelector(".paper"),
        scissorsButton = document.querySelector(".scissors");
const selection = ["Rock", "Paper", "Scissors"];
let stat = 0;

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
        console.log("Tie!");
    }
    else
    {
        if (player == "paper" &&
            computer == "rock")
        {
            stat = 0;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "scissors" &&
                computer == "paper")
        {
            stat = 0;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "rock" &&
                computer == "scissors")
        {
            stat = 0;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "rock" &&
                computer == "paper")
        {
            stat = 1;
            console.log("You lose! %s beats %s", player, computer);
        }
        else if (player == "paper" &&
                computer == "scissors")
        {
            stat = 1;
            console.log("You lose! %s beats %s", player, computer);
        }
        else if (player == "scissors" &&
                computer == "rock")
        {
            stat = 1;
            console.log("You lose! %s beats %s", player, computer);
        }
    }
}

function handleRockButton()
{
    playerSelection = "Rock";
}

function handlePaperButton()
{
    playerSelection = "Paper";
}

function handleScissorsButton()
{
    playerSelection = "Scissors";
}

function game()
{
    let score = [0,0];
    let end = false;
    do 
    {
        let player = prompt("Rock/Paper/Scissors?").toLowerCase();
        let computer = getComputerChoice().toLowerCase();
        playRound(player, computer);
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
            console.log("Player: %i Computer: %i\n", score[0], score[1]);
        }
        if (score[0] == 5 ||
            score[1] == 5)
        {
            end = true;
        }
    } while (!end);
}

function init()
{
    rockButton.addEventListener("click", handleRockButton);
    paperButton.addEventListener("click", handlePaperButton);
    scissorsButton.addEventListener("click", handleScissorsButton);
    game();
}

init();