const selection = ["Rock", "Paper", "Scissors"];
let tied = false;

function getComputerChoice()
{
    let random = Math.floor(Math.random() * (selection.length));
    return selection[random];
}

const computerSelection = getComputerChoice();

function playRound(player, computer)
{
    // Paper beats Rock
    // Scissor beats Paper
    // Rock beats Scissor
    // If player inputs paper and computer inputs rock.
    if (player == computer)
    {
        tied = true;
        console.log("Tie!");
    }
    else
    {
        if (player == "paper" &&
            computer == "rock")
        {
            tied = false;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "scissors" &&
                computer == "paper")
        {
            tied = false;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "rock" &&
                computer == "scissors")
        {
            tied = false;
            console.log("You win! %s beats %s", player, computer);
        }
        else if (player == "rock" &&
                computer == "paper")
        {
            tied = false;
            console.log("You lose! %s beats %s", player, computer);
        }
        else if (player == "paper" &&
                computer == "scissors")
        {
            tied = false;
            console.log("You lose! %s beats %s", player, computer);
        }
        else if (player == "scissors" &&
                computer == "rock")
        {
            tied = false;
            console.log("You lose! %s beats %s", player, computer);
        }
    }
}

function game()
{
    let score = 0;
    do 
    {
        let player = prompt("Rock/Paper/Scissors?").toLowerCase();
        let computer = computerSelection.toLowerCase();
        playRound(player, computer);
        if (!tied)
        {
            score++;
        }
    } while (score < 5);
}

function init()
{
    game();
}

init();