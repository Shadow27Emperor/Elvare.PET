import React, { useState, useEffect, useCallback } from 'react';

/**
 * Oozie: A self-moving, liquid-mercury void pet.
 * Uses Brownian-style movement to wander autonomously.
 */
const Oozie = ({ size = 200, color = "white" }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);

  const movePet = useCallback(() => {
    // Generate random coordinates within a 0-100% range
    // We keep it between 10-90% to avoid hitting the absolute edges
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 80 + 10;
    
    // Random scale pulse during movement to simulate "pushing" through liquid
    const newScale = 0.9 + Math.random() * 0.2;

    setPosition({ x: newX, y: newY });
    setScale(newScale);
  }, []);

  useEffect(() => {
    // Set an interval for wandering
    // Use a random duration between 3s and 6s for natural rhythm
    const moveInterval = setInterval(() => {
      movePet();
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(moveInterval);
  }, [movePet]);

  return (
    <div 
      className="absolute transition-all duration-[3000ms] ease-in-out pointer-events-none"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <defs>
          <filter id="oozie-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" />
          </filter>
        </defs>
        <g filter="url(#oozie-goo)">
          {/* Main Body Blobs */}
          <circle cx="100" cy="100" r="45" fill={color} className="animate-pulse" />
          <circle cx="125" cy="85" r="32" fill={color} style={{ opacity: 0.8 }} />
          <circle cx="75" cy="115" r="36" fill={color} style={{ opacity: 0.8 }} />
        </g>
        
        {/* Subtle Face */}
        <g className="opacity-70">
          <circle cx="88" cy="95" r="2.5" fill="#001333" />
          <circle cx="112" cy="95" r="2.5" fill="#001333" />
          <path d="M 95 110 Q 100 115 105 110" stroke="#001333" strokeWidth="1" fill="none" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default Oozie;

