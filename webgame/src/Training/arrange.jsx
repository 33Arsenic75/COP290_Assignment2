import React, { useState } from 'react';
import './arrange.css';
import moveSoundFile from './move-sound.mp3';

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [gameWon, setGameWon] = useState(false);
  const moveSound = new Audio(moveSoundFile);

  function generateNumbers() {
    let nums = [];
    for (let i = 1; i <= 15; i++) {
      nums.push(i);
    }
    nums = shuffleArray(nums);
    nums.push(null); // null represents the empty space
    return nums;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function swapCells(index1, index2) {
    const newNumbers = [...numbers];
    [newNumbers[index1], newNumbers[index2]] = [newNumbers[index2], newNumbers[index1]];
    setNumbers(newNumbers);
    moveSound.play();
    if (isGameWon(newNumbers)) {
      setGameWon(true);
    }
  }

  function isGameWon(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  function handleReset() {
    setNumbers(generateNumbers());
    setGameWon(false);
  }

  const renderCell = (number, index) => {
    return (
      <div
        key={index}
        className={`cell ${number === null ? 'empty' : ''}`}
        onClick={() => handleCellClick(index)}
      >
        {number}
      </div>
    );
  };

  const handleCellClick = (index) => {
    if (!gameWon) {
      const emptyIndex = numbers.indexOf(null);
      if (isValidMove(index, emptyIndex)) {
        swapCells(index, emptyIndex);
      }
    }
  };

  const isValidMove = (index, emptyIndex) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow);
  };

  return (
    <div>
      <div className="puzzle-board">
        {numbers.map((number, index) => renderCell(number, index))}
      </div>
      {gameWon && <div className="win-message">You win!</div>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default NumberPuzzle;
