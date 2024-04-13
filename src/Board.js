import React, { useState } from 'react';

function Board({ xIsNext, setXIsNext, winner, setWinner }) {
    const [board, setBoard] = useState(Array(9).fill({ symbol: null, faded: false }));
    const [moveHistory, setMoveHistory] = useState([]);

    const handleClick = (i) => {
        if (winner) return;

        const currentSymbol = xIsNext ? 'X' : 'O';
        const boardCopy = [...board];
        const cell = boardCopy[i];

        // Allow placing or reactivating the symbol
        if (!cell.symbol || cell.faded) {

            // opposite symbol moves history
            const oppositeFilteredHistory = moveHistory.filter(move => move.symbol !== currentSymbol);
            if (oppositeFilteredHistory.length >= 3) {
                // Fad the oldest move if there are already 3 symbols of opposite kind
                const oldestMove = oppositeFilteredHistory[0];
                boardCopy[oldestMove.position] = { ...boardCopy[oldestMove.position], faded: true };
            }

            // remove same symbol faded one
            const filteredHistory = moveHistory.filter(move => move.symbol === currentSymbol);
            for (let j = 0; j < filteredHistory.length; j++) {
                if (boardCopy[filteredHistory[j].position].faded) {
                    boardCopy[filteredHistory[j].position] = { symbol: null, faded: false };
                }
            }

            // place a new symbol at this index
            boardCopy[i] = { symbol: currentSymbol, faded: false };
            setMoveHistory([...moveHistory.filter(move => move.position !== i), { symbol: currentSymbol, position: i }]);
            setBoard(boardCopy);
            setXIsNext(!xIsNext);

            if (calculateWinner(boardCopy.map(cell => cell.symbol))) {
                setWinner(currentSymbol);
            }
        }
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    return (
        <div className="board">
            {board.map((cell, index) => (
                <button key={index} className={`square ${cell.faded ? 'faded' : ''}`} onClick={() => handleClick(index)}>
                    {cell.symbol}
                </button>
            ))}
        </div>
    );
}

export default Board;
