import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Heart, Users, Home, Award, TrendingUp, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';

const ImpactPage: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { icon: Heart, value: 50000, suffix: '+', label: 'Lives Changed', color: 'from-red-500 to-orange-500' },
    { icon: Home, value: 250, suffix: '+', label: 'Communities Served', color: 'from-orange-500 to-amber-500' },
    { icon: Users, value: 1500, suffix: '+', label: 'Active Volunteers', color: 'from-amber-500 to-yellow-500' },
    { icon: Award, value: 25, suffix: '+', label: 'Active Programs', color: 'from-yellow-500 to-orange-500' },
  ];

  const stories = [
    {
      name: 'Priya Sharma',
      location: 'Maharashtra',
      story: 'Thanks to AidConnect\'s education program, I was able to complete my engineering degree. Today, I work as a software developer and support my entire family.',
      image: educationImage,
      program: 'Education',
    },
    {
      name: 'Ramesh Kumar',
      location: 'Bihar',
      story: 'The healthcare camp conducted by AidConnect detected my diabetes early. The free treatment and guidance saved my life.',
      image: healthcareImage,
      program: 'Healthcare',
    },
    {
      name: 'Lakshmi Village Community',
      location: 'Andhra Pradesh',
      story: 'Our village had no clean water for generations. AidConnect installed a water purification system that now serves 500 families.',
      image: waterImage,
      program: 'Clean Water',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding gradient-hero">
          <div className="container-wide text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Real Impact, Real Stories</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6"
            >
              Our <span className="text-gradient">Impact</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Every number represents a life transformed, a community empowered, and a dream realized.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section ref={ref} className="section-padding bg-accent/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center hover-lift"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {inView ? <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} /> : '0'}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">Impact Stories</h2>
              <p className="text-muted-foreground">Real stories from real people whose lives we've touched</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card overflow-hidden hover-lift"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {story.program}
                    </span>
                    <div className="mt-4 mb-4">
                      <Quote className="w-8 h-8 text-primary/20" />
                      <p className="text-muted-foreground italic mt-2">{story.story}</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                    </div>
                  </div>
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

export default ImpactPage;
