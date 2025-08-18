import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EnergyBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const path = pathRef.current;

    if (!blob || !path) return;

    // Initial position
    gsap.set(blob, {
      x: window.innerWidth * 0.1,
      y: window.innerHeight * 0.2,
      scale: 0.8,
      opacity: 0.7
    });

    // Create floating animation
    gsap.to(blob, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Pulsing effect
    gsap.to(blob, {
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Scroll-triggered movement
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Create a complex path movement
        const x = windowWidth * (0.1 + Math.sin(progress * Math.PI * 3) * 0.3);
        const y = windowHeight * (0.2 + progress * 0.6 + Math.cos(progress * Math.PI * 2) * 0.1);
        
        gsap.to(blob, {
          x: x,
          y: y,
          duration: 0.3,
          ease: "power2.out"
        });

        // Change opacity based on scroll
        gsap.to(blob, {
          opacity: 0.4 + (Math.sin(progress * Math.PI * 2) * 0.3),
          duration: 0.3
        });
      }
    });

    // Create trail particles
    const createTrail = () => {
      if (!blob) return;
      
      const rect = blob.getBoundingClientRect();
      const particle = document.createElement('div');
      particle.className = 'energy-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, hsl(var(--cyber-cyan)), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
      `;
      
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    };

    // Create trail particles on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => {
        if (Math.random() > 0.8) {
          createTrail();
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Energy Blob */}
      <div
        ref={blobRef}
        className="fixed pointer-events-none z-10"
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, hsl(var(--cyber-cyan) / 0.6), hsl(var(--cyber-purple) / 0.4), transparent)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: '0 0 40px hsl(var(--cyber-cyan) / 0.5), 0 0 80px hsl(var(--cyber-purple) / 0.3)',
        }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--cyber-cyan) / 0.8), transparent)',
            animation: 'pulse 2s infinite'
          }}
        />
      </div>

      {/* Path indicator */}
      <div
        ref={pathRef}
        className="fixed pointer-events-none z-5 opacity-20"
        style={{
          width: '2px',
          height: '100vh',
          background: 'linear-gradient(to bottom, transparent, hsl(var(--cyber-cyan) / 0.3), transparent)',
          left: '10%',
          top: 0
        }}
      />
    </>
  );
};

export default EnergyBlob;