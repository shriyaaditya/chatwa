// src/Frog.js
import React, { useState, useEffect } from 'react';

const Frog = () => {
  const [isJumping, setIsJumping] = useState(false);

  // Automatically trigger jump at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false),900000000); // Reset jump after animation duration
    }, 1000); // Change this interval for different jump timings (e.g., every 2 seconds)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative ${isJumping ? 'animate-bounce' : ''} cursor-pointer`}
    >
      {/* Frog body */}
      <div
        className="w-20 h-10 bg-primary/30 rounded-t-lg relative
          dark:bg-primary/70 transition-all"
      >
        <div className="absolute top-0 left-0 w-full h-3 bg-primary/40 dark:bg-primary/80 rounded-t-lg" />
     

      {/* Frog eyes */}
    
      <div className="absolute top-2 left-4 w-4 h-4 bg-white rounded-full dark:bg-gray-300"></div>
      <div className="absolute top-2 left-4 w-2 h-2 bg-black rounded-full dark:bg-gray-800"></div>

      <div className="absolute top-2 left-12 w-4 h-4 bg-white rounded-full dark:bg-gray-300"></div>
      <div className="absolute top-2 left-12 w-2 h-2 bg-black rounded-full dark:bg-gray-800"></div>
      </div>
      
    </div>
  );
};

export default Frog;
