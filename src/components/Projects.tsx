import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import project1 from '../assets/project-1.jpg';
import project2 from '../assets/project-2.jpg';
import project3 from '../assets/project-3.jpg';
import project4 from '../assets/project-4.jpg';
import project5 from '../assets/project-5.jpg';
import project6 from '../assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Shabella",
      description: "A skincare e-commerce website with modern design and seamless shopping experience.",
      image: project1,
      tech: ["React", "TypeScript", "Tailwind", "Node.js"],
      category: "E-commerce",
      link: "https://www.shabellaa.com/"
    },
    {
      id: 2,
      title: "POS Walla",
      description: "A Point of Sale software with inventory management and sales analytics features.",
      image: project2,
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "Software",
      link: "https://www.poswalla.com/"
    },
    {
      id: 3,
      title: "Play Photo Creation",
      description: "A photography portfolio website showcasing creative visual storytelling.",
      image: project3,
      tech: ["React", "Next.js", "Framer Motion", "Tailwind"],
      category: "Portfolio"
    },
    {
      id: 4,
      title: "Hiranyam Ayurveda",
      description: "Ayurvedic skincare e-commerce platform with traditional wellness products.",
      image: project4,
      tech: ["React", "TypeScript", "Stripe", "MongoDB"],
      category: "E-commerce",
      link: "https://hiranyamayurveda.com/"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Projects cards animation
    gsap.fromTo(containerRef.current?.children || [],
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-6 bg-space-dark relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-glow-cyan"
        >
          Featured Projects
        </h2>

        {/* Desktop: Horizontal Scroll Layout */}
        <div className="hidden lg:block">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-80 glass rounded-xl overflow-hidden hover:glow-cyan transition-all duration-500 group cursor-pointer transform hover:scale-105"
                onClick={() => project.link && window.open(project.link, '_blank')}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={24} className="text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyber-cyan font-semibold">
                      {project.category}
                    </span>
                    <GithubLogo size={16} className="text-muted-foreground hover:text-cyber-cyan transition-colors cursor-pointer" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-cyan transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded-full border border-cyber-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Grid Layout */}
        <div className="lg:hidden">
          <div 
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass rounded-xl overflow-hidden hover:glow-cyan transition-all duration-500 group cursor-pointer"
                onClick={() => project.link && window.open(project.link, '_blank')}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyber-cyan font-semibold">
                      {project.category}
                    </span>
                    <GithubLogo size={16} className="text-muted-foreground hover:text-cyber-cyan transition-colors cursor-pointer" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyber-cyan transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded-full border border-cyber-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-cyber-purple/5 rounded-full blur-3xl float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl float" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Projects;