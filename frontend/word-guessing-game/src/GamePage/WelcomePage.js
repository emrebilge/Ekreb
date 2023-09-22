import React, { useState } from 'react';
import './WelcomePage.css'; // You can create a CSS file for styling the welcome screen

function WelcomeScreen({ onStartGame }) {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handlePlayClick = () => {
    setShowWelcomeScreen(false);
    onStartGame(); // Callback to start the game
  };

  return (
    <div className={`welcome-screen ${showWelcomeScreen ? 'show' : 'hide'}`}>
      <div className="welcome-content">
        <h1>Welcome to Ekreb</h1>
        <h2>Rules:</h2>
        <ul>
          <li>Rule 1: Explain the first rule here.</li>
          <li>Rule 2: Explain the second rule here.</li>
          {/* Add more rules as needed */}
        </ul>
        <button className="play-button" onClick={handlePlayClick}>
          Play
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
