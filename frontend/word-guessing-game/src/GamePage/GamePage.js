import React, { useState } from 'react';
import './GamePage.css'; // Import the CSS file for this component

function GamePage() {
  const [word, setWord] = useState(''); // Current scrambled word
  const [guess, setGuess] = useState(''); // User's guess
  const [score, setScore] = useState(0); // User's score
  const [feedback, setFeedback] = useState(''); // Feedback message

  // Function to handle submitting a guess
  const handleSubmitGuess = () => {
    // Implement your logic to check if the guess is correct
    // Update score, word, and feedback accordingly
    // For demonstration purposes, we'll assume that "banana" is the correct word
    if (guess.toLowerCase() === 'banana') {
      setScore(score + 1);
      setFeedback('Correct! Well done.');
      fetchRandomWord(); // Fetch a new word
    } else {
      setFeedback('Incorrect. Try again.');
    }
    setGuess(''); // Clear the input field
  };

  // Function to fetch a random word (replace this with your actual API call)
  const fetchRandomWord = async () => {
    // Simulate API call
    const randomWord = 'scrambled';
    setWord(randomWord);
  };

  // Initial word fetch when the component loads
  useState(() => {
    fetchRandomWord();
  }, []);

  return (
    <div className="game-container">
      <h2 className="game-title">Guess the Word:</h2>
      <div className="game-content">
        <p className="scrambled-word">Scrambled Word: {word}</p>
        <input
          type="text"
          className="guess-input"
          placeholder="Your Guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmitGuess}>
          Submit Guess
        </button>
      </div>
      <h2 className="score">Score: {score}</h2>
      <p className="feedback">{feedback}</p>
    </div>
  );
}

export default GamePage;