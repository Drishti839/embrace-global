import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Heart, Target, Eye, Users, Award, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-hands.jpg';

const AboutPage: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;
          
          // Rotation proportional to scroll distance (0.15 degrees per pixel)
          setRotation(prev => prev + scrollDelta * 0.15);
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    { icon: Heart, title: 'Compassion', description: 'We lead with empathy in everything we do' },
    { icon: Shield, title: 'Transparency', description: '98% fund utilization with full accountability' },
    { icon: Users, title: 'Community', description: 'Empowering local communities to lead change' },
    { icon: Award, title: 'Excellence', description: 'Delivering measurable, lasting impact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding gradient-hero">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">
                  About Us
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  We are a dedicated team of changemakers committed to transforming lives through sustainable 
                  development, education, healthcare, and emergency relief programs across India.
                </p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl font-bold text-primary">10+</p>
                    <p className="text-sm text-muted-foreground">Years of Service</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">15</p>
                    <p className="text-sm text-muted-foreground">States Covered</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="relative flex justify-center">
                {/* Circular Image Container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elevated">
                  <img 
                    src={heroImage} 
                    alt="Unity - Diverse hands united in a circle" 
                    className="w-full h-full object-cover transition-transform duration-100 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full" />
                </div>
                
                {/* Background Decorations - Circular */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-primary/20 -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full bg-primary/5 -z-20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="section-padding bg-accent/30">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower underserved communities through sustainable programs in education, healthcare, 
                  clean water access, and emergency relief, creating lasting positive change in people's lives.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  A world where every individual has access to quality education, healthcare, and basic 
                  necessities, enabling them to live with dignity and reach their full potential.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">Our Core Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center hover-lift"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default AboutPage;
