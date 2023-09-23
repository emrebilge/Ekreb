import React, { useState } from 'react';
import './WelcomePage.css'; // Import the CSS file for styling the welcome screen

function WelcomeScreen({ onStartGame }) {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handlePlayClick = () => {
    setShowWelcomeScreen(false);
    onStartGame(); // Callback to start the game
  };

  return (
    <div className={`welcome-screen ${showWelcomeScreen ? 'show' : 'hide'}`}>
      
      <div className="welcome-content">
        <div className="Welcome-module_icon__iYwGT"></div>
        <h1 className="Welcome-module_title__uhLqe">Ekreb</h1>
        <h2 className="Welcome-module_subtitle__rL8EE">Try your best at guessing scrambled Words <span className="Welcome-module_noWrap__ThSVO"></span></h2>
        <div className="Welcome-module_buttonContainer__K4GEw">
        <div class="center">
        	<button type="submit" class="btn" onClick={handlePlayClick}>
			    Play
    		  </button>
        </div>
        
        </div>
        <div className="Welcome-module_dateContainer__GTeM2">
          <h3 className="Welcome-module_date__Fmbmx">September 22, 2023</h3>
          <p className="Welcome-module_wordleMeta__P_0lJ">Developed by Emre Bilge</p>
        </div>
        
      </div>
    </div>
  );
}

export default WelcomeScreen;
