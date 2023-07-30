const Player = (sign) => {
    return { sign }
};

const gameBoard = (() => {
    const board = new Array(9);
    const setField = (index, sign) => {
        board[index] = sign;
        console.log(board);
    }
    const getField = (index) => {
        return board[index];
    }

    return { board, setField, getField };
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;

    const getCurrentPlayerSign = () => {
        const currentPlayerSign = (round % 2 == 1) ? playerX.sign : playerO.sign;
        round++;
        return currentPlayerSign;
    };

    return { getCurrentPlayerSign };
})();

const displayController = (() => {
    const fields = document.querySelectorAll(".field");

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", () => {
            if (fields[i].textContent != "") return;
            gameBoard.setField(i, gameController.getCurrentPlayerSign());
            fields[i].textContent = gameBoard.getField(i);
        })
    }
})();