import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Bot, Sparkles, ArrowRight, Shield, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const ChatbotSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  const features = [{
    icon: Globe,
    title: '8 Languages',
    description: 'Support in English, Hindi, Marathi, Telugu, Tamil, Malayalam, Bengali, and Odia'
  }, {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure information based on your user type - Staff, Donor, or Visitor'
  }, {
    icon: Clock,
    title: '24/7 Available',
    description: 'Get instant answers anytime, anywhere with our AI assistant'
  }];
  return <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={inView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6
        }}>
            <motion.div initial={{
            scale: 0
          }} animate={inView ? {
            scale: 1
          } : {}} transition={{
            delay: 0.2,
            type: 'spring'
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Assistant</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Get Instant Answers with Our{' '}
              
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Our intelligent AI chatbot is trained on AidConnect Global's data to provide accurate, 
              role-based information. Whether you're a donor checking your contributions, staff managing 
              operations, or a visitor learning about our mission - get instant help in your preferred language.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => <motion.div key={feature.title} initial={{
              opacity: 0,
              x: -20
            }} animate={inView ? {
              opacity: 1,
              x: 0
            } : {}} transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.1
            }} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>)}
            </div>

            <Link to="/chatbot">
              <Button className="btn-primary group">
                <MessageCircle className="w-5 h-5 mr-2" />
                Open Full Chatbot
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={inView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative">
            <div className="relative">
              {/* Chat Preview */}
              <div className="glass-card p-6 shadow-elevated">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AidConnect Assistant</h3>
                    <p className="text-sm text-green-500">● Online</p>
                  </div>
                </div>

                {/* Sample Messages */}
                <div className="space-y-4">
                  <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} animate={inView ? {
                  opacity: 1,
                  y: 0
                } : {}} transition={{
                  delay: 0.5
                }} className="flex justify-start">
                    <div className="bg-accent rounded-2xl rounded-bl-md p-3 max-w-[80%]">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                        <p className="text-sm">Hello! I'm here to help you with any questions about AidConnect Global. How can I assist you today?</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} animate={inView ? {
                  opacity: 1,
                  y: 0
                } : {}} transition={{
                  delay: 0.7
                }} className="flex justify-end">
                    <div className="gradient-primary text-white rounded-2xl rounded-br-md p-3 max-w-[80%]">
                      <p className="text-sm">What programs do you offer?</p>
                    </div>
                  </motion.div>

                  <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} animate={inView ? {
                  opacity: 1,
                  y: 0
                } : {}} transition={{
                  delay: 0.9
                }} className="flex justify-start">
                    <div className="bg-accent rounded-2xl rounded-bl-md p-3 max-w-[80%]">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                        <p className="text-sm">We have 4 main programs: Education (15,000+ students), Healthcare (200+ camps), Clean Water (500+ wells), and Emergency Relief. Would you like details on any specific program?</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Input Preview */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-xl px-4 py-3 text-muted-foreground text-sm">
                    Type your message...
                  </div>
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-2 border-primary/20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-primary/5 -z-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ChatbotSection;