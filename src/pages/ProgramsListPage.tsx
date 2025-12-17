import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { GraduationCap, HeartPulse, Droplets, AlertTriangle, Users, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';
import emergencyImage from '@/assets/emergency-program.jpg';

const ProgramsListPage: React.FC = () => {
  const programs = [
    { id: 'education', icon: GraduationCap, title: 'Education', image: educationImage, description: 'Empowering through quality education and skill development', color: 'from-blue-500 to-cyan-500' },
    { id: 'healthcare', icon: HeartPulse, title: 'Healthcare', image: healthcareImage, description: 'Accessible healthcare for underserved communities', color: 'from-red-500 to-pink-500' },
    { id: 'water', icon: Droplets, title: 'Clean Water', image: waterImage, description: 'Safe drinking water for rural communities', color: 'from-cyan-500 to-blue-500' },
    { id: 'emergency', icon: AlertTriangle, title: 'Emergency Relief', image: emergencyImage, description: 'Rapid response during natural disasters', color: 'from-orange-500 to-red-500' },
    { id: 'women', icon: Users, title: 'Women Empowerment', image: educationImage, description: 'Building stronger communities through women', color: 'from-purple-500 to-pink-500' },
    { id: 'children', icon: Heart, title: 'Child Welfare', image: healthcareImage, description: 'Nurturing and protecting our future', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding gradient-hero">
          <div className="container-wide text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4">
              Our <span className="text-gradient">Programs</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive initiatives designed to create lasting, sustainable change in communities.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/programs/${program.id}`}>
                    <div className="glass-card overflow-hidden hover-lift cursor-pointer h-full group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                          <program.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                        <p className="text-muted-foreground mb-4">{program.description}</p>
                        <div className="flex items-center text-primary font-medium">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
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

export default ProgramsListPage;
