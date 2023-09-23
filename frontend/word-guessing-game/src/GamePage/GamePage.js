import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamePage.css';
import Rules from './Rules';
import WelcomePage from './WelcomePage';
import EndScreen from './EndScreen'; // Import the EndScreen component

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
  const [gameOver, setGameOver] = useState(false);
  const maxRounds = 6;

  const [gameStarted, setGameStarted] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [timer, setTimer] = useState(45); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerIntervalId, setTimerIntervalId] = useState(null);


  // Define feedbackClass based on the content of the feedback message
  const feedbackClass = feedback.includes('Correct') ? 'green' : 'red';

  // Function to submit a guess to the backend
  const handleSubmitGuess = async () => {
    if (isGamePaused) {
      return; // Don't allow button click during pause
    }
    try {
      const response = await axios.post('http://localhost:5551/validate', {
        guess: guess,
      });
      setRound(response.data.round); 

      setScore(response.data.score);
      setAccuracy(response.data.accuracy); 

      if (response.data.message === 'Correct guess') {
        setFeedback('Correct! Well done.');  

        setIsGamePaused(true);
        if(round > maxRounds){
          setGameOver(true);
        }
        setTimeout(() => {
        fetchRandomWord();
        setHint('');
         setFeedback(''); // Clear the feedback
        setIsGamePaused(false);

        if(round < maxRounds){
          setRound(round + 1);
        }else{
          setFeedback('Game Over! You guessed all words correctly.');
          setGameStarted(false);
          setShowWelcomeScreen(true);
          // go to a page
        
        }
        setTimer(45); // Reset the timer


        }, 1500); // provide a wait time of 1.5 seconds before fetching a new word
    } else {
      setFeedback('Incorrect. Try again.');
    }
    } catch (error) {
      console.error('Error submitting guess:', error);
      setFeedback('Error submitting guess. Try again.');
    }
    setGuess('');
  };

  const startTimer = () => {
    // Clear any existing timer interval
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
  
    // Start a new timer interval
    const newTimerIntervalId = setInterval(() => {
      if (timer === 0) {
        handleSkip();
        clearInterval(newTimerIntervalId);
      } else {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer)); // Update the timer based on the previous value, but don't go below 0
      }
    }, 1000);
  
    setTimerIntervalId(newTimerIntervalId); // Store the new interval ID
  };
  
  
  
  const handlePlayAgain = () => {
    // Reset game-related states and start a new game
    setRound(1);
    setGameOver(false);
    setAccuracy(0.00);
    setScore(0);
    handleReset();
  };
  
  // Function to fetch a random word from the backend
  const fetchRandomWord = async () => {
    try {
      setFeedback(''); // Clear feedback
      setHint('');
      const response = await axios.get('http://localhost:5551/get_word');
      const round = response.data.round;
      if(round > maxRounds){
        setGameOver(true);
      }
      const randomWord = response.data.scrambledWord;
      const currentWord = response.data.currentWord;
      setCorrectWord(currentWord[0]);
      setWord(randomWord); // Set the retrieved word in the state
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };
  
  // Fetch a random word when the user begins the game
  useEffect(() => {
    if (round > maxRounds) {
      setGameOver(true);
    }
    if (gameStarted) {
      fetchRandomWord();
      startTimer(); // Start the timer when the game begins
    }
  
    return () => {
      // Clear the timer interval when the component unmounts or when the dependencies change
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [round, gameStarted]);
  
  // useEffect to handle timer reaching zero
  useEffect(() => {
    if (timer === 0 && !gameOver && gameStarted) {
      handleSkip(); // Call handleSkip when the timer reaches zero
    }
  }, [timer, gameOver, gameStarted]);
  
  
  // function to toggle the rules
  const toggleRules = () => {
    setShowRules(!showRules);
  };

  // Function to handle the skip word button
  const handleSkip = async () => {
    try {
      const response = await axios.post('http://localhost:5551/skip_word');

      setWord(response.data.scrambledWord);
      setAccuracy(response.data.accuracy);
      setRound(response.data.round);
      setHint('');
      if (round >= maxRounds) { // Check if the game is over
        setGameOver(true);
      }
      setTimer(45);
    } catch (error) {
      console.error('Error skipping word:', error);
    }
  };

  // Function to handle the hint button
  const handleHint = async () => {
    if (correctWord.length > hint.length) {
      const nextLetter = correctWord.charAt(hint.length);
      setHint(hint + nextLetter);
    }
  };
  
  // Function to handle the reset game button
  const handleReset = async () => {
    try {
      // Send a reset request to the backend
      await axios.post('http://localhost:5551/reset_game');
  
      // Reset frontend state
      setGameStarted(true); // Set game as started
      setShowWelcomeScreen(false); // Hide the welcome screen
      setScore(0);
      setGuess('');
      setWord('');
      setFeedback('');
      setAccuracy(0.0);
      setHint('');
      setRound(1);
      setGameOver(false);
      setTimer(45); // Reset the timer to 45 seconds

      
      // Fetch a new word
      await fetchRandomWord();
    } catch (error) {
      console.error('Error resetting game:', error);
      // Handle error if necessary
    }
  };
  
  const handlePlayClick = () => {
    // Start the game by hiding the welcome screen
    setShowWelcomeScreen(false);
    setGameStarted(true);
    startTimer(); // Start the timer
    fetchRandomWord(); // Fetch initial word when starting the game
  };

  

  return (
  <div> 
    {!gameStarted && showWelcomeScreen && (
      <WelcomePage onStartGame={handlePlayClick} />
    )}

    {gameStarted && !showWelcomeScreen && !gameOver && (
      <div className="app-header">
        <img src="/logo1.jpg" alt="Ekreb Logo" className="logo" />
        <h1 className="game-name">Ekreb</h1>
      </div>
    )}

    {gameStarted && !showWelcomeScreen && !gameOver && (
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
              <button className="button" onClick={handleSubmitGuess} disabled={isGamePaused}> 
                Submit Guess
              </button>
              <button className="button hint-button" onClick={handleHint} disabled={isGamePaused} style={{ marginLeft: '10px' }}>
                Get Hint
              </button>
              {<p className="hint-message">Hint: {hint}</p>}
              <p className="round-number">Round: {round}</p> {/* Display the round number */}

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
      <div className="timer-container">
        <p className="timer">Time Left: {timer} seconds</p>
      </div>      
        </div>
        <p className="feedback-message" style={{ color: feedbackClass }}>
          {feedback}
        </p>
        <button className="button" onClick={handleSkip} disabled={isGamePaused}>
          Skip Word
        </button>
        <button className="button reset-button" onClick={handleReset} disabled={isGamePaused} style={{ marginLeft: '10px' }}>
          Reset Game
        </button>
      </div>
    )}
    {gameOver && (
        <EndScreen score={score} accuracy={accuracy} onPlayAgain={handlePlayAgain} />
        )}

  
  </div>
  
)};

export default GamePage;