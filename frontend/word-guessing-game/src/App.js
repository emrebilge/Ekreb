import React, { useState } from 'react';
import GamePage from './GamePage/GamePage';
import ScoreboardPage from './ScoreboardPage/ScoreboardPage';
import './App.css';

function App() {
  const [view, setView] = useState('game');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <header className="App-header">
        
    </header>
      <main>
        {view === 'game' && <GamePage />}
        {view === 'scoreboard' && <ScoreboardPage />}
      </main>
    </div>
  );
}

export default App;
