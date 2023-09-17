import React, { useState } from 'react';
import GamePage from './GamePage/GamePage'; // Relative path to the GamePage.js file
import ScoreboardPage from './ScoreboardPage/ScoreboardPage';

function App() {
  const [view, setView] = useState('game'); // 'game' or 'scoreboard'

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <header>
        <h1>Word Guessing Game</h1>
      </header>
      <nav>
        <button onClick={() => handleViewChange('game')}>Play</button>
        <button onClick={() => handleViewChange('scoreboard')}>Scoreboard</button>
      </nav>
      <main>
        {view === 'game' && <GamePage />}
        {view === 'scoreboard' && <ScoreboardPage />}
      </main>
    </div>
  );
}

export default App;