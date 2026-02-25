import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import profileImage from './portfoliio_image.jpeg';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="image-wrapper">
            <div className="image-glow-ring"></div>
            <img
              src={profileImage}
              alt="Kiran Mahajan"
              className="about-profile-img"
            />
          </div>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3>Full Stack Developer & Cybersecurity Enthusiast</h3>
          <p>
            I'm Kiran Mahajan, a passionate developer with expertise in building modern, secure web applications.
            I love turning complex problems into simple, beautiful, and intuitive solutions while keeping security at the forefront.
          </p>
          <p>
            With a strong foundation in both frontend and backend technologies, combined with beginner-level cybersecurity knowledge,
            I create seamless user experiences backed by robust and secure server-side logic.
          </p>
          <div className="about-stats">
            <div className="stat">
              <h4>6 Months</h4>
              <p>Months Experience</p>
            </div>
            <div className="stat">
              <h4>5+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h4>3</h4>
              <p>Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
