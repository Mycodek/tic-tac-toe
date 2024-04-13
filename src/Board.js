import React, { useState, useEffect } from 'react';

function Board({ xIsNext, setXIsNext, setWinner }) {
    const [board, setBoard] = useState(Array(9).fill({ symbol: null, faded: false }));
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        // Handle fading logic here
        fadeOldestMove();
    }, [xIsNext]); // This effect runs every time it's a new player's turn

    const fadeOldestMove = () => {
        const currentSymbol = xIsNext ? 'X' : 'O';
        const moves = moveHistory.filter(move => move.symbol === currentSymbol);
        if (moves.length >= 3) {
            // Fade the oldest symbol
            const boardCopy = [...board];
            const oldestMove = moves[0];
            boardCopy[oldestMove.position] = { ...boardCopy[oldestMove.position], faded: true };
            setBoard(boardCopy);
        }
    };

    const handleClick = (i) => {
        const currentSymbol = xIsNext ? 'X' : 'O';
        const boardCopy = [...board];
        const cell = boardCopy[i];

        // Allow placing or reactivating the symbol only if the cell is empty or faded
        if (!cell.symbol || cell.faded) {
            // Reactivate or place a new symbol
            boardCopy[i] = { symbol: currentSymbol, faded: false };
            const filteredHistory = moveHistory.filter(move => move.symbol === currentSymbol);
            if (filteredHistory.length >= 3) {
                // Remove the oldest move if there are already 3 active symbols
                const oldestMove = filteredHistory[0];
                boardCopy[oldestMove.position] = { ...boardCopy[oldestMove.position], faded: true };
            }
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
