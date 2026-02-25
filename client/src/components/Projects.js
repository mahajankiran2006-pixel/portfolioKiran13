import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'Secure E-Commerce Platform',
      description: 'Full-stack e-commerce with secure payment integration, JWT authentication, and encrypted data storage.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project1'
    },
    {
      title: 'Password Manager App',
      description: 'Secure password storage application with AES encryption, master password protection, and secure vault.',
      tech: ['React', 'Cryptography', 'Local Storage Encryption'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project2'
    },
    {
      title: 'Network Security Scanner',
      description: 'Basic network scanning tool to identify open ports and potential vulnerabilities in local networks.',
      tech: ['Python', 'Socket Programming', 'Network Analysis'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project3'
    },
    {
      title: 'Secure Chat Application',
      description: 'Real-time messaging app with end-to-end encryption, secure authentication, and message privacy.',
      tech: ['React', 'Socket.io', 'Encryption', 'Node.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project4'
    },
    {
      title: 'Vulnerability Assessment Tool',
      description: 'Web application security checker that scans for common vulnerabilities like XSS, SQL injection, and CSRF.',
      tech: ['JavaScript', 'Security Testing', 'OWASP'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project5'
    },
    {
      title: 'Secure File Sharing Platform',
      description: 'Cloud-based file sharing with encryption at rest and in transit, access controls, and audit logs.',
      tech: ['React', 'Firebase', 'Encryption', 'Access Control'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'project6'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
    <section id="projects" className="projects" ref={sectionRef}>
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="project-image">
              <div className="image-gradient"></div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
