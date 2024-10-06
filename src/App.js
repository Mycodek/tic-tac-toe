import React, { useState } from 'react';
import Board from './Board';
import Timer from './Timer';
import './App.css';


function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  return (
    <div className="game">
      <div className={`status ${winner ? 'winner-announcement' : ''}`}>
        {winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}
      </div>
      <Timer isActive={!winner} />
      <Board xIsNext={xIsNext} setXIsNext={setXIsNext} winner={winner} setWinner={setWinner} />
      <button className="reset" onClick={() => window.location.reload()}>Reset Game</button>
    </div>
  );
}

export default App;
