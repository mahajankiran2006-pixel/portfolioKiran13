import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroCinematic.css';
import profileImage from './portfoliio_image.jpeg';

const HeroCinematic = () => {
  const [text, setText] = useState('');
  const titles = ['Full Stack Developer', 'Cybersecurity Enthusiast', 'Creative Coder', 'Problem Solver'];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const currentTitle = titles[titleIndex];
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentTitle.length) {
        setText(currentTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [titleIndex]);

  return (
    <section id="home" className="hero-cinematic">
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="energy-grid"></div>
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="bg-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-content-cinematic">
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="profile-frame">
            <div className="frame-glow"></div>
            <div className="frame-corners">
              <div className="corner corner-tl"></div>
              <div className="corner corner-tr"></div>
              <div className="corner corner-bl"></div>
              <div className="corner corner-br"></div>
            </div>
            <img
              src={profileImage}
              alt="Kiran Mahajan"
              className="profile-img-cinematic"
            />
          </div>
        </motion.div>

        <motion.div
          className="text-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="hero-name">
            <span className="name-glow">KIRAN</span>
            <span className="name-glow">MAHAJAN</span>
          </h1>

          <div className="title-container">
            <span className="title-bracket">{'<'}</span>
            <h2 className="hero-title-animated">
              {text}
              <motion.span
                className="cursor-blink"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </h2>
            <span className="title-bracket">{'/>'}</span>
          </div>

          <p className="hero-description-cinematic">
            Crafting secure digital experiences with code, creativity, and cinematic flair.
            Passionate about web development and cybersecurity fundamentals.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-cinematic btn-primary-cinematic">
              <span className="btn-text">View Projects</span>
              <span className="btn-glow"></span>
            </a>
            <a href="#contact" className="btn-cinematic btn-secondary-cinematic">
              <span className="btn-text">Get In Touch</span>
              <span className="btn-glow"></span>
            </a>
          </div>

          <div className="social-links-hero">
            <a href="https://www.instagram.com/13_kiran_mahajan?igsh=enkxd2U3a2NyMTRm" className="social-icon" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/kiran-mahajan-102412325" className="social-icon" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:mahajankiran2006@gmail.com" className="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
};

export default HeroCinematic;
