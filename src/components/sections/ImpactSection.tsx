import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Heart, Users, Home, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ImpactSection: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    {
      icon: Heart,
      value: 50000,
      suffix: '+',
      label: t('impact.livesChanged'),
      description: 'People directly benefited from our programs',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Home,
      value: 250,
      suffix: '+',
      label: t('impact.communities'),
      description: 'Villages and communities reached',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Users,
      value: 1500,
      suffix: '+',
      label: t('impact.volunteers'),
      description: 'Dedicated volunteers across India',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Award,
      value: 25,
      suffix: '+',
      label: t('impact.programs'),
      description: 'Active initiatives running',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-accent/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
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
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Real Impact, Real Numbers</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            {t('impact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('impact.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-6 h-full hover-lift text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-soft`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 inline-block">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Transparent Fund Utilization
                </h3>
                <p className="text-muted-foreground">
                  98% of donations go directly to programs. View our detailed financial reports.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">Utilized</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">A+</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
