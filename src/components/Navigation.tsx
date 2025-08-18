import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nav entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newIsScrolled = scrollY > 50;
      
      if (newIsScrolled !== isScrolled) {
        setIsScrolled(newIsScrolled);
        
        const tl = gsap.timeline();
        
        if (newIsScrolled) {
          // Collapse animation - move elements to center
          tl.to(containerRef.current, {
            maxWidth: "500px",
            margin: "0.5rem auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderRadius: "2rem",
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            duration: 0.8,
            ease: "power2.out"
          })
          .to(logoRef.current, {
            transform: "translateX(20px)",
            duration: 0.6,
            ease: "power2.out"
          }, "<")
          .to(navItemsRef.current, {
            transform: "translateX(-20px)",
            duration: 0.6,
            ease: "power2.out"
          }, "<");
        } else {
          // Expand animation - move elements back to original positions
          tl.to(containerRef.current, {
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem", 
            paddingTop: "1rem",
            paddingBottom: "1rem",
            borderRadius: "0px",
            backdropFilter: "blur(10px)",
            backgroundColor: "transparent",
            border: "none",
            duration: 0.8,
            ease: "power2.out"
          })
          .to(logoRef.current, {
            transform: "translateX(0px)",
            duration: 0.6,
            ease: "power2.out"
          }, "<")
          .to(navItemsRef.current, {
            transform: "translateX(0px)",
            duration: 0.6,
            ease: "power2.out"
          }, "<");
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-glass-white/10"
      >
        <div ref={containerRef} className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="text-xl font-bold text-glow-cyan">
              SCRATCHURE
            </div>

            {/* Desktop Navigation */}
            <div ref={navItemsRef} className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-cyber-cyan transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground hover:text-cyber-cyan transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full md:w-96 bg-space-dark/95 backdrop-blur-lg z-30 transform translate-x-full opacity-0"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="text-2xl text-foreground hover:text-cyber-cyan transition-all duration-300 text-glow-cyan"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;