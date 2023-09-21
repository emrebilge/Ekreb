import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamePage.css';
import Rules from './Rules';

function GamePage() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [showRules, setShowRules] = useState(false);


  // Define feedbackClass based on the content of the feedback message
  const feedbackClass = feedback.includes('Correct') ? 'green' : 'red';

  const handleSubmitGuess = async () => {
    try {
      const response = await axios.post('http://localhost:5551/validate', {
        guess: guess,
      });
  
      // Assuming the backend responds with the updated score
      setScore(response.data.score);
  
      if (response.data.message === 'Correct guess') {
        setFeedback('Correct! Well done.');
      } else {
        setFeedback('Incorrect. Try again.');
      }      
  
      // Calculate accuracy
      const correctCount = response.data.correctCount;
      const totalGuesses = response.data.totalGuesses;
      const calculatedAccuracy = (correctCount / totalGuesses) * 100;
      setAccuracy(calculatedAccuracy.toFixed(2)); // Limit to 2 decimal places
    } catch (error) {
      // Handle error here
      console.error('Error submitting guess:', error);
      setFeedback('Error submitting guess. Try again.');
    }
    setGuess('');
  };

  

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get('http://localhost:5551/get_word');
      const randomWord = response.data.scrambledWord;
      setWord(randomWord); // Set the retrieved word in the state
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };
  
  
  useEffect(() => {
    fetchRandomWord();
  }, []);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="game-container">
      <button onClick={toggleRules}>Show Rules</button>
      {showRules && <Rules />} {/* Render Rules component when showRules is true */}
      <header className="game-header">
        <h1>Ekreb</h1>
      </header>
      <div className="game-content">
        <div className="game-card">
          <h2 className="game-title">Guess the Word:</h2>
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
        <div className="score-card">
          <h2 className="score-title">Score:</h2>
          <p className="score">{score}</p>
        </div>
      </div>
      <p className="feedback-message" style={{ color: feedbackClass }}>
        {feedback}
      </p>
    </div>
  );  
}

export default GamePage;
