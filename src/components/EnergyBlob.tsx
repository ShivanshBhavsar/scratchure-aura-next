import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EnergyBlob = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob1 = blob1Ref.current;
    const blob2 = blob2Ref.current;
    const blob3 = blob3Ref.current;
    const path = pathRef.current;

    if (!blob1 || !blob2 || !blob3 || !path) return;

    const blobs = [
      { element: blob1, size: 1, speed: 1, pathOffset: 0 },
      { element: blob2, size: 0.6, speed: 0.7, pathOffset: 0.3 },
      { element: blob3, size: 0.8, speed: 1.2, pathOffset: 0.6 }
    ];

    // Initial positions and animations for each blob
    blobs.forEach((blobData, index) => {
      const { element, size, speed, pathOffset } = blobData;
      
      // Initial position
      gsap.set(element, {
        x: window.innerWidth * (0.1 + pathOffset * 0.3),
        y: window.innerHeight * (0.2 + pathOffset * 0.4),
        scale: 0.8 * size,
        opacity: 0.7 - pathOffset * 0.2
      });

      // Create floating animation with different speeds
      gsap.to(element, {
        rotation: 360,
        duration: 20 / speed,
        repeat: -1,
        ease: "none"
      });

      // Pulsing effect with different timing
      gsap.to(element, {
        scale: (1.2 * size),
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5
      });
    });

    // Scroll-triggered movement for all blobs
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        blobs.forEach((blobData, index) => {
          const { element, size, pathOffset } = blobData;
          
          // Create different movement patterns for each blob
          const phaseShift = pathOffset * Math.PI * 2;
          const x = windowWidth * (0.1 + pathOffset * 0.2 + Math.sin(progress * Math.PI * 3 + phaseShift) * 0.4);
          const y = windowHeight * (0.2 + pathOffset * 0.3 + progress * 0.6 + Math.cos(progress * Math.PI * 2 + phaseShift) * 0.15);
          
          gsap.to(element, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power2.out"
          });

          // Change opacity based on scroll with different patterns
          gsap.to(element, {
            opacity: (0.4 - pathOffset * 0.1) + (Math.sin(progress * Math.PI * 2 + phaseShift) * 0.3),
            duration: 0.3
          });
        });
      }
    });

    // Create trail particles for each blob
    const createTrail = (blob: HTMLDivElement, color: string) => {
      if (!blob) return;
      
      const rect = blob.getBoundingClientRect();
      const particle = document.createElement('div');
      particle.className = 'energy-particle';
      particle.style.cssText = `
        position: fixed;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        background: radial-gradient(circle, ${color}, transparent);
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
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        duration: 1 + Math.random(),
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    };

    // Create trail particles on scroll for all blobs
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => {
        if (Math.random() > 0.85) {
          const colors = [
            'hsl(var(--cyber-cyan))',
            'hsl(var(--cyber-purple))',
            'hsl(var(--cyber-pink))'
          ];
          
          blobs.forEach((blobData, index) => {
            if (Math.random() > 0.7) {
              createTrail(blobData.element, colors[index]);
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Energy Blob 1 - Large Cyan */}
      <div
        ref={blob1Ref}
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
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--cyber-cyan) / 0.8), transparent)',
            animation: 'pulse 2s infinite'
          }}
        />
      </div>

      {/* Energy Blob 2 - Medium Purple */}
      <div
        ref={blob2Ref}
        className="fixed pointer-events-none z-10"
        style={{
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, hsl(var(--cyber-purple) / 0.7), hsl(var(--cyber-pink) / 0.5), transparent)',
          borderRadius: '50%',
          filter: 'blur(0.8px)',
          boxShadow: '0 0 30px hsl(var(--cyber-purple) / 0.6), 0 0 60px hsl(var(--cyber-pink) / 0.4)',
        }}
      >
        <div 
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--cyber-purple) / 0.9), transparent)',
            animation: 'pulse 2.5s infinite'
          }}
        />
      </div>

      {/* Energy Blob 3 - Small Pink */}
      <div
        ref={blob3Ref}
        className="fixed pointer-events-none z-10"
        style={{
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, hsl(var(--cyber-pink) / 0.6), hsl(var(--cyber-cyan) / 0.3), transparent)',
          borderRadius: '50%',
          filter: 'blur(1.2px)',
          boxShadow: '0 0 35px hsl(var(--cyber-pink) / 0.5), 0 0 70px hsl(var(--cyber-cyan) / 0.3)',
        }}
      >
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--cyber-pink) / 0.8), transparent)',
            animation: 'pulse 1.8s infinite'
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