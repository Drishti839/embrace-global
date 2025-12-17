import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';

const NewsPage: React.FC = () => {
  const news = [
    { title: 'AidConnect Launches New Education Center in Bihar', date: 'Dec 15, 2024', image: educationImage, category: 'Education' },
    { title: 'Healthcare Camp Benefits 5,000+ in Maharashtra', date: 'Dec 10, 2024', image: healthcareImage, category: 'Healthcare' },
    { title: 'Clean Water Project Reaches 100th Village', date: 'Dec 5, 2024', image: waterImage, category: 'Clean Water' },
    { title: 'Annual Report 2024 Released', date: 'Nov 30, 2024', image: educationImage, category: 'Organization' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section-padding gradient-hero">
          <div className="container-wide text-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Newspaper className="w-10 h-10 text-primary-foreground" />
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4">
              News & <span className="text-gradient">Updates</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest initiatives, success stories, and organizational news.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              {news.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card overflow-hidden hover-lift cursor-pointer group">
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{item.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="flex items-center text-primary font-medium">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
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

export default NewsPage;
