import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Users, Heart, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const VolunteerPage: React.FC = () => {
  const opportunities = [
    { title: 'Field Volunteer', location: 'Pan India', type: 'Part-time', description: 'Work directly with communities on ground' },
    { title: 'Teaching Assistant', location: 'Maharashtra, Bihar', type: 'Weekends', description: 'Help underprivileged children with education' },
    { title: 'Healthcare Support', location: 'Rural Areas', type: 'Monthly Camps', description: 'Assist in medical camps and health drives' },
    { title: 'Digital Marketing', location: 'Remote', type: 'Flexible', description: 'Help spread our message online' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding gradient-hero">
          <div className="container-wide text-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4">
              Become a Volunteer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of 1,500+ volunteers making a difference every day.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-8 text-center">Current Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {opportunities.map((opp, index) => (
                <motion.div key={opp.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6 hover-lift">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{opp.title}</h3>
                  <p className="text-muted-foreground mb-4">{opp.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {opp.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {opp.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-xl mx-auto glass-card p-8">
              <h2 className="text-2xl font-bold font-serif text-foreground mb-6 text-center">Register as Volunteer</h2>
              <form className="space-y-4">
                <Input placeholder="Full Name" className="rounded-xl" />
                <Input type="email" placeholder="Email" className="rounded-xl" />
                <Input type="tel" placeholder="Phone Number" className="rounded-xl" />
                <Textarea placeholder="Why do you want to volunteer?" className="rounded-xl" />
                <Button className="w-full btn-primary"><Heart className="w-4 h-4 mr-2" /> Submit Application</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default VolunteerPage;
