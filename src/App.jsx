import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="h-32 w-full bg-gray-800 rounded-md text-6xl 
  font-light transition-colors duration-200 hover:bg-gray-700" onClick={onSquareClick}>{value}</button>
  );
}


export default function Board() {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [xisNext, setXisNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null))
  let status;

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    else if (xisNext) {
      nextSquares[i] = "X"
    }
    else {
      nextSquares[i] = "O"
    };
    setSquares(nextSquares);
    setXisNext(!xisNext);

    const winner = calcWinner(nextSquares);
    if (winner === "X") {
      setXWins(xWins + 1)
    }
    else if (winner === "O") {
      setOWins(oWins + 1)
    }


  }

  const winner = calcWinner(squares);

  const tie = calcTie(squares);
  if (winner) {
    status = "Winner is " + winner;
  }
  else if (tie) {
    status = "It's a tie!"
  }
  else {
    status = "Next player: " + (xisNext ? "X" : "O");
  }
  function restartGame() {
    setXisNext(true)
    setSquares(Array(9).fill(null))
  }
  return (
    <>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-full max-w-[400px] mx-5">
          <h1 className="text-5xl font-semibold text-white mb-8 text-center">Tic Tac Toe</h1>
          <div className="text-center mb-6 text-xl text-white">{status}</div>
          <div className="grid grid-col-3 gap-1 rounded-x1 overflow-hidden mb-6">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
          <button className="w-full py-3 text-lg text-white border
       rounder-xl hover:bg-gray-50 hover:text-gray-800 
       transition-colors duration-200"
            onClick={restartGame}>New Game?</button>
          <div className="text-center mb-0 text-xl text-white">
            X has won {xWins} games</div>
          <div className="text-center mb-2 text-xl text-white">
            O has won {oWins} games</div>
        </div>
      </div>
    </>
  );
}

function calcTie(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] == null) {
      return null

    }
  }
  return true
}
function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

