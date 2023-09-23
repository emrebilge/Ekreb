// EndScreen.js
import React from 'react';
import './EndScreen.css'; // Import your CSS file for styling

function EndScreen({ score, accuracy, onPlayAgain }) {
  return (
    <div className="end-screen">
      <div className="end-screen-content">
        <h2 className="end-screen-title">Game Over</h2>
        <p className="end-screen-text">Your Score: {score}</p>
        <p className="end-screen-text">Accuracy: {accuracy}%</p>
        <button className="end-screen-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
