const floatMenu = document.querySelector(".float-menu");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");

const startBtn = floatMenu.querySelector(".start-btn");

const result = section2.querySelector(".result"),
        playerScore = section2.querySelector("#player-score"),
        computerScore = section2.querySelector("#computer-score"),
        playerWeapon = section2.querySelector("#player-weapon"),
        computerWeapon = section2.querySelector("#computer-weapon"),
        cardPlayer = section2.querySelector(".card-player")
        cardComputer = section2.querySelector(".card-computer");

const rockButton = section3.querySelector(".rock-btn"),
        paperButton = section3.querySelector(".paper-btn"),
        scissorButton = section3.querySelector(".scissor-btn"),
        goBtn = section3.querySelector(".go-btn"),
        goBtnText = section3.querySelector("#go-btn-text");

const selection = ["rock", "paper", "scissor"];
let stat = 0;
let score = [0,0];
let time = 0;
let countdown = null;

let computer = getRandomChoice();
let player = getRandomChoice();

function getRandomChoice()
{
    let random = Math.floor(Math.random() * (selection.length));
    return selection[random];
}

function playRound(p_player, p_computer)
{
    if (p_player == p_computer)
    {
        stat = 3;
        result.innerText = "Tie!";
    }
    else
    {
        if (p_player == "paper" &&
            p_computer == "rock")
        {
            stat = 0;
            result.innerText = `You win! ${p_player} beats ${p_computer}`;
        }
        else if (p_player == "scissor" &&
                p_computer == "paper")
        {
            stat = 0;
            result.innerText = `You win! ${p_player} beats ${p_computer}`;
        }
        else if (p_player == "rock" &&
                p_computer == "scissor")
        {
            stat = 0;
            result.innerText = `You win! ${p_player} beats ${p_computer}`;
        }
        else if (p_player == "rock" &&
                p_computer == "paper")
        {
            stat = 1;
            result.innerText = `You lose! ${p_player} beats ${p_computer}`;
        }
        else if (p_player == "paper" &&
                p_computer == "scissor")
        {
            stat = 1;
            result.innerText = `You lose! ${p_player} beats ${p_computer}`;
        }
        else if (p_player == "scissor" &&
                p_computer == "rock")
        {
            stat = 1;
            result.innerText = `You lose! ${p_player} beats ${p_computer}`;
        }
    }
    game();
}

function handleRockButton()
{
    player = "rock";
}

function handlePaperButton()
{
    player = "paper";
}

function handlescissorButton()
{
    player = "scissor";
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

function endGame(p_player, p_computer)
{
    score[0] = 0;
    score[1] = 0;
    floatMenu.classList.add("show", p_player);
    floatMenu.classList.remove("hide", p_computer);
    clearInterval(countdown);
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

function handleGoBtn()
{
    time = 3;
    goBtn.disabled = true;
    goBtnText.innerText = time;
    cardPlayer.classList.add("player-anim");
    cardComputer.classList.add("computer-anim");
    countdown = setInterval(handleInterval, 1000);
}

function handleInterval()
{
    time--;
    goBtnText.innerText = time;

    if (time == 0)
    {
        playRound(player, computer);
        arenaReplaceSrc(player, computer);
        computer = getRandomChoice();
        player = getRandomChoice();
        cardPlayer.classList.remove("player-anim")
        cardComputer.classList.remove("computer-anim")
        goBtn.disabled = false;
        goBtnText.innerText = "Go";
        clearInterval(countdown);
    }
}

function arenaReplaceSrc(p_player, p_computer)
{
    playerWeapon.src = `src/${p_player}.png`;
    computerWeapon.src = `src/${p_computer}.png`;
}

function init()
{
    startBtn.addEventListener("click", handleStartBtn);
    rockButton.addEventListener("click", handleRockButton);
    paperButton.addEventListener("click", handlePaperButton);
    scissorButton.addEventListener("click", handlescissorButton);
    goBtn.addEventListener("click", handleGoBtn);
}

init();