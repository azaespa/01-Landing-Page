const Player = (sign) => {
    return { sign }
};

const gameBoard = (() => {
    const board = new Array(9);
    const setField = (index, sign) => {
        board[index] = sign;
    }
    const getField = (index) => {
        return board[index];
    }

    return { board, setField, getField };
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let currentPlayerSign = "";
    let round = 1;
    let isGameOver = false;

    const getCurrentPlayerSign = () => {
        currentPlayerSign = (round % 2 == 1) ? playerX.sign : playerO.sign;
        round++;
        return currentPlayerSign;
    };

    const getOpponentPlayerSign = () => {
        return (currentPlayerSign == playerX.sign) ? playerO.sign : playerX.sign;
    }

    const analyzeGame = () => {
        const winningMoves = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];

        for (const winningMove of winningMoves) {
            let playerMoves = [];
            for (const winningMoveValue of winningMove.values()) {
                playerMoves.push(gameBoard.board[winningMoveValue - 1]);
            }
            if (!playerMoves.includes(undefined)) {
                if (!playerMoves.includes(getOpponentPlayerSign())) {
                    console.log(playerMoves, winningMove);
                    isGameOver = true;
                }
            }
        }
        console.log(`is game over: ${isGameOver}`)
    } 

    return { getCurrentPlayerSign, analyzeGame };
})();

const displayController = (() => {
    const fields = document.querySelectorAll(".field");

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", () => {
            if (fields[i].textContent != "") return;
            gameBoard.setField(i, gameController.getCurrentPlayerSign());
            fields[i].textContent = gameBoard.getField(i);
            gameController.analyzeGame();
        })
    }
})();