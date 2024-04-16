// import React, { useState } from 'react';
// import './arrange.css';
// import moveSoundFile from './move-sound.mp3';

// const NumberPuzzle = () => {
//   const [numbers, setNumbers] = useState(generateNumbers());
//   const [gameWon, setGameWon] = useState(false);
//   const [moveCount, setMoveCount] = useState(0); // State for move count
//   const moveSound = new Audio(moveSoundFile);

//   function generateNumbers() {
//     let nums = [];
//     for (let i = 1; i <= 15; i++) {
//       nums.push(i);
//     }
//     nums = shuffleArray(nums);
//     nums.push(null); // null represents the empty space
//     return nums;
//   }

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   function swapCells(index1, index2) {
//     const newNumbers = [...numbers];
//     [newNumbers[index1], newNumbers[index2]] = [newNumbers[index2], newNumbers[index1]];
//     setNumbers(newNumbers);
//     moveSound.play();
//     setMoveCount(moveCount + 1); // Increment move count
//     if (isGameWon(newNumbers)) {
//       setGameWon(true);
//     }
//   }

//   function isGameWon(nums) {
//     for (let i = 0; i < nums.length - 1; i++) {
//       if (nums[i] !== i + 1) {
//         return false;
//       }
//     }
//     return true;
//   }

//   function handleReset() {
//     setNumbers(generateNumbers());
//     setGameWon(false);
//     setMoveCount(0); // Reset move count
//   }

//   const renderCell = (number, index) => {
//     return (
//       <div
//         key={index}
//         className={`cell ${number === null ? 'empty' : ''}`}
//         onClick={() => handleCellClick(index)}
//       >
//         {number}
//       </div>
//     );
//   };

//   const handleCellClick = (index) => {
//     if (!gameWon) {
//       const emptyIndex = numbers.indexOf(null);
//       if (isValidMove(index, emptyIndex)) {
//         swapCells(index, emptyIndex);
//       }
//     }
//   };

//   const isValidMove = (index, emptyIndex) => {
//     const row = Math.floor(index / 4);
//     const col = index % 4;
//     const emptyRow = Math.floor(emptyIndex / 4);
//     const emptyCol = emptyIndex % 4;

//     return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
//            (Math.abs(col - emptyCol) === 1 && row === emptyRow);
//   };

//   return (
//     <div>
//       <div className="puzzle-board">
//         {numbers.map((number, index) => renderCell(number, index))}
//       </div>
//       <div className="move-counter">Moves: {moveCount}</div> {/* Display move count */}
//       {gameWon && <div className="win-message">You win!</div>}
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   );
// };

// export default NumberPuzzle;

import React, { useState, useEffect } from 'react';
import './arrange.css';
import moveSoundFile from './move-sound.mp3';

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [clockInterval, setClockInterval] = useState(null);
  const moveSound = new Audio(moveSoundFile);

  useEffect(() => {
    if (gameWon) {
      clearInterval(clockInterval); // Stop the clock when game is won
      showWinPopup();
    }
  }, [gameWon, clockInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    setClockInterval(interval);

    return () => clearInterval(interval);
  }, []);

  function generateNumbers() {
    let nums = [];
    for (let i = 1; i <= 15; i++) {
      nums.push(i);
    }
    nums = shuffleArray(nums);
    nums.push(null);
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
    setMoveCount(moveCount + 1);
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
    setMoveCount(0);
    setTimeElapsed(0);
    clearInterval(clockInterval); // Reset clock interval
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);
    setClockInterval(interval);
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

  const showWinPopup = () => {
    alert(`Congratulations! You won in ${moveCount} moves and ${formatTime(timeElapsed)}.`);
  };
  useEffect(()=>{
    const sendData = async () => {
      try {
          const response = await fetch('http://localhost:8000/numberpuzzle', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                moves: moveCount,
                time: timeElapsed
              }),
          });
          const responseData = await response.json(); // Get response as text
          console.log('Response from server:', responseData.score); // Log response data
      } catch (error) {
          console.error('Error sending data:', error);
      }
  };

  sendData();
}, [moveCount, timeElapsed]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <div className="puzzle-board">
        {numbers.map((number, index) => renderCell(number, index))}
      </div>
      <div className="move-counter">Moves: {moveCount}</div>
      <div className="timer">Time: {formatTime(timeElapsed)}</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default NumberPuzzle;
