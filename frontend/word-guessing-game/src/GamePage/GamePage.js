import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamePage.css';
import Rules from './Rules';

function GamePage() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(0.00);
  const [showRules, setShowRules] = useState(false);


  // Define feedbackClass based on the content of the feedback message
  const feedbackClass = feedback.includes('Correct') ? 'green' : 'red';

  const handleSubmitGuess = async () => {
    try {
      const response = await axios.post('http://localhost:5551/validate', {
        guess: guess,
      });
  
      // Assuming the backend responds with the updated score and accuracy
      setScore(response.data.score);
      setAccuracy(response.data.accuracy);  
      if (response.data.message === 'Correct guess') {
        setFeedback('Correct! Well done.');  
        // Wait for 3 seconds, then fetch a new word
        setTimeout(() => {
        fetchRandomWord();
         setFeedback(''); // Clear the feedback
        }, 2500);
    } else {
      setFeedback('Incorrect. Try again.');
    }
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
  <Rules showRules={showRules} toggleRules={toggleRules} />
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
        <div className="accuracy-card">
          <h2 className="accuracy-title">Accuracy:</h2>
          <p className="accuracy">{accuracy.toFixed(2)}%</p>
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
