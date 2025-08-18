import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InstagramLogo, LinkedinLogo, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer slide up animation
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-space-dark border-t border-glass-white/10 py-12 px-6 overflow-hidden"
    >
      <div 
        ref={contentRef}
        className="container mx-auto max-w-6xl"
      >
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-glow-cyan mb-3">
              SCRATCHURE
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting cutting-edge digital solutions with futuristic innovation 
              and premium technology expertise.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <div className="flex gap-4">
              <a 
                href="#" 
                className="glass p-3 rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-110 group"
              >
                <InstagramLogo 
                  size={20} 
                  className="text-cyber-cyan group-hover:text-cyber-pink transition-colors duration-300" 
                />
              </a>
              <a 
                href="#" 
                className="glass p-3 rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-110 group"
              >
                <LinkedinLogo 
                  size={20} 
                  className="text-cyber-cyan group-hover:text-cyber-pink transition-colors duration-300" 
                />
              </a>
              <a 
                href="#" 
                className="glass p-3 rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-110 group"
              >
                <GithubLogo 
                  size={20} 
                  className="text-cyber-cyan group-hover:text-cyber-pink transition-colors duration-300" 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-glass-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Scratchure Technologies. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with passion for innovation
          </p>
        </div>
      </div>

      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-cyan rounded-full opacity-20 float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          ></div>
        ))}
      </div>

      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-cyber-purple/5 rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;