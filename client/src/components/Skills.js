import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 95, category: 'Frontend' },
    { name: 'HTML/CSS', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express', level: 85, category: 'Backend' },
    { name: 'Firebase', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'Git', level: 90, category: 'Tools' }
  ];

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
    <section id="skills" className="skills" ref={sectionRef}>
      <h2 className="section-title">Skills & Technologies</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="skill-header">
              <h3>{skill.name}</h3>
              <span className="skill-category">{skill.category}</span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              >
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
