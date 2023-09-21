import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamePage.css';

function GamePage() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(0);

  // Define feedbackClass based on the content of the feedback message
  const feedbackClass = feedback.includes('Correct') ? 'correct-feedback' : 'incorrect-feedback';

  const handleSubmitGuess = async () => {
    try {
      const response = await axios.post('http://localhost:5551/validate', {
        guess: guess,
      });
      console.log(guess);
      
      setScore(response.data.score);
    
      // Calculate accuracy
      const correctCount = response.data.correctCount;
      const totalGuesses = response.data.totalGuesses;
      const calculatedAccuracy = (correctCount / totalGuesses) * 100;
      setAccuracy(calculatedAccuracy.toFixed(2)); // Limit to 2 decimal places
    } catch (error) {
      // Handle error here
      console.error('Error submitting guess:', error);
      setFeedback('Incorrect. Try again.');
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

  

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Word Guessing Game</h1>
      </header>
      <div className="game-content">
        <div className="game-card">
          <h2 className="game-title">Guess the Word:</h2>
          <p className={`scrambled-word ${feedbackClass}`}>Scrambled Word: {word}</p>
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
    {/* <div className="accuracy-card">
     <h2 className="accuracy-title">Accuracy:</h2>
     <p className="accuracy">{accuracy}%</p>
    </div> */}

        
      </div>
      <p className={`feedback-message ${feedbackClass}`}>{feedback}</p>
    </div>
  );
}

export default GamePage;
