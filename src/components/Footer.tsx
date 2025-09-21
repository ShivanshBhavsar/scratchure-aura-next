import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InstagramLogo, LinkedinLogo, EnvelopeSimple, Phone, MapPin } from 'phosphor-react';
import scratchureLogo from '../assets/scratchure-logo.png';

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
      className="bg-background border-t border-border py-16 px-6"
    >
      <div 
        ref={contentRef}
        className="container mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={scratchureLogo} 
                alt="Scratchure Technologies" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Premium IT solutions company delivering cutting-edge digital experiences with innovation and excellence.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:scratchuretechnologies@gmail.com"
                className="block text-muted-foreground hover:text-modern-blue transition-colors duration-200"
              >
                scratchuretechnologies@gmail.com
              </a>
              <a 
                href="tel:+917000849679"
                className="block text-muted-foreground hover:text-modern-blue transition-colors duration-200"
              >
                +91 7000849679
              </a>
              <p className="text-muted-foreground">Ratlam MP</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/scratchure_technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-card p-3 hover-lift transition-all duration-200"
              >
                <InstagramLogo size={20} className="text-modern-blue" />
              </a>
              <a 
                href="https://www.linkedin.com/in/scratchure-technologies-588b2437a/"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-card p-3 hover-lift transition-all duration-200"
              >
                <LinkedinLogo size={20} className="text-modern-blue" />
              </a>
              <a 
                href="mailto:scratchuretechnologies@gmail.com"
                className="modern-card p-3 hover-lift transition-all duration-200"
              >
                <EnvelopeSimple size={20} className="text-modern-blue" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground">
            © 2025 Scratchure Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;