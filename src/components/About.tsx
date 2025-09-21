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
      className="py-24 px-6 bg-gradient-subtle"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative hover-lift">
              <img 
                src={aboutImage} 
                alt="Scratchure Technologies Team" 
                className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-accent rounded-lg opacity-20"></div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gradient">
                About Scratchure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are a cutting-edge IT solutions company specializing in modern technology 
                implementations. Our team of expert developers and engineers craft premium digital 
                experiences that drive innovation and business growth.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-primary">Our Services</h3>
              <div ref={servicesRef} className="grid grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="modern-card p-6 hover-lift group cursor-pointer"
                  >
                    <div className="text-modern-blue mb-3 group-hover:text-accent-blue transition-colors duration-200">
                      {service.icon}
                    </div>
                    <h4 className="font-semibold mb-2 text-sm lg:text-base text-primary">
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
    </section>
  );
};

export default About;