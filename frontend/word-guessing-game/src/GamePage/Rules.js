// Rules.js
import React from 'react';
import './Rules.css'; // Import the CSS file for styling

function Rules() {
  return (
    <div className="rules-container">
      <h2 className="rules-title">Rules to Play 'ekreb'</h2>
      <ul className="rules-list">
        <li>Unscramble the given word to its original form.</li>
        <li>You have a limited time to guess each word.</li>
        <li>Each correct guess earns you points.</li>
        <li>Incorrect guesses won't affect your score.</li>
        <li>Try to achieve the highest accuracy!</li>
      </ul>
    </div>
  );
}

export default Rules;