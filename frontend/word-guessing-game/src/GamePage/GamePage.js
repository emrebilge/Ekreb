import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
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
    if (guess.toLowerCase() === word) {
      setScore(score + 1);
      setFeedback('Correct! Well done.');
      fetchRandomWord(); // Fetch a new word
    } else {
      setFeedback('Incorrect. Try again.');
    }
    setGuess(''); // Clear the input field
  };

  // Function to fetch a random word from the backend
  const fetchRandomWord = async () => {
    try {
      const response = await axios.get('http://localhost:5551/get_word'); // Make a GET request to the backend
      
      const randomWord = response.data.scrambledWord;
      console.log(randomWord);

      setWord(randomWord);
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };

  

  // Initial word fetch when the component loads
  useEffect(() => {
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
