import "./App.scss";
import { useState } from "react";

// Combinations to win
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Parses through 'combinations' to find a match
function calculateWinner(squares) {
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [player, setPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (index) => {
    if (squares[index] !== null || winner) {
      return;
    }
    // updating the squares' array
    const nextSquares = squares.slice();
    nextSquares[index] = player;
    setSquares(nextSquares);
    // switching between player turns
    setPlayer(player === "X" ? "O" : "X");
  };
  // event handler for the reset button
  const handleReset = () => {
    setPlayer("X");
    setSquares(Array(9).fill(null));
  };
  // game result
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Current Player: ${player}`;
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className={winner ? "status" : ""}>{status}</div>

      <div className="grid">
        {/* displaying squares */}
        {squares.map((square, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
