'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function GamePage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(5);
  const [time, setTime] = useState(30);
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);


  useEffect(() => {
    const isAuth = localStorage.getItem('isLoggedIn');

    if (!isAuth) {
      router.push('/auth/not-authorized'); 
    }
  }, [router]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && time > 0) {
      timer = setInterval(() => {
        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);
      }, 800);
    } else {
      setActiveHole(null);
    }
    return () => clearInterval(timer);
  }, [gameActive, time]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (gameActive && time > 0) {
      countdown = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && gameActive) {
      setGameActive(false);
      toast.info('Waktu habis!', { position: "top-center" });
    }
    return () => clearInterval(countdown);
  }, [gameActive, time]);

  const startGame = () => {
    setScore(0);
    setTime(30);
    setGameActive(true);
    toast.info('⏱️ Game Dimulai!', { position: "top-center" }); 
  };

  const hitMole = (index: number) => {
    if (gameActive && index === activeHole) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore > highscore) setHighscore(newScore);
        return newScore;
      });
      setActiveHole(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  };

  return (
    <div className="game-container py-10 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-6 px-10">
        <h1 className="text-3xl font-bold text-black text-center flex-grow">Selamat Datang!</h1>
        <button onClick={handleLogout} className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
          Logout
        </button>
      </div>
      
      <div className="game-panel-final">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-black text-center">
          🎮 Tap the Mouse
        </h2>
        
        <div className="flex justify-center gap-3 mb-4">
          <div className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md">
            🏆 Score: {score}
          </div>
          <div className="bg-[#FF9800] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md">
            ⏱️ Time: {time}
          </div>
        </div>

        <p className="text-gray-700 font-bold mb-4 text-center">⭐ High Score: {highscore}</p>

        {!gameActive && (
          <button onClick={startGame} className="btn-start-final w-full">
            🚀 Start Game
          </button>
        )}
      </div>

      <div className="game-grid mt-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} onClick={() => hitMole(i)} className="hole-final">
            {activeHole === i && (
              <span className="mole-final cursor-pointer select-none">🐹</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}