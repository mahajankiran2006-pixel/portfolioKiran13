import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company Name',
      period: '2022 - Present',
      description: 'Developing secure web applications with focus on both functionality and security best practices. Implementing authentication, data encryption, and secure API endpoints.',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'HTTPS']
    },
    {
      title: 'Web Developer & Security Learner',
      company: 'Freelance Projects',
      period: '2020 - 2022',
      description: 'Built responsive websites while learning cybersecurity fundamentals. Implemented secure coding practices, input validation, and protection against common vulnerabilities.',
      technologies: ['JavaScript', 'Express', 'SQL Injection Prevention', 'XSS Protection']
    },
    {
      title: 'Frontend Developer',
      company: 'Personal Projects',
      period: '2018 - 2020',
      description: 'Created modern web interfaces with security-conscious design. Learned about OWASP Top 10, secure authentication flows, and data protection principles.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Security Headers']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section id="experience" className="experience" ref={sectionRef}>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-pulse"></div>
            </div>
            <div className="timeline-content">
              <div className="exp-header">
                <h3>{exp.title}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <h4 className="exp-company">{exp.company}</h4>
              <p className="exp-description">{exp.description}</p>
              <div className="exp-tech">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
