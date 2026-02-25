import React, { useState, useEffect, lazy, Suspense } from 'react';
import CinematicNameReveal from './components/CinematicNameReveal';
import HeroNameTransform from './components/HeroNameTransform';
import './App.css';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const HeroCinematic = lazy(() => import('./components/HeroCinematic'));
const About = lazy(() => import('./components/About'));
const SkillsCinematic = lazy(() => import('./components/SkillsCinematic'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    background: '#0a0a0a'
  }}>
    <div style={{ 
      width: '50px', 
      height: '50px', 
      border: '3px solid rgba(255, 70, 85, 0.3)',
      borderTop: '3px solid #ff4655',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

function App() {
  const [stage, setStage] = useState('reveal'); // reveal -> transform -> content

  useEffect(() => {
    // Smooth scrolling with Lenis
    const initSmoothScroll = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        // Silently fallback to default scroll
      }
    };

    if (stage === 'content') {
      initSmoothScroll();
    }
  }, [stage]);

  if (stage === 'reveal') {
    return <CinematicNameReveal onComplete={() => setStage('transform')} />;
  }

  if (stage === 'transform') {
    return (
      <>
        <HeroNameTransform onComplete={() => setStage('content')} />
        <div style={{ opacity: 0 }}>
          <Suspense fallback={<LoadingFallback />}>
            <Navbar />
            <HeroCinematic />
          </Suspense>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
        <HeroCinematic />
        <About />
        <SkillsCinematic />
        <Experience />
        <Certifications />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  );
}

export default App;
