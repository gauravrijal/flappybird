import { useState, useEffect, useRef } from 'react';
import {
    GRAVITY,
    JUMP_STRENGTH,
    OBSTACLE_SPEED,
    SPAWN_RATE,
    checkCollision,
    OBSTACLE_GAP,
    OBSTACLE_WIDTH,
    BIRD_SIZE
} from '../utils/physics';
import type { ObstacleState } from '../utils/physics';

export const useGameLoop = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [birdPosition, setBirdPosition] = useState(window.innerHeight / 2); // Y position
    const [birdRotation, setBirdRotation] = useState(0);
    const [obstacles, setObstacles] = useState<ObstacleState[]>([]);

    // Physics state refs (source of truth)
    const birdY = useRef(window.innerHeight / 2);
    const birdV = useRef(0);
    const birdR = useRef(0);
    const obstacleList = useRef<ObstacleState[]>([]);
    const scoreRef = useRef(0);
    const requestRef = useRef<number | null>(null);
    const lastTime = useRef<number>(0);
    const frameCount = useRef(0);

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem('flappyHighScore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const startGame = () => {
        if (isGameOver) {
            resetGame();
            return;
        }
        if (!gameStarted) {
            setGameStarted(true);
            birdV.current = JUMP_STRENGTH;
        } else {
            birdV.current = JUMP_STRENGTH;
        }
    };

    const resetGame = () => {
        setGameStarted(false);
        setIsGameOver(false);
        setScore(0);
        setBirdPosition(250);
        setBirdRotation(0);
        setObstacles([]);

        birdY.current = 250;
        birdV.current = 0;
        birdR.current = 0;
        obstacleList.current = [];
        scoreRef.current = 0;
        frameCount.current = 0;
    };

    // Game Loop Effect
    useEffect(() => {
        if (!gameStarted || isGameOver) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        const loop = (time: number) => {
            if (!lastTime.current) lastTime.current = time;
            lastTime.current = time;

            frameCount.current++;

            // 1. Update Physics
            birdV.current += GRAVITY;
            birdY.current += birdV.current;
            birdR.current = Math.min(Math.max(birdV.current * 3, -25), 90);

            // 2. Spawn Obstacles
            if (frameCount.current % SPAWN_RATE === 0) {
                const minHeight = 50;
                const maxHeight = window.innerHeight * 0.85 - OBSTACLE_GAP - minHeight;
                const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

                obstacleList.current.push({
                    id: Date.now(),
                    x: window.innerWidth + 100, // Spawn off-screen dynamic
                    topHeight,
                    gap: OBSTACLE_GAP,
                    scored: false
                });
            }

            // 3. Move Obstacles & Cleanup
            obstacleList.current.forEach(obs => {
                obs.x -= OBSTACLE_SPEED;
            });

            if (obstacleList.current.length > 0 && obstacleList.current[0].x < -OBSTACLE_WIDTH) {
                obstacleList.current.shift();
            }

            // 4. Collision Detection
            const collisionParams = {
                y: birdY.current,
                velocity: birdV.current,
                rotation: birdR.current
            };

            const hit = checkCollision(collisionParams, obstacleList.current, window.innerHeight);

            if (hit) {
                setIsGameOver(true);
                const currentScore = scoreRef.current;
                setHighScore(prev => {
                    const newHigh = Math.max(prev, currentScore);
                    localStorage.setItem('flappyHighScore', newHigh.toString());
                    return newHigh;
                });
                return; // Stop loop
            }

            // 5. Update Score
            obstacleList.current.forEach(obs => {
                const birdX = window.innerWidth / 2;
                if (!obs.scored && obs.x + OBSTACLE_WIDTH < birdX - BIRD_SIZE) {
                    obs.scored = true;
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                }
            });

            // 6. Sync to State (Render)
            setBirdPosition(birdY.current);
            setBirdRotation(birdR.current);
            setObstacles([...obstacleList.current]);

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameStarted, isGameOver]);

    // Handle Spacebar
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                startGame();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, isGameOver]);

    return {
        birdPosition,
        birdRotation,
        obstacles,
        score,
        highScore,
        isGameOver,
        gameStarted,
        startGame,
        resetGame
    };
};
