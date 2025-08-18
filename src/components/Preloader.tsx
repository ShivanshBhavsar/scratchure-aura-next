import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.5, rotationY: -180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1.5, ease: "back.out(1.7)" }
    );

    // Progress bar animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
    }, "-=0.5");

    // Exit animation
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-dark"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      {/* Logo Animation */}
      <div className="text-center">
        <div 
          ref={logoRef}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-glow-cyan mb-4">
            SCRATCHURE
          </h1>
          <p className="text-lg md:text-xl text-cyber-cyan opacity-80">
            TECHNOLOGIES
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-full w-0"
          ></div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">Loading Experience...</p>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyber-cyan rounded-full opacity-30 float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;