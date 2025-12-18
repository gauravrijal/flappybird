import React from 'react';

interface ScoreBoardProps {
    score: number;
    highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 20,
            left: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 30,
            pointerEvents: 'none'
        }}>
            <div style={{
                fontSize: '4rem',
                color: 'white',
                textShadow: '3px 3px 0 #000',
                fontWeight: 'bold',
                fontFamily: "'Squada One', cursive, sans-serif" // Fallback if font checks fail
            }}>
                {score}
            </div>
            {highScore > 0 && (
                <div style={{
                    fontSize: '1.2rem',
                    color: '#f4d03f',
                    textShadow: '1px 1px 0 #000',
                    marginTop: '5px'
                }}>
                    Best: {highScore}
                </div>
            )}
        </div>
    );
};

export default ScoreBoard;
