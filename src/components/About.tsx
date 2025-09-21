import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Code, 
  DeviceMobile, 
  CloudArrowUp, 
  Brain, 
  Shield 
} from 'phosphor-react';
import aboutImage from '../assets/about-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in
    gsap.fromTo(section, 
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      { x: -100, opacity: 0, rotationY: -15 },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Services grid animation
    gsap.fromTo(servicesRef.current?.children || [],
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const services = [
    {
      icon: <Globe size={24} weight="light" />,
      title: "Web Development",
      description: "Modern responsive websites"
    },
    {
      icon: <DeviceMobile size={24} weight="light" />,
      title: "Mobile Apps",
      description: "Cross-platform solutions"
    },
    {
      icon: <CloudArrowUp size={24} weight="light" />,
      title: "Cloud Solutions",
      description: "Scalable infrastructure"
    },
    {
      icon: <Brain size={24} weight="light" />,
      title: "AI Integration",
      description: "Intelligent automation"
    },
    {
      icon: <Code size={24} weight="light" />,
      title: "Custom Software",
      description: "Tailored solutions"
    },
    {
      icon: <Shield size={24} weight="light" />,
      title: "Cybersecurity",
      description: "Protected systems"
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-hero relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-cyber rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative glass rounded-full p-4 glow-cyan hover:glow-purple transition-all duration-500 transform hover:scale-105 hover:rotate-3">
                <img 
                  src={aboutImage} 
                  alt="Scratchure Technologies Team" 
                  className="w-full h-64 lg:h-80 object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-glow-cyan">
                About Scratchure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are a cutting-edge IT solutions company specializing in futuristic technology 
                implementations. Our team of expert developers and engineers craft premium digital 
                experiences that push the boundaries of innovation.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-glow-purple">Our Services</h3>
              <div ref={servicesRef} className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="glass p-4 rounded-lg hover:glow-cyan transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-cyber-cyan mb-2 group-hover:text-cyber-pink transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyber-cyan/10 rounded-full blur-xl float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyber-purple/10 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default About;