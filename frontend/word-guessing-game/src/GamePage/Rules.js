import React from 'react';
import './Rules.css';

function Rules({ showRules, toggleRules }) {
  return (
    <div className="rules-container">
      <button class={`rules1 ${showRules ? 'hide' : 'show'}`} onClick={toggleRules}>
        {showRules ? 'Hide Rules' : 'Show Rules'}
      </button>
      {showRules && (
        <div className="rules-content">
          <h2 className="rules-title">Rules to Play 'ekreb'</h2>
          <ul className="rules-list">
            <li>Unscramble the given word to its original form.</li>
            <li>You have 6 rounds to guess the word.</li>
            <li>Each correct guess earns you points.</li>
            <li>Incorrect guesses won't affect your score.</li>
            <li>You can get hints, skip a word, or reset the game.</li>
            <li>Try to achieve the highest accuracy!</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Rules;