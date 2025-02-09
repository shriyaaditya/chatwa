'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FireflyEffect = () => {
  const [fireflies, setFireflies] = useState([])

  useEffect(() => {
    const generateFireflies = () => {
      const newFireflies = Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        glow: Math.random() * 0.5 + 0.5,
      }))
      setFireflies(newFireflies)
    }

    generateFireflies()
    const interval = setInterval(generateFireflies, 60000) 
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fireflies.map((firefly, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-yellow-300 dark:bg-yellow-400"
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: firefly.size,
            height: firefly.size,
          }}
          animate={{
            x: [0, Math.random() * 1000 - 500],
            y: [0, Math.random() * 1000 - 500],
            opacity: [0, firefly.glow, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-300 dark:bg-yellow-500 blur-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FireflyEffect

