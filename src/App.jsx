import { useState } from 'react';
import confetti from '@hiseb/confetti';

export const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playTurn, setPlayTurn] = useState(false);
  const [winningSquares, setWinningSquares] = useState([]);
  const [draw, setDraw] = useState(false);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(index) {
    if (board[index] === null && winningSquares.length === 0) {
      const nextSymbol = !playTurn ? 'X' : 'O';
      const nextBoard = board.map((el, i) => (i === index ? nextSymbol : el));

      setBoard(nextBoard);
      setPlayTurn(!playTurn);
      checkForWinner(nextBoard);
    }
  }

  function checkForWinner(currentBoard) {
    for (let combination of winningCombinations) {
      if (
        currentBoard[combination[0]] &&
        currentBoard[combination[0]] === currentBoard[combination[1]] &&
        currentBoard[combination[0]] === currentBoard[combination[2]]
      ) {
        alertWinner(combination);
        return;
      }
    }
    if (!currentBoard.includes(null)) {
      setDraw(true);
    }
  }

  function alertWinner(combination) {
    const color = playTurn === true ? ['#230fff'] : ['#ff0f0f'];

    setTimeout(() => {
      confetti({
        position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
        count: 500,
        size: 1,
        velocity: 180,
        fade: false,
        color: color,
      });
    }, 300);

    setWinningSquares((prev) => [...prev, combination[0]]);

    setTimeout(() => {
      setWinningSquares((prev) => [...prev, combination[1]]);

      setTimeout(() => {
        setWinningSquares((prev) => [...prev, combination[2]]);
      }, 200);
    }, 200);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setWinningSquares([]);
    setPlayTurn(false);
    setDraw(false);
  }

  return (
    <>
      <h1 className="text-white text-5xl">
        <span className="text-blue-400">tic</span> tac{' '}
        <span className="text-red-400">toe</span>
      </h1>
      <h2
        className={`text-white text-2xl ${winningSquares.length !== 0 ? 'text-4xl font-medium' : ''}`}
      >
        {winningSquares.length === 0 && !draw ? (
          <>
            turn for{' '}
            <span
              className={playTurn === true ? 'text-blue-400' : 'text-red-400'}
            >
              {' '}
              {playTurn === true ? 'O' : 'X'}{' '}
            </span>{' '}
          </>
        ) : playTurn === true && !draw ? (
          <>
            <span className="text-red-400">X</span> Won
          </>
        ) : !draw ? (
          <>
            <span className="text-blue-400">O</span> Won
          </>
        ) : (
          <span className="font-medium">Draw!</span>
        )}
      </h2>
      <div className="mb-7 aspect-square grid grid-cols-3 grid-rows-3 gap-1 w-72 h-72 overflow-visible mt-5">
        {board.map((symbol, index) => {
          return (
            <div
              key={index}
              className={`square transition-colors duration-75 rounded-[5px] aspect-square bg-slate-900 flex justify-center items-center text-7xl font-medium ${symbol === 'X' ? 'text-red-400' : 'text-blue-400'} ${winningSquares.includes(index) && symbol === 'X' ? 'animate-square bg-red-950!' : ''} ${winningSquares.includes(index) && symbol === 'O' ? 'animate-square bg-blue-950!' : ''}`}
              onClick={() => handleClick(index)}
            >
              {symbol}
            </div>
          );
        })}
      </div>
      <button
        className="bg-violet-500 rounded-full w-24 h-8 text-2xl font-medium cursor-pointer transition-colors duration-100 hover:bg-violet-400 shadow-violet-400 shadow-xs"
        onClick={reset}
      >
        reset
      </button>
    </>
  );
};
