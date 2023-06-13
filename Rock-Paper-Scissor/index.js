const rps = ["Rock", "Paper", "Scissors"];

function getComputerChoice()
{
    let random = Math.floor(Math.random() * (rps.length));
    console.log(rps[random]);
}

function init()
{
    getComputerChoice();
}

init();