import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'phosphor-react';
import ThreeDScene from './ThreeDScene';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });

    // Title animation - blur to clear with stagger
    tl.fromTo(titleRef.current?.children || [],
      { 
        opacity: 0, 
        y: 50, 
        filter: "blur(10px)",
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // CTA button animation
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Scroll indicator
    tl.fromTo(scrollRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // Continuous pulse animation for CTA
    gsap.to(ctaRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background */}
      <ThreeDScene />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-space-dark/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-glow-cyan">SCRATCHURE</span>
          <span className="block text-glow-purple">TECHNOLOGIES</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-80"
        >
          Crafting cutting-edge digital solutions with futuristic innovation and premium technology expertise
        </p>

        <button 
          ref={ctaRef}
          onClick={scrollToAbout}
          className="glass glow-cyan px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:glow-purple group"
        >
          <span className="flex items-center gap-2">
            Explore More
            <ArrowDown 
              size={20} 
              className="group-hover:translate-y-1 transition-transform duration-300" 
            />
          </span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <div className="w-6 h-10 border-2 border-cyber-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-cyan rounded-full mt-2 animate-bounce"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">SCROLL</p>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-cyan rounded-full opacity-40 float pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;