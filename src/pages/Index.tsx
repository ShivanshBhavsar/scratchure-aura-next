import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import EnergyBlob from '../components/EnergyBlob';
import FloatingActions from '../components/FloatingActions';
import FloatingRobot from '../components/FloatingRobot';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Disable scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Energy Blob */}
      <EnergyBlob />
      
      {/* Floating Robot */}
      <FloatingRobot />
      
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navigation />
        
        {/* Main Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <FAQ />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating Action Buttons */}
        <FloatingActions />
      </div>
    </>
  );
};

export default Index;
