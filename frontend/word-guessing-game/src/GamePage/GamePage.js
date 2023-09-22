import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamePage.css';
import Rules from './Rules';
import WelcomePage from './WelcomePage';


function GamePage() {
  const [word, setWord] = useState('');
  const [correctWord, setCorrectWord] = useState([]);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [accuracy, setAccuracy] = useState(0.00);
  const [showRules, setShowRules] = useState(false);
  const [hint, setHint] = useState('');
  const [round, setRound] = useState(1);

  const [gameStarted, setGameStarted] = useState(false);

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
      setRound(response.data.round); 

      if (response.data.message === 'Correct guess') {
        setFeedback('Correct! Well done.');  
        // Wait for 3 seconds, then fetch a new word
        setTimeout(() => {
        fetchRandomWord();
        setHint('');
         setFeedback(''); // Clear the feedback
        }, 2000);
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
      setFeedback(''); // Clear feedback
      setHint('');
      const response = await axios.get('http://localhost:5551/get_word');
      const randomWord = response.data.scrambledWord;
      const currentWord = response.data.currentWord;
      setCorrectWord(currentWord[0]);
      setWord(randomWord); // Set the retrieved word in the state
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };
  
  useEffect(() => {
    fetchRandomWord();
  }, []);

  const onStartGame = () => {
    setGameStarted(true);
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const handleSkip = async () => {
    try {
      const response = await axios.post('http://localhost:5551/skip_word');

      setWord(response.data.scrambledWord);
      setAccuracy(response.data.accuracy);
      setRound(response.data.round);
      setHint('');
    } catch (error) {
      console.error('Error skipping word:', error);
    }
  };

  const handleHint = async () => {
    if (correctWord.length > hint.length) {
      const nextLetter = correctWord.charAt(hint.length);
      setHint(hint + nextLetter);
    }
  };
  
  const handleReset = async () => {
    try {
      // Send a reset request to the backend
      await axios.post('http://localhost:5551/reset_game');
  
      // Reset frontend state
      setScore(0);
      setGuess('');
      setWord('');
      setFeedback('');
      setAccuracy(0.0);
      setHint('');
      setRound(1);
      
      // Fetch a new word
      await fetchRandomWord();
    } catch (error) {
      console.error('Error resetting game:', error);
      // Handle error if necessary
    }
  };
  
  return (
    <div> 
      <div className="app-header">
        <h1 className="game-name">Ekreb</h1>
      </div>
<div className="game-container">
      <Rules showRules={showRules} toggleRules={toggleRules} />
      <div className="game-content">
        <div className="game-card">
          <div className="word-container">
            <h2 className="game-title">Guess the Word:</h2>
            <p className="scrambled-word">Scrambled Word: {word}</p>
            <input
              type="text"
              className="guess-input"
              placeholder="Your Guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button className="button" onClick={handleSubmitGuess}>
              Submit Guess
            </button>
            <button className="button hint-button" onClick={handleHint} style={{ marginLeft: '10px' }}>
              Get Hint
            </button>
            {<p className="hint-message">Hint: {hint}</p>}
          </div>
<div className="card-container">
  <div className="accuracy-card">
    <h2 className="accuracy-title">Accuracy:</h2>
    <p className="accuracy">{accuracy}%</p>
  </div>
  <div className="score-card">
    <h2 className="score-title">Score:</h2>
    <p className="score">{score}</p>
  </div>
</div>
        </div>        
      </div>
      <p className="feedback-message" style={{ color: feedbackClass }}>
        {feedback}
      </p>
      <button className="button" onClick={handleSkip}>
       Skip Word
      </button>
      <button className="button reset-button" onClick={handleReset} style={{ marginLeft: '10px' }}>
      Reset Game
      </button>

    </div>
    </div>
  )};

export default GamePage;
