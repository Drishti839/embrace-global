import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CareersPage: React.FC = () => {
  const jobs = [
    { title: 'Program Manager', location: 'Mumbai', type: 'Full-time', department: 'Operations' },
    { title: 'Field Coordinator', location: 'Bihar', type: 'Full-time', department: 'Field Operations' },
    { title: 'Communications Specialist', location: 'Remote', type: 'Full-time', department: 'Marketing' },
    { title: 'Finance Officer', location: 'Mumbai', type: 'Full-time', department: 'Finance' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding gradient-hero">
          <div className="container-wide text-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Briefcase className="w-10 h-10 text-primary-foreground" />
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4">
              Careers
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build a meaningful career while making a difference in people's lives.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-8">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6 hover-lift group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{job.department}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      Apply <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center text-muted-foreground">
              <p>Don't see a role that fits? Send your resume to <a href="mailto:careers@aidconnect.org" className="text-primary hover:underline">careers@aidconnect.org</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default CareersPage;
