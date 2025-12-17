import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DonatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 section-padding">
        <div className="container-wide max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              Make a Donation
            </h1>
            <p className="text-lg text-muted-foreground">
              Your generosity helps transform lives across communities.
            </p>
          </div>
          <div className="glass-card p-8">
            <p className="text-center text-muted-foreground mb-6">
              Donation integration coming soon. For now, please contact us at info@aidconnect.org
            </p>
            <Button className="w-full btn-primary h-12">
              <Heart className="w-5 h-5 mr-2" />
              Contact to Donate
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default DonatePage;
