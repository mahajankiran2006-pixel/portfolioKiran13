import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CinematicNameReveal.css';

const CinematicNameReveal = ({ onComplete }) => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setTimeout(onComplete, 500);
      return;
    }

    const letters = nameRef.current.querySelectorAll('.reveal-letter');

    // Optimized GSAP Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out'
      },
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Stage 1: Letters appear sequentially (faster)
    tl.fromTo(letters,
      {
        opacity: 0,
        scale: 0.5,
        rotationY: -45,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.4)'
      },
      0.3
    );

    // Stage 2: Brief hold
    tl.to({}, { duration: 0.4 });

    // Stage 3: Scale up smoothly (reduced scale for better visibility)
    tl.to(nameRef.current,
      {
        scale: 2,
        duration: 0.8,
        ease: 'power2.inOut'
      }
    );

    // Stage 4: Hold at peak
    tl.to({}, { duration: 0.5 });

    // Stage 5: Fade out smoothly
    tl.to(letters,
      {
        opacity: 0,
        scale: 0.8,
        y: -30,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.in'
      }
    );

    // Stage 6: Container fade
    tl.to(containerRef.current,
      {
        opacity: 0,
        duration: 0.4
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="cinematic-name-reveal" ref={containerRef}>
      {/* Particle Background */}
      <div className="particle-field-reveal">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle-reveal"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Name Container */}
      <div className="name-reveal-container" ref={nameRef}>
        {'KIRAN MAHAJAN'.split('').map((char, index) => (
          <span
            key={index}
            className="reveal-letter"
            data-letter={char}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Energy Rings */}
      <div className="energy-rings-reveal">
        <div className="ring-reveal ring-1"></div>
        <div className="ring-reveal ring-2"></div>
        <div className="ring-reveal ring-3"></div>
      </div>
    </div>
  );
};

export default CinematicNameReveal;
