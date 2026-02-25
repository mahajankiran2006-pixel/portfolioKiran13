import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './HeroNameTransform.css';

const HeroNameTransform = ({ onComplete }) => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setAnimationComplete(true);
      onComplete && onComplete();
      return;
    }

    const letters = nameRef.current.querySelectorAll('.transform-letter');

    // Optimized GSAP Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out'
      },
      onComplete: () => {
        setTimeout(() => {
          setAnimationComplete(true);
          onComplete && onComplete();
        }, 200);
      }
    });

    // Stage 1: Letters slide in smoothly
    tl.fromTo(letters,
      {
        opacity: 0,
        scale: 0.5,
        rotationX: -45,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'back.out(1.3)'
      },
      0.2
    );

    // Stage 2: Brief pause
    tl.to({}, { duration: 0.3 });

    // Stage 3: Smooth expansion (reduced scale)
    tl.to(nameRef.current,
      {
        scale: 2.5,
        duration: 0.8,
        ease: 'power2.inOut'
      }
    );

    // Stage 4: Hold
    tl.to({}, { duration: 0.4 });

    // Stage 5: Smooth shrink to final size
    tl.to(nameRef.current,
      {
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );

    // Stage 6: Fade out particles
    tl.to('.transform-particle',
      {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.01
      },
      '-=0.4'
    );

    // Stage 7: Final fade of container
    tl.to(containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (animationComplete) {
    return null;
  }

  return (
    <div className="hero-name-transform" ref={containerRef}>
      <div className="transform-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="transform-particle"
            style={{
              left: `${50 + Math.random() * 20 - 10}%`,
              top: `${50 + Math.random() * 20 - 10}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="name-transform-container" ref={nameRef}>
        {'KIRAN MAHAJAN'.split('').map((char, index) => (
          <span
            key={index}
            className="transform-letter"
            data-letter={char}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroNameTransform;
