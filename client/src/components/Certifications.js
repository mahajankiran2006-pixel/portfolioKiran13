import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const certifications = [
    {
      title: 'Bechelor of Computer Application',
      issuer: 'Vimal Tormal Poddar College',
      date: '2026',
      icon: '💻'
    },
    {
      title: 'Cybersecurity Fundamentals',
      issuer: 'Try Hack me',
      date: '2026',
      icon: '🔐'
    },
    {
      title: 'Ethical Hacking Basics',
      issuer: 'Self Study',
      date: '2026',
      icon: '🛡️'
    },
    {
      title: 'Networking Basics ',
      issuer: 'Seld Study',
      date: '2026',
      icon: '🌐'
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
    <section id="certifications" className="certifications" ref={sectionRef}>
      <h2 className="section-title">Certifications</h2>
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="cert-card"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={isVisible ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-shine"></div>
            <h3>{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <span className="cert-date">{cert.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
