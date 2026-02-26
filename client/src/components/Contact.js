import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '' // Honeypot field
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const lastSubmitTime = useRef(0);

  // Validation functions
  const validateName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return 'Name is required';
    if (trimmed.length < 2) return 'Name must be at least 2 characters';
    if (trimmed.length > 100) return 'Name is too long';
    return '';
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email';
    if (trimmed.length > 254) return 'Email is too long';
    return '';
  };

  const validateMessage = (message) => {
    const trimmed = message.trim();
    if (!trimmed) return 'Message is required';
    if (trimmed.length < 10) return 'Message must be at least 10 characters';
    if (trimmed.length > 1000) return 'Message must not exceed 1000 characters';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    const newErrors = {
      name: nameError,
      email: emailError,
      message: messageError
    };

    setErrors(newErrors);
    return !nameError && !emailError && !messageError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous status
    setStatus({ type: '', message: '' });

    // 🔒 Anti-spam: Check honeypot field
    if (formData.company) {
      console.warn('Bot detected - honeypot field filled');
      setStatus({
        type: 'error',
        message: 'Submission blocked. Please try again.'
      });
      return;
    }

    // 🔒 Anti-spam: Rate limiting (10 seconds cooldown)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime.current;
    if (timeSinceLastSubmit < 10000) {
      const waitTime = Math.ceil((10000 - timeSinceLastSubmit) / 1000);
      setStatus({
        type: 'error',
        message: `Please wait ${waitTime} seconds before submitting again.`
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors above.'
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim()
      };

      // ✅ 1️⃣ Save to Firebase Firestore
      console.log('Saving to Firebase...');
      const docRef = await addDoc(collection(db, "contacts"), {
        name: sanitizedData.name,
        email: sanitizedData.email,
        message: sanitizedData.message,
        createdAt: serverTimestamp(),
        source: 'portfolio',
        ipHint: navigator.userAgent.substring(0, 100) // Lightweight fingerprint
      });
      console.log('Firebase save successful! Doc ID:', docRef.id);

      // ✅ 2️⃣ Send email notification via EmailJS
      console.log('Sending email via EmailJS...');
      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            name: sanitizedData.name,
            email: sanitizedData.email,
            message: sanitizedData.message,
            timestamp: new Date().toLocaleString()
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
        console.log('EmailJS send successful!');
      } catch (emailError) {
        console.error('EmailJS error:', emailError);
        // Don't fail the whole submission if email fails
        console.warn('Email notification failed, but message was saved to Firebase');
      }

      // Update last submit time
      lastSubmitTime.current = now;

      // Show success message
      setStatus({
        type: 'success',
        message: 'Message sent successfully! 🚀 I\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        company: ''
      });
      setErrors({});

    } catch (error) {
      console.error("Submission Error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      
      let errorMessage = 'Something went wrong. Please try again later.';
      
      // Specific error messages
      if (error.code === 'permission-denied') {
        errorMessage = 'Unable to submit. Please contact me directly at mahajankiran2006@gmail.com';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
      } else if (error.message && error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3>Let's Work Together</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>mahajankiran2006@gmail.com</span>
            </div>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Surat, Gujarat</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Honeypot field - hidden from users, catches bots */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name ? 'error' : ''}
              disabled={loading}
              maxLength="100"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              disabled={loading}
              maxLength="254"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message * (10-1000 characters)"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.message ? 'error' : ''}
              disabled={loading}
              maxLength="1000"
            ></textarea>
            <div className="char-count">
              {formData.message.trim().length}/1000
            </div>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading || Object.values(errors).some(err => err)}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {status.message && (
            <motion.div 
              className={`status-message ${status.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
