import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './SkillsCinematic.css';

const SkillsCinematic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const sectionRef = useRef(null);

  const skills = [
    { name: 'HTML/CSS', level: 95, category: 'Frontend' },
    { name: 'JavaScript', level: 50, category: 'Frontend' },
    { name: 'React', level: 50, category: 'Frontend' },
    { name: 'Node.js', level: 60, category: 'Backend' },
    { name: 'Express', level: 70, category: 'Backend' },
    { name: 'MongoDB', level: 40, category: 'Database' },
    { name: 'Firebase', level: 85, category: 'Backend' },
    { name: 'Git', level: 90, category: 'Tools' },
    { name: 'Network Security', level: 60, category: 'Security' },
    { name: 'Web Security', level: 65, category: 'Security' },
    { name: 'Ethical Hacking', level: 55, category: 'Security' },
    { name: 'Cryptography Basics', level: 50, category: 'Security' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && animatedSkills.length === 0) {
          setIsVisible(true);
          // Trigger animations sequentially
          skills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.2 }
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
    <section id="skills" className="skills-cinematic" ref={sectionRef}>
      <h2 className="section-title">Skills & Technology</h2>
      <div className="skills-grid-cinematic">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card-cinematic"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="skill-header-cinematic">
              <h3>{skill.name}</h3>
              <span className="skill-category-cinematic">{skill.category}</span>
            </div>

            <div className="skill-track-container">
              {/* KM Watermark */}
              <div className="km-watermark">KM</div>

              {/* Progress Track */}
              <div className="skill-track">
                <motion.div
                  className="track-fill"
                  initial={{ width: 0 }}
                  animate={animatedSkills.includes(index) ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 2, ease: 'easeOut' }}
                >
                  {/* Energy particles */}
                  <div className="energy-particles">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="particle-trail"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Runner Animation */}
                {animatedSkills.includes(index) && (
                  <motion.div
                    className="runner-container"
                    initial={{ left: '0%' }}
                    animate={{ left: `${skill.level}%` }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  >
                    <div className="runner">
                      <svg viewBox="0 0 40 40" className="runner-svg">
                        {/* Simple runner silhouette - original design */}
                        <g className="runner-body">
                          {/* Head */}
                          <circle cx="20" cy="8" r="4" fill="currentColor" />
                          {/* Body */}
                          <line x1="20" y1="12" x2="20" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          {/* Arms - running pose */}
                          <line x1="20" y1="16" x2="14" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="20" y1="16" x2="26" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          {/* Legs - running pose */}
                          <line x1="20" y1="24" x2="14" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="20" y1="24" x2="26" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </g>
                      </svg>
                      <div className="runner-glow"></div>
                      <div className="ground-light"></div>
                    </div>
                  </motion.div>
                )}

                {/* Percentage Display */}
                <div className="skill-percentage-cinematic">{skill.level}%</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsCinematic;
