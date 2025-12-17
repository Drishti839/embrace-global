import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, GraduationCap, HeartPulse, Droplets, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';
import emergencyImage from '@/assets/emergency-program.jpg';

const ProgramsSection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const programs = [
    {
      id: 'education',
      icon: GraduationCap,
      title: t('programs.education'),
      description: 'Empowering children through quality education, scholarships, and skill development programs.',
      image: educationImage,
      stats: { value: '15,000+', label: 'Students Supported' },
      color: 'from-blue-500 to-cyan-500',
      link: '/donate?program=education',
    },
    {
      id: 'healthcare',
      icon: HeartPulse,
      title: t('programs.healthcare'),
      description: 'Providing accessible healthcare services, medical camps, and health awareness programs.',
      image: healthcareImage,
      stats: { value: '200+', label: 'Health Camps' },
      color: 'from-red-500 to-pink-500',
      link: '/donate?program=healthcare',
    },
    {
      id: 'water',
      icon: Droplets,
      title: t('programs.water'),
      description: 'Installing clean water systems and promoting water conservation in rural communities.',
      image: waterImage,
      stats: { value: '500+', label: 'Wells Installed' },
      color: 'from-cyan-500 to-blue-500',
      link: '/donate?program=water',
    },
    {
      id: 'emergency',
      icon: AlertTriangle,
      title: t('programs.emergency'),
      description: 'Rapid response and relief during natural disasters and humanitarian emergencies.',
      image: emergencyImage,
      stats: { value: '50,000+', label: 'People Assisted' },
      color: 'from-orange-500 to-red-500',
      link: '/donate?program=emergency',
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Making Impact Across Sectors</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={program.link}>
                <div className="glass-card overflow-hidden hover-lift cursor-pointer h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg`}>
                      <program.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-2xl font-bold">{program.stats.value}</p>
                      <p className="text-sm opacity-80">{program.stats.label}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      <span>Donate Now</span>
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
  );
};

export default ProgramsSection;
