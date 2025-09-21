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
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      {/* Content */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
          >
            <span className="block text-gradient">SCRATCHURE</span>
            <span className="block text-primary">TECHNOLOGIES</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Creating exceptional digital experiences with cutting-edge technology and innovative design
          </p>

          <button 
            ref={ctaRef}
            onClick={scrollToAbout}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 hover-lift"
          >
            Get Started
            <ArrowDown size={20} />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={scrollToAbout}
      >
        <div className="w-6 h-10 border-2 border-modern-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-modern-blue rounded-full mt-2 animate-bounce"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-medium">SCROLL</p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-modern-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-blue rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default Hero;