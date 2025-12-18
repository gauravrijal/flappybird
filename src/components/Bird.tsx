import React from 'react';

interface BirdProps {
    position: number;
    rotation: number;
}

const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: position,
                left: '50%', // Centered horizontally
                width: 30,
                height: 30,
                backgroundColor: '#f4d03f',
                borderRadius: '50%',
                transform: `translateX(-50%) rotate(${rotation}deg)`, // Center align + rotation
                transition: 'transform 0.1s',
                boxShadow: 'inset -5px -5px 0 rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.2)',
                zIndex: 50
            }}
        >
            <div style={{
                position: 'absolute',
                top: 5,
                right: 5,
                width: 8,
                height: 8,
                backgroundColor: 'white',
                borderRadius: '50%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 3,
                    right: 1,
                    width: 3,
                    height: 3,
                    backgroundColor: 'black',
                    borderRadius: '50%'
                }}></div>
            </div>
            <div style={{
                position: 'absolute',
                top: 15,
                right: -8,
                width: 12,
                height: 8,
                backgroundColor: '#e67e22',
                borderRadius: '5px'
            }}></div>
            <div style={{
                position: 'absolute',
                top: 18,
                left: -5,
                width: 15,
                height: 10,
                backgroundColor: 'white',
                borderRadius: '50%',
                zIndex: -1
            }}></div>
        </div>
    );
};

export default Bird;
