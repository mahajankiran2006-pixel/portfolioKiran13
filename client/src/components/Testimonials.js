import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, Tech Startup',
      text: 'Kiran delivered exceptional work on our web application with strong attention to security. His knowledge of both development and cybersecurity best practices exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      text: 'Working with Kiran was a pleasure. He not only built a beautiful application but also ensured it was secure and protected against common vulnerabilities.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CTO, Digital Agency',
      text: 'Outstanding developer with great security awareness. Kiran implemented proper authentication, data encryption, and secure coding practices throughout the project.',
      rating: 5
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <h2 className="section-title">What People Say</h2>
      
      <div className="testimonial-container">
        <button className="nav-btn prev-btn" onClick={prevTestimonial}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div className="author-info">
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].role}</p>
              </div>
            </div>
            <div className="rating">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="nav-btn next-btn" onClick={nextTestimonial}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
