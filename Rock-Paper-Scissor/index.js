const floatMenu = document.querySelector(".float-menu");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");

const startBtn = floatMenu.querySelector(".start-btn"),
    resultText = floatMenu.querySelector(".result");

const playerScore = section2.querySelector("#player-score"),
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
    }
    else
    {
        if (p_player == "paper" &&
            p_computer == "rock")
        {
            stat = 0;
        }
        else if (p_player == "scissor" &&
                p_computer == "paper")
        {
            stat = 0;
        }
        else if (p_player == "rock" &&
                p_computer == "scissor")
        {
            stat = 0;
        }
        else if (p_player == "rock" &&
                p_computer == "paper")
        {
            stat = 1;
        }
        else if (p_player == "paper" &&
                p_computer == "scissor")
        {
            stat = 1;
        }
        else if (p_player == "scissor" &&
                p_computer == "rock")
        {
            stat = 1;
        }
    }
    game();
}

function handleRockButton()
{
    player = "rock";
    rockButton.classList.add("lock");
    paperButton.classList.remove("lock");
    scissorButton.classList.remove("lock");
}

function handlePaperButton()
{
    player = "paper";
    paperButton.classList.add("lock");
    rockButton.classList.remove("lock");
    scissorButton.classList.remove("lock");
}

function handlescissorButton()
{
    player = "scissor";
    scissorButton.classList.add("lock");
    rockButton.classList.remove("lock");
    paperButton.classList.remove("lock");
}

function removeButtonLock()
{
    rockButton.classList.remove("lock");
    paperButton.classList.remove("lock");
    scissorButton.classList.remove("lock");
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
        resultText.innerText = "You win!";
        endGame("win", "lose");
    } 
    else if (score[1] == 5) 
    {
        resultText.innerText = "You lose!";
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
    cardPlayer.classList.remove("player-anim");
    cardComputer.classList.remove("computer-anim");
    time = 2;
    goBtnText.innerText = time;
    disableButtons()
    arenaResetSrc();
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
        enableButtons();
        removeButtonLock();
        goBtnText.innerText = "Go";
        clearInterval(countdown);
    }
}

function disableButtons()
{
    goBtn.disabled = true;
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorButton.disabled = true;
}


function enableButtons()
{
    goBtn.disabled = false;
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorButton.disabled = false;
}

function arenaReplaceSrc(p_player, p_computer)
{
    playerWeapon.src = `src/${p_player}.png`;
    computerWeapon.src = `src/${p_computer}.png`;
}

function arenaResetSrc()
{
    playerWeapon.src = `src/rock.png`;
    computerWeapon.src = `src/rock.png`;
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