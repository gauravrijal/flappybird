export const GRAVITY = 0.6;
export const JUMP_STRENGTH = -8; // Negative because Y goes down
export const OBSTACLE_SPEED = 3;
export const OBSTACLE_WIDTH = 60;
export const OBSTACLE_GAP = 150;
export const BIRD_SIZE = 30; // Approximation for collision
export const GAME_WIDTH = 480; // Should match max-width in CSS if fixed, but we might want responsive
export const SPAWN_RATE = 120; // Frames between spawns

export interface BirdState {
    y: number;
    velocity: number;
    rotation: number;
}

export interface ObstacleState {
    id: number;
    x: number;
    topHeight: number;
    gap: number;
    scored: boolean;
}

export const checkCollision = (bird: BirdState, obstacles: ObstacleState[], gameHeight: number): boolean => {
    // Ground collision
    if (bird.y + BIRD_SIZE >= gameHeight * 0.85) { // 85% is sky height
        return true;
    }
    // Ceiling collision (optional)
    if (bird.y < 0) {
        return true;
    }

    const birdX = window.innerWidth / 2 - BIRD_SIZE / 2; // Dynamic X center
    const birdLeft = birdX;
    const birdRight = birdX + BIRD_SIZE;
    const birdTop = bird.y;
    const birdBottom = bird.y + BIRD_SIZE;

    for (const obs of obstacles) {
        const obsLeft = obs.x;
        const obsRight = obs.x + OBSTACLE_WIDTH;
        const topPipeBottom = obs.topHeight;
        const bottomPipeTop = obs.topHeight + obs.gap;

        // Check horizontal overlap
        if (birdRight > obsLeft && birdLeft < obsRight) {
            // Check vertical intersection
            if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                return true;
            }
        }
    }

    return false;
};
