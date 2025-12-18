import React from 'react';
import { OBSTACLE_WIDTH } from '../utils/physics';

interface ObstacleProps {
    x: number;
    topHeight: number;
    gap: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x, topHeight, gap }) => {
    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: x,
                    width: OBSTACLE_WIDTH,
                    height: topHeight,
                    background: 'linear-gradient(90deg, #73bf2e 0%, #558e22 100%)',
                    borderBottom: '4px solid #558e22',
                    boxShadow: '2px 0 5px rgba(0,0,0,0.2)'
                }}
            >
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: -4,
                    width: OBSTACLE_WIDTH + 8,
                    height: 20,
                    background: 'linear-gradient(90deg, #73bf2e 0%, #558e22 100%)',
                    border: '2px solid #558e22'
                }}></div>
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: topHeight + gap,
                    left: x,
                    width: OBSTACLE_WIDTH,
                    height: '100%', // Extends to bottom
                    background: 'linear-gradient(90deg, #73bf2e 0%, #558e22 100%)',
                    borderTop: '4px solid #558e22',
                    boxShadow: '2px 0 5px rgba(0,0,0,0.2)'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: -4,
                    width: OBSTACLE_WIDTH + 8,
                    height: 20,
                    background: 'linear-gradient(90deg, #73bf2e 0%, #558e22 100%)',
                    border: '2px solid #558e22'
                }}></div>
            </div>
        </>
    );
};

export default Obstacle;
