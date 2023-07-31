const Player = (sign) => {
    return { sign }
};

const gameBoard = (() => {
    const board = new Array(9);
    const setBoard = (index, sign) => {
        board[index] = sign;
    }
    const getBoard = (index) => {
        return board[index];
    }

    return { board, setBoard, getBoard };
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 0;

    const currentRound = () => {
        const playRound = () => {
            round++;
        }

        const getCurrentPlayerSign = () => {
            return (round % 2 == 1) ? playerX.sign : playerO.sign;
        }

        const getCurrentOpponentSign = () => {
            return (getCurrentPlayerSign() == playerX.sign) ? playerO.sign : playerX.sign;
        }

        return { playRound, getCurrentPlayerSign, getCurrentOpponentSign };
    }

    const analyzeGame = () => {
        let isGameOver = false;
        let isGameTie = false;

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

            if (!playerMoves.includes(undefined) &&
                !playerMoves.includes(currentRound().getCurrentOpponentSign())) {
                isGameOver = true;
            }

            if (!gameBoard.board.includes(undefined)) {
                isGameTie = true;
            }
        }

        return { isGameOver, isGameTie };
    }

    return { currentRound, analyzeGame };
})();

const displayController = (() => {
    const fields = document.querySelectorAll(".field");
    const message = document.querySelector(".message");

    const updateMessage = () => {
        const playersTurnMessage = `${gameController.currentRound().getCurrentOpponentSign()}'s turn`;
        const gameOverMessage = `Winner is ${gameController.currentRound().getCurrentPlayerSign()}`;
        const gameTieMessage = `The game is tie!`;

        if (gameController.analyzeGame().isGameOver) return gameOverMessage;
        if (gameController.analyzeGame().isGameTie) return gameTieMessage;

        return playersTurnMessage;
    }

    message.textContent = updateMessage();
    
    const setAIMove = () => {
        
        const setRandomLegalMove = () => {
            let vacantBoardIndexes = [];
            
            for (let i = 0; i < gameBoard.board.length; i++) {
                if (gameBoard.board[i] == undefined) vacantBoardIndexes.push(i);
            }
            
            let random = Math.floor(Math.random() * (vacantBoardIndexes.length - 1));

            console.log(vacantBoardIndexes[random]);
        }

        return { setRandomLegalMove }
    }

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", () => {
            if (fields[i].textContent != "" || gameController.analyzeGame().isGameOver) return;

            gameController.currentRound().playRound();
            gameBoard.setBoard(i, gameController.currentRound().getCurrentPlayerSign());
            message.textContent = updateMessage();
            fields[i].textContent = gameBoard.getBoard(i);
            gameController.analyzeGame();

            setAIMove().setRandomLegalMove();
        })
    }
})();