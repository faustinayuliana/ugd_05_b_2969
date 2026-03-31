'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Game1 = () => {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [activeHole, setActiveHole] = useState<number | null>(null);

  useEffect(() => {
    const savedHighscore = localStorage.getItem('highscore');
    if (savedHighscore) setHighscore(parseInt(savedHighscore));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        setActiveHole(Math.floor(Math.random() * 9));
      }, 800);
    } else if (timer === 0) {
      setIsActive(false);
      setActiveHole(null);
      if (score > highscore) {
        setHighscore(score);
        localStorage.setItem('highscore', score.toString());
        toast.success(`New Highscore: ${score}!`);
      } else {
        toast.info(`Game Over! Score: ${score}`);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer, score, highscore]);

  const startGame = () => {
    setScore(0);
    setTimer(30);
    setIsActive(true);
  };

  const handleWhack = (index: number) => {
    if (isActive && index === activeHole) {
      setScore((prev) => prev + 1);
      setActiveHole(null);
    }
  };

  return (
    <div className="game-container">
      <div className="game-panel">
        <h1 className="game-title text-black">Tap the Mouse 🐭</h1>
        <div className="highscore text-black">Highscore: {highscore}</div>
        <div className="game-stats">
          <div className="score">Score: {score}</div>
          <div className="timer">Time: {timer}s</div>
        </div>
        {!isActive && (
          <button onClick={startGame} className="start-btn">
            {timer === 30 ? 'Start Game' : 'Play Again'}
          </button>
        )}
      </div>

      <div className="game-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="hole" onClick={() => handleWhack(i)}>
            {activeHole === i && <span className="mole">🐭</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game1;