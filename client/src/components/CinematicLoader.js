import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CinematicLoader.css';

const CinematicLoader = ({ onComplete }) => {
  const [stage, setStage] = useState('particles');
  const name = "KIRAN MAHAJAN";

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('name'), 1000);
    const timer2 = setTimeout(() => setStage('zoom'), 3500);
    const timer3 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="cinematic-loader"
      initial={{ opacity: 1 }}
      animate={stage === 'zoom' ? { opacity: 0, scale: 1.5 } : {}}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Floating Particles */}
      <div className="particle-field">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Energy Rings */}
      <div className="energy-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>

      {/* Name Animation */}
      {stage !== 'particles' && (
        <div className="name-container">
          {name.split('').map((char, index) => (
            <motion.span
              key={index}
              className="name-letter"
              initial={{ opacity: 0, y: 50, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.6, 0.01, 0.05, 0.95]
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      )}

      {/* Energy Trails */}
      {stage !== 'particles' && (
        <>
          <div className="energy-trail trail-1"></div>
          <div className="energy-trail trail-2"></div>
          <div className="energy-trail trail-3"></div>
          <div className="energy-trail trail-4"></div>
        </>
      )}
    </motion.div>
  );
};

export default CinematicLoader;
