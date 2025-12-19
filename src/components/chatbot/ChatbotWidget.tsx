import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Website data for the chatbot
const websiteData = {
  general: {
    name: 'Hope Hands Global',
    mission: 'Empowering communities and transforming lives through sustainable development, education, healthcare, and emergency relief programs.',
    founded: '2015',
    location: 'Mumbai, Maharashtra, India',
    contact: {
      email: 'info@hopehands.org',
      phone: '+91 22 1234 5678',
      address: '123 Hope Street, Mumbai, Maharashtra 400001, India'
    },
    certifications: ['80G Tax Exemption', 'FCRA Registered', 'GuideStar India Platinum'],
  },
  programs: [
    { name: 'Education', description: 'Supporting 15,000+ students with scholarships and skill development', fundUtilization: '₹45 Lakhs' },
    { name: 'Healthcare', description: 'Conducted 200+ medical camps reaching 50,000+ beneficiaries', fundUtilization: '₹38 Lakhs' },
    { name: 'Clean Water', description: 'Installed 500+ water systems in rural villages', fundUtilization: '₹52 Lakhs' },
    { name: 'Emergency Relief', description: 'Assisted 50,000+ people during natural disasters', fundUtilization: '₹35 Lakhs' },
  ],
  impact: {
    livesChanged: '50,000+',
    communitiesServed: '250+',
    volunteers: '1,500+',
    activePrograms: '25+',
    fundUtilization: '98%',
  },
  donation: {
    methods: ['Online (UPI, Cards, Net Banking)', 'Bank Transfer', 'Cheque'],
    taxBenefits: '80G tax exemption available',
    minimumAmount: '₹100',
    certificates: 'Personalized donation certificates provided for all donations',
  },
  // Admin dashboard data for staff queries
  adminData: {
    complianceScore: 94,
    totalFunds: '₹25 Lakh',
    fundUtilization: '98%',
    pendingAidRequests: 45,
    approvedAidRequests: 1250,
    pendingTransactions: 3,
    completedTransactions: 247,
    programAllocations: {
      education: { amount: '₹8.5 Lakh', percentage: 34 },
      healthcare: { amount: '₹6.25 Lakh', percentage: 25 },
      livelihood: { amount: '₹5 Lakh', percentage: 20 },
      disasterRelief: { amount: '₹3.75 Lakh', percentage: 15 },
      admin: { amount: '₹1.5 Lakh', percentage: 6 },
    },
  },
};

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();

  const isAdminPage = location.pathname.includes('/staff');

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getWelcomeMessage = () => {
    if (isAdminPage || user?.role === 'staff') {
      return `Welcome, ${user?.name || 'Admin'}! I'm your admin assistant. I can help with:\n\n• Compliance score & status\n• Fund allocation details\n• Aid request summaries\n• Transaction reports\n• Quick dashboard insights\n\nAsk me anything about your dashboard!`;
    } else if (user?.role === 'donor') {
      return `Hello ${user.name}! Thank you for being a valued donor. I can help you with:\n\n• Your donation history\n• Impact of your contributions\n• Download donation certificates\n• Program updates\n\nWhat would you like to know?`;
    }
    return t('chat.welcome');
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Admin-specific responses (short and crisp)
    if (isAdminPage || user?.role === 'staff') {
      if (lowerMessage.includes('compliance') || lowerMessage.includes('score')) {
        return `**Compliance Score: ${websiteData.adminData.complianceScore}%**\n\n✅ System Health: Excellent\n✅ 80G: Active\n✅ FCRA: Valid till 2027\n✅ Audit: Completed`;
      }
      
      if (lowerMessage.includes('fund') || lowerMessage.includes('allocation') || lowerMessage.includes('budget')) {
        const alloc = websiteData.adminData.programAllocations;
        return `**Fund Allocation:**\n\n• Education: ${alloc.education.amount} (${alloc.education.percentage}%)\n• Healthcare: ${alloc.healthcare.amount} (${alloc.healthcare.percentage}%)\n• Livelihood: ${alloc.livelihood.amount} (${alloc.livelihood.percentage}%)\n• Relief: ${alloc.disasterRelief.amount} (${alloc.disasterRelief.percentage}%)\n• Admin: ${alloc.admin.amount} (${alloc.admin.percentage}%)\n\nTotal: ${websiteData.adminData.totalFunds}`;
      }
      
      if (lowerMessage.includes('aid') || lowerMessage.includes('request')) {
        return `**Aid Requests:**\n\n• Pending: ${websiteData.adminData.pendingAidRequests}\n• Approved (Quarter): ${websiteData.adminData.approvedAidRequests}\n• Avg Processing: 5 days\n\nCheck Aid Requests tab for details.`;
      }
      
      if (lowerMessage.includes('transaction') || lowerMessage.includes('donation')) {
        return `**Transactions:**\n\n• Pending: ${websiteData.adminData.pendingTransactions}\n• Completed: ${websiteData.adminData.completedTransactions}\n• Utilization: ${websiteData.adminData.fundUtilization}\n\nView Fund Management for full list.`;
      }
      
      if (lowerMessage.includes('utilization') || lowerMessage.includes('usage')) {
        return `**Fund Utilization: ${websiteData.adminData.fundUtilization}**\n\n₹24.5 Lakh utilized of ${websiteData.adminData.totalFunds}.\nExcellent efficiency!`;
      }
      
      if (lowerMessage.includes('pending') || lowerMessage.includes('action')) {
        return `**Pending Actions:**\n\n• Aid Requests: ${websiteData.adminData.pendingAidRequests} pending\n• Transactions: ${websiteData.adminData.pendingTransactions} to verify\n\nPrioritize pending items in respective tabs.`;
      }
      
      if (lowerMessage.includes('overview') || lowerMessage.includes('summary') || lowerMessage.includes('status')) {
        return `**Quick Overview:**\n\n💰 Total: ${websiteData.adminData.totalFunds}\n📊 Utilization: ${websiteData.adminData.fundUtilization}\n✅ Compliance: ${websiteData.adminData.complianceScore}%\n📋 Pending Aid: ${websiteData.adminData.pendingAidRequests}\n\nAll systems operational.`;
      }

      if (lowerMessage.includes('help') || lowerMessage.includes('what can')) {
        return `I can help with:\n\n• "compliance" - Score & status\n• "fund allocation" - Budget breakdown\n• "aid requests" - Request summary\n• "transactions" - Payment status\n• "overview" - Quick dashboard stats\n\nJust ask!`;
      }
      
      return `I can help with compliance, funds, aid requests, and transactions. Try asking about "fund allocation" or "pending requests".`;
    }
    
    // Donor-specific responses
    if (user?.role === 'donor') {
      if (lowerMessage.includes('total fund') || lowerMessage.includes('all donation') || lowerMessage.includes('staff') || lowerMessage.includes('compliance')) {
        return "I can only provide information about your own donations. For organizational finances, please contact info@hopehands.org.";
      }
      
      if (lowerMessage.includes('my donation') || lowerMessage.includes('donation history')) {
        return `**Your Donations:**\n\n• Total: ₹25,000\n• Programs: Education, Healthcare\n• People Helped: ~50\n• Certificates: Available\n\nDownload from your dashboard!`;
      }
      
      if (lowerMessage.includes('certificate')) {
        return "Download certificates from your Donor Dashboard. Each includes your name, amount, date, program, and 80G details.";
      }
      
      if (lowerMessage.includes('impact') || lowerMessage.includes('help')) {
        return `**Your Impact:**\n\n• 10 students supported\n• 15 families helped\n• 98% fund utilization\n\nThank you for making a difference!`;
      }
    }
    
    // General public responses
    if (lowerMessage.includes('mission') || lowerMessage.includes('about')) {
      return `**Hope Hands Global**\n\n${websiteData.general.mission}\n\nFocus: Education, Healthcare, Water, Emergency Relief\nImpact: ${websiteData.impact.livesChanged} lives changed`;
    }
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('contribution')) {
      return `**Donate:**\n\n• Online: UPI, Cards, Net Banking\n• Bank Transfer: Contact us\n• Min: ₹100\n\n✅ 80G tax exemption\n✅ Certificate provided\n\nVisit our Donate page!`;
    }
    
    if (lowerMessage.includes('program') || lowerMessage.includes('initiative')) {
      return `**Programs:**\n\n1. Education - 15,000+ students\n2. Healthcare - 50,000+ reached\n3. Clean Water - 500+ systems\n4. Emergency Relief - 50,000+ helped\n\nClick any program to donate!`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return `**Contact:**\n\n📧 ${websiteData.general.contact.email}\n📞 ${websiteData.general.contact.phone}\n📍 Mumbai, India\n\nResponse within 24-48 hours!`;
    }
    
    if (lowerMessage.includes('impact') || lowerMessage.includes('achievement')) {
      return `**Impact:**\n\n• ${websiteData.impact.livesChanged} Lives Changed\n• ${websiteData.impact.communitiesServed} Communities\n• ${websiteData.impact.volunteers} Volunteers\n• ${websiteData.impact.fundUtilization} Utilization`;
    }
    
    if (lowerMessage.includes('volunteer')) {
      return `**Volunteer:**\n\n• Field work\n• Teaching\n• Healthcare support\n• Events\n• Marketing\n\nContact: volunteer@hopehands.org`;
    }
    
    if (lowerMessage.includes('tax') || lowerMessage.includes('80g')) {
      return `**Tax Benefits:**\n\n80G exemption available!\n• Certificate with every donation\n• Valid for tax deduction\n\nYour generosity is rewarded! 🧾`;
    }
    
    return "I can help with donations, programs, volunteering, and impact info. What would you like to know?";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const response = generateResponse(inputValue);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-primary shadow-glow flex items-center justify-center animate-pulse-glow"
          >
            <MessageCircle className="w-7 h-7 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '420px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] glass-card overflow-hidden shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {isAdminPage ? 'Admin Assistant' : 'Hope Hands Assistant'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {isAdminPage ? 'Quick insights' : (user ? `${user.role === 'staff' ? 'Staff' : 'Donor'} Support` : 'Online')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.role === 'user'
                            ? 'gradient-primary text-white rounded-br-md'
                            : 'bg-card border border-border rounded-bl-md'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.role === 'assistant' && (
                            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-card border border-border rounded-2xl rounded-bl-md p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          <span className="text-sm text-muted-foreground">Typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isAdminPage ? "Ask about dashboard data..." : t('chat.placeholder')}
                      className="flex-1 rounded-xl"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="btn-primary rounded-xl px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Powered by AI • Hope Hands Global
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;