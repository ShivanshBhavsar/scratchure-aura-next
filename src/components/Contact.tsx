import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, InstagramLogo, LinkedinLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

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

    // Form inputs animation
    gsap.fromTo(formRef.current?.children || [],
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Submit button pulse animation
    gsap.to(submitRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    gsap.to(submitRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(submitRef.current, {
          scale: 1,
          duration: 0.3
        });
      }
    });

    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-subtle"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-5xl font-black text-center mb-16 text-gradient"
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:border-modern-blue focus:ring-2 focus:ring-modern-blue/20 transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:border-modern-blue focus:ring-2 focus:ring-modern-blue/20 transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:border-modern-blue focus:ring-2 focus:ring-modern-blue/20 transition-all duration-200 outline-none resize-none"
                />
              </div>

              <button
                ref={submitRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperPlaneTilt 
                        size={20} 
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                      />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                Let's Build Something Amazing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ready to transform your ideas into cutting-edge digital solutions? 
                Get in touch and let's discuss how we can bring your vision to life 
                with our modern technology expertise.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="mailto:scratchuretechnologies@gmail.com"
                className="modern-card p-6 hover-lift transition-all duration-200 block"
              >
                <h4 className="font-semibold mb-1 text-primary">Email</h4>
                <p className="text-modern-blue">scratchuretechnologies@gmail.com</p>
              </a>

              <a 
                href="tel:+917000849679"
                className="modern-card p-6 hover-lift transition-all duration-200 block"
              >
                <h4 className="font-semibold mb-1 text-primary">Phone</h4>
                <p className="text-modern-blue">+91 7000849679</p>
              </a>

              <div className="modern-card p-6 hover-lift transition-all duration-200">
                <h4 className="font-semibold mb-1 text-primary">Location</h4>
                <p className="text-modern-blue">Ratlam MP</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-cyber-pink/5 rounded-full blur-3xl float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-cyber-cyan/5 rounded-full blur-2xl float" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Contact;