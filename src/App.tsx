import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';
import ScoreBoard from './components/ScoreBoard';
import { useGameLoop } from './hooks/useGameLoop';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', padding: 20 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const Game: React.FC = () => {
  const {
    birdPosition,
    birdRotation,
    obstacles,
    score,
    highScore,
    isGameOver,
    gameStarted,
    startGame,
    resetGame
  } = useGameLoop();

  return (
    <div className="game-container" onClick={startGame}>
      <div className="sky">
        {!gameStarted && !isGameOver && (
          <div className="start-screen">
            <h1>Flappy Bird</h1>
            <p>Click or Press Space to Start</p>
          </div>
        )}

        {isGameOver && (
          <div className="game-over-screen">
            <h1>Game Over</h1>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={resetGame}>Restart</button>
          </div>
        )}

        <ScoreBoard score={score} highScore={highScore} />

        <Bird position={birdPosition} rotation={birdRotation} />

        {obstacles.map((obs) => (
          <Obstacle key={obs.id} x={obs.x} topHeight={obs.topHeight} gap={obs.gap} />
        ))}
      </div>
      <div className="ground"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  );
};

export default App;
