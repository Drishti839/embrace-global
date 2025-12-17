import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Bot, MessageCircle } from 'lucide-react';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 section-padding">
        <div className="container-wide text-center">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Bot className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            AI Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get instant answers about AidConnect Global. Click the chat button in the bottom right corner to start a conversation.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <MessageCircle className="w-5 h-5 animate-bounce" />
            <span className="font-medium">Click the orange button below to chat</span>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default ChatbotPage;
