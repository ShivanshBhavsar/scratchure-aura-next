import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // FAQ items animation
      gsap.fromTo(".faq-item", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-container",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqData = [
    {
      question: "What services do Scratchure Technologies offer?",
      answer: "We offer comprehensive web development, e-commerce solutions, Point of Sale software, and custom software development. Our expertise includes React, Node.js, TypeScript, and modern web technologies."
    },
    {
      question: "How long does it take to develop a website?",
      answer: "Project timelines vary based on complexity. A basic website typically takes 2-4 weeks, while complex e-commerce platforms or custom software can take 6-12 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive support and maintenance packages. This includes security updates, performance optimization, content updates, and technical support to ensure your digital presence runs smoothly."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in modern web technologies including React, TypeScript, Node.js, MongoDB, Express, Tailwind CSS, and various e-commerce platforms. We stay updated with the latest industry trends and technologies."
    },
    {
      question: "Can you help with SEO and digital marketing?",
      answer: "Absolutely! We build SEO-optimized websites from the ground up and can provide guidance on digital marketing strategies. Our websites are designed with performance and search engine visibility in mind."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on the scope, complexity, and timeline. We provide transparent quotes with no hidden costs. Contact us for a free consultation and detailed proposal tailored to your needs."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-20 lg:py-32 bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and development process
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-container max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="faq-item glass rounded-xl border-border/50 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-6 text-left hover:no-underline hover:bg-primary/5 transition-all duration-300 group">
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:scratchuretechnologies@gmail.com"
              className="glass px-8 py-3 rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-105 font-medium"
            >
              Send us an Email
            </a>
            <a 
              href="tel:+917000849679"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 font-medium"
            >
              Call us Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;