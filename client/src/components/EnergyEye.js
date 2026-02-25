import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './EnergyEye.css';

const EnergyEye = ({ onComplete }) => {
  const [stage, setStage] = useState('eye');
  const [displayText, setDisplayText] = useState('');
  const canvasRef = useRef(null);
  const fullText = "KIRAN MAHAJAN";

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setStage('waves'), 500);
        setTimeout(() => setStage('photo'), 1500);
        setTimeout(() => onComplete && onComplete(), 3500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [onComplete]);

  useEffect(() => {
    // Canvas particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;

    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (Math.PI * 2 * i) / particleCount,
        radius: 50 + Math.random() * 30,
        speed: 0.02 + Math.random() * 0.02,
        size: 2 + Math.random() * 2
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.angle += particle.speed;
        const x = canvas.width / 2 + Math.cos(particle.angle) * particle.radius;
        const y = canvas.height / 2 + Math.sin(particle.angle) * particle.radius * 0.6;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 2);
        gradient.addColorStop(0, 'rgba(255, 70, 85, 1)');
        gradient.addColorStop(1, 'rgba(255, 70, 85, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="energy-eye-container">
      {stage === 'eye' && (
        <motion.div
          className="eye-portal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="eye-shape">
            <div className="eye-outer"></div>
            <div className="eye-inner"></div>
            <div className="eye-pupil"></div>
          </div>

          <canvas
            ref={canvasRef}
            className="swirl-particles"
            style={{ position: 'absolute' }}
          />

          <motion.div
            className="eye-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {stage === 'waves' && (
        <motion.div
          className="energy-waves"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </motion.div>
      )}

      {stage === 'photo' && (
        <motion.div
          className="profile-reveal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="profile-aura"></div>
          {/* User will replace this image */}
          <img
            src="/profile-photo.jpg"
            alt="Kiran Mahajan"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Ccircle cx="100" cy="100" r="80" fill="%23ff4655" opacity="0.2"/%3E%3Ctext x="100" y="110" text-anchor="middle" fill="%23ff4655" font-size="60" font-weight="bold"%3EKM%3C/text%3E%3C/svg%3E';
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default EnergyEye;
