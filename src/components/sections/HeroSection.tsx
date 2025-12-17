import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-hands.jpg';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        setRotation(prev => prev + delta * 0.15);
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial-glow opacity-50" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="text-center lg:text-left">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Together We Can Make A Difference</span>
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif text-foreground leading-tight mb-6">
              {t('hero.title')}{' '}
              
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/donate">
                <Button className="btn-primary h-14 px-8 text-lg group">
                  <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('hero.donate')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  {t('hero.learnMore')}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Lives Impacted</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">Villages Reached</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Fund Utilization</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial={{
          opacity: 0,
          x: 50,
          scale: 0.9
        }} animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative">
            <div className="relative z-10 flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Diverse hands united in a circle, symbolizing community and hope" 
                  className="w-full h-full object-cover transition-transform duration-100 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full" />
              </div>

              {/* Floating Card - Circular */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8
            }} className="absolute -bottom-2 -left-2 md:bottom-0 md:left-4 w-24 h-24 md:w-28 md:h-28 rounded-full glass-card shadow-elevated flex flex-col items-center justify-center">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1" />
                <p className="font-semibold text-foreground text-sm md:text-base">₹2.5 Cr+</p>
                <p className="text-xs text-muted-foreground">Funds Raised</p>
              </motion.div>

              {/* Floating Badge - Circular */}
              <motion.div initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.9
            }} className="absolute -top-2 -right-2 md:top-0 md:right-4 w-24 h-24 md:w-28 md:h-28 rounded-full glass-card shadow-elevated flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl">🏆</span>
                <span className="font-semibold text-xs md:text-sm text-foreground text-center">Certified NGO</span>
              </motion.div>
            </div>

            {/* Background Decorations - Circular */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-primary/20 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full bg-primary/5 -z-20" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.2
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }} className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <motion.div animate={{
          y: [0, 8, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;