import React, { useState, useEffect } from "react";
import "./WhackAMole.css";
import Navbar from "scenes/navbar";

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const timer = setTimeout(() => {
      setMoles(Array(9).fill(false));
      const randomIndex = Math.floor(Math.random() * 9);
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[randomIndex] = true;
        return newMoles;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [moles, gameOver]);

  const handleMoleClick = (index) => {
    if (moles[index]) {
      setScore((prevScore) => prevScore + 1);
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setMoles(Array(9).fill(false));
  };

  const endGame = () => {
    setGameOver(true);
  };

  return (
    <div className="whack-a-mole">
        {/* <Navbar /> */}
      <h2>Whack-a-Mole</h2>
      <div className="score">Score: {score}</div>
      <div className="grid">
        {moles.map((mole, index) => (
          <div
            key={index}
            className={`mole ${mole ? "active" : ""}`}
            onClick={() => handleMoleClick(index)}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={startGame}>Start Game</button>
        <button onClick={endGame}>End Game</button>
      </div>
    </div>
  );
};

export default WhackAMole;
