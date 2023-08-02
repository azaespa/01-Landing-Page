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

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = undefined;
        }
    }
    
    return { board, setBoard, getBoard, resetBoard };
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 0;
    let playWithAI = false;

    const resetGame = () => {
        gameBoard.resetBoard();
        console.log(gameBoard.board);
        round = 0;
        playWithAI = false;
        analyzeGame().isGameOver = false;
        analyzeGame().isGameTie = false;        
    }

    const currentRound = () => {
        const play = () => {
            round++;
        }

        const getCurrentPlayerSign = () => {
            return (round % 2 == 1) ? playerX.sign : playerO.sign;
        }

        const getCurrentOpponentSign = () => {
            return (getCurrentPlayerSign() == playerX.sign) ? playerO.sign : playerX.sign;
        }

        return { play, getCurrentPlayerSign, getCurrentOpponentSign };
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
                displayController.styleWinningMove(winningMove);
                console.log(isGameOver);
            }
            
            if (!gameBoard.board.includes(undefined)) {
                isGameTie = true;
            }
        }
        
        return { isGameOver, isGameTie };
    }
    
    return { playWithAI, currentRound, analyzeGame, resetGame };
})();

const aiController = (() => {
    const getLegalIndex = () => {
        let vacantBoardIndexes = [];
        
        for (let i = 0; i < gameBoard.board.length; i++) {
            if (gameBoard.board[i] == undefined) vacantBoardIndexes.push(i);
        }
        
        let random = vacantBoardIndexes[Math.floor(Math.random() * vacantBoardIndexes.length)];
    
        return { random };
    }
    
    return { getLegalIndex }
})();

const displayController = (() => {
    const fields = document.querySelectorAll(".field");
    const message = document.querySelector(".message");
    const resetGame = document.querySelector("#reset-game");
    
    const resetDisplay = () => {
        for (const field of fields) {
            field.textContent = "";
        }
        message.textContent = updateMessage();
    }

    const updateMessage = () => {
        const playersTurnMessage = `PLAYER ${gameController.currentRound().getCurrentOpponentSign()} TURN`;
        const gameOverMessage = `${gameController.currentRound().getCurrentPlayerSign()} WON!`;
        const gameTieMessage = `THE GAME IS TIE!`;
        
        if (gameController.analyzeGame().isGameOver) return gameOverMessage;
        if (gameController.analyzeGame().isGameTie) return gameTieMessage;

        return playersTurnMessage;
    }

    const resetStyleWinningMove = () => {
        for (let i = 0; i < fields.length; i++) {
            fields[i].removeAttribute("data-winning-move");
        }
    }

    const styleWinningMove = (winningMove) => {
        for (let index of winningMove) {
            fields[index - 1].setAttribute("data-winning-move", "true");
        }
    }

    message.textContent = updateMessage();

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", () => {
            if (fields[i].textContent != "" || gameController.analyzeGame().isGameOver) return;

            gameController.currentRound().play();
            gameBoard.setBoard(i, gameController.currentRound().getCurrentPlayerSign());
            message.textContent = updateMessage();
            fields[i].textContent = gameBoard.getBoard(i);
            gameController.analyzeGame();
            console.log(gameBoard.board);       
        if (gameController.playWithAI && !gameController.analyzeGame().isGameOver) {
                const randomLegalIndex = aiController.getLegalIndex().random; 

                gameController.currentRound().play();
                gameBoard.setBoard(randomLegalIndex, gameController.currentRound().getCurrentPlayerSign());
                message.textContent = updateMessage();
                fields[randomLegalIndex].textContent = gameBoard.getBoard(randomLegalIndex);
                gameController.analyzeGame();
                
            }
        })
    }

    resetGame.addEventListener("click", () => {
        gameController.resetGame();
        resetDisplay();
        resetStyleWinningMove();
    });

    return { styleWinningMove }
})();