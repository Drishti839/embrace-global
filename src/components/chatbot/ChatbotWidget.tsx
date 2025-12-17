import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Website data for the chatbot
const websiteData = {
  general: {
    name: 'AidConnect Global',
    mission: 'Empowering communities and transforming lives through sustainable development, education, healthcare, and emergency relief programs.',
    founded: '2015',
    location: 'Mumbai, Maharashtra, India',
    contact: {
      email: 'info@aidconnect.org',
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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
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
    if (user?.role === 'staff') {
      return `Welcome back, ${user.name}! As NGO Staff, I can help you with:\n\n• Financial reports and fund utilization\n• Program performance metrics\n• Aid request management\n• Compliance documentation\n\nHow can I assist you today?`;
    } else if (user?.role === 'donor') {
      return `Hello ${user.name}! Thank you for being a valued donor. I can help you with:\n\n• Your donation history\n• Impact of your contributions\n• Download donation certificates\n• Program updates you've supported\n\nWhat would you like to know?`;
    }
    return t('chat.welcome');
  };

  const getLocalizedResponses = () => {
    const responses: Record<string, Record<string, string>> = {
      en: {
        accessDenied: "I apologize, but I can only provide information about your own donations and their impact. For overall organizational finances, please contact our team at info@aidconnect.org.",
        donationHistory: "Based on your account:\n\n• **Total Donated**: ₹25,000\n• **Programs Supported**: Education, Healthcare\n• **People Impacted**: ~50 individuals\n• **Certificate Status**: Available for download\n\nYou can download your certificates from the Donor Dashboard.",
        certificate: "You can download your donation certificates from your Donor Dashboard. Each certificate includes:\n\n• Your name and donation ID\n• Amount and date\n• Program supported\n• 80G tax exemption details\n• Verification reference",
        impact: "Your contributions have made a real difference!\n\n**Your Impact Summary:**\n• 10 students received educational support\n• 15 families received healthcare assistance\n• Your donations have 98% direct utilization\n\nThank you for your continued support!",
        financial: `**Financial Overview (FY 2024-25):**\n\n• **Total Funds Collected**: ₹2.5 Crores\n• **Utilized**: ₹2.45 Crores (98%)\n• **Program Allocation**:\n  - Education: ₹45 Lakhs\n  - Healthcare: ₹38 Lakhs\n  - Clean Water: ₹52 Lakhs\n  - Emergency Relief: ₹35 Lakhs\n  - Admin: ₹25 Lakhs (10%)\n\nDetailed reports available in the Staff Dashboard.`,
        compliance: "**Compliance Status:**\n\n✅ 80G Registration: Active\n✅ FCRA: Renewed (Valid till 2027)\n✅ Annual Audit: Completed (March 2024)\n✅ GuideStar: Platinum Certified\n\nAll compliance documents are available in the Staff Portal.",
        aidRequests: "**Aid Requests Summary:**\n\n• **Pending**: 45 requests\n• **In Review**: 23 requests\n• **Approved**: 1,250 (this quarter)\n• **Average Processing Time**: 5 days\n\nCategories: Education (40%), Healthcare (30%), Emergency (20%), Water (10%)",
        about: `**About AidConnect Global**\n\n${websiteData.general.mission}\n\n**Our Focus Areas:**\n• Education & Skill Development\n• Healthcare Services\n• Clean Water Access\n• Emergency Relief\n\nWe've impacted ${websiteData.impact.livesChanged} lives across ${websiteData.impact.communitiesServed} communities.`,
        donate: `**How to Donate:**\n\n1. **Online**: Visit our Donate page (UPI, Cards, Net Banking)\n2. **Bank Transfer**: Contact us for details\n3. **Cheque**: Payable to "AidConnect Global"\n\n**Benefits:**\n• ${websiteData.donation.taxBenefits}\n• ${websiteData.donation.certificates}\n• Minimum: ${websiteData.donation.minimumAmount}\n\nEvery rupee makes a difference! 🧡`,
        programs: `**Our Programs:**\n\n1. **Education** - ${websiteData.programs[0].description}\n2. **Healthcare** - ${websiteData.programs[1].description}\n3. **Clean Water** - ${websiteData.programs[2].description}\n4. **Emergency Relief** - ${websiteData.programs[3].description}\n\nClick on any program on our homepage to donate specifically!`,
        contact: `**Contact Us:**\n\n📧 Email: ${websiteData.general.contact.email}\n📞 Phone: ${websiteData.general.contact.phone}\n📍 Address: ${websiteData.general.contact.address}\n\nOur team responds within 24-48 hours!`,
        impactGeneral: `**Our Impact:**\n\n• **${websiteData.impact.livesChanged}** Lives Changed\n• **${websiteData.impact.communitiesServed}** Communities Served\n• **${websiteData.impact.volunteers}** Active Volunteers\n• **${websiteData.impact.fundUtilization}** Fund Utilization Rate\n\nEvery donation creates real, measurable change!`,
        volunteer: "**Volunteer with Us!**\n\nWe welcome passionate individuals to join our mission:\n\n• Field Volunteers\n• Teaching Assistants\n• Healthcare Support\n• Event Coordinators\n• Digital Marketing\n\nContact us at volunteer@aidconnect.org or visit our Volunteer page!",
        tax: "**Tax Benefits:**\n\nAll donations to AidConnect Global qualify for **80G tax exemption** under the Income Tax Act.\n\n• You'll receive a certificate with your donation\n• Certificate includes 80G registration number\n• Valid for claiming tax deduction\n\nYour generosity is rewarded! 🧾",
        default: "I'm here to help you learn about AidConnect Global! I can answer questions about:\n\n• Our mission and programs\n• How to donate\n• Impact and achievements\n• Volunteering opportunities\n• Contact information\n\nWhat would you like to know?"
      },
      hi: {
        accessDenied: "क्षमा करें, मैं केवल आपके अपने दान और उनके प्रभाव के बारे में जानकारी प्रदान कर सकता हूं। संगठन के समग्र वित्त के लिए, कृपया info@aidconnect.org पर हमारी टीम से संपर्क करें।",
        donationHistory: "आपके खाते के अनुसार:\n\n• **कुल दान**: ₹25,000\n• **समर्थित कार्यक्रम**: शिक्षा, स्वास्थ्य\n• **प्रभावित लोग**: ~50 व्यक्ति\n• **प्रमाणपत्र स्थिति**: डाउनलोड के लिए उपलब्ध\n\nआप दाता डैशबोर्ड से अपने प्रमाणपत्र डाउनलोड कर सकते हैं।",
        default: "मैं AidConnect Global के बारे में जानने में आपकी मदद के लिए यहां हूं! मैं इन विषयों पर प्रश्नों का उत्तर दे सकता हूं:\n\n• हमारा मिशन और कार्यक्रम\n• दान कैसे करें\n• प्रभाव और उपलब्धियां\n• स्वयंसेवा के अवसर\n• संपर्क जानकारी\n\nआप क्या जानना चाहेंगे?"
      },
      mr: {
        accessDenied: "क्षमा करा, मी फक्त तुमच्या स्वतःच्या दान आणि त्यांच्या प्रभावाबद्दल माहिती देऊ शकतो. संस्थेच्या एकूण वित्तासाठी, कृपया info@aidconnect.org वर आमच्या टीमशी संपर्क साधा।",
        default: "मी AidConnect Global बद्दल जाणून घेण्यात तुम्हाला मदत करण्यासाठी येथे आहे! मी या विषयांवर प्रश्नांची उत्तरे देऊ शकतो:\n\n• आमचे मिशन आणि कार्यक्रम\n• दान कसे करावे\n• प्रभाव आणि उपलब्धी\n• स्वयंसेवा संधी\n• संपर्क माहिती\n\nतुम्हाला काय जाणून घ्यायचे आहे?"
      },
      te: {
        default: "AidConnect Global గురించి తెలుసుకోవడంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను! నేను ఈ అంశాలపై ప్రశ్నలకు సమాధానం ఇవ్వగలను:\n\n• మా మిషన్ మరియు ప్రోగ్రామ్‌లు\n• విరాళం ఎలా ఇవ్వాలి\n• ప్రభావం మరియు విజయాలు\n• వాలంటీర్ అవకాశాలు\n• సంప్రదింపు సమాచారం\n\nమీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?"
      },
      ml: {
        default: "AidConnect Global-നെക്കുറിച്ച് അറിയാൻ നിങ്ങളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്! ഈ വിഷയങ്ങളിൽ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകാൻ എനിക്ക് കഴിയും:\n\n• ഞങ്ങളുടെ ദൗത്യവും പ്രോഗ്രാമുകളും\n• എങ്ങനെ സംഭാവന ചെയ്യാം\n• സ്വാധീനവും നേട്ടങ്ങളും\n• വോളണ്ടിയർ അവസരങ്ങൾ\n• ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ\n\nനിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?"
      },
      ta: {
        default: "AidConnect Global பற்றி தெரிந்துகொள்ள உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன்! இந்த தலைப்புகளில் கேள்விகளுக்கு பதிலளிக்க முடியும்:\n\n• எங்கள் நோக்கம் மற்றும் திட்டங்கள்\n• நன்கொடை எப்படி அளிப்பது\n• தாக்கம் மற்றும் சாதனைகள்\n• தன்னார்வ வாய்ப்புகள்\n• தொடர்பு தகவல்\n\nநீங்கள் என்ன அறிய விரும்புகிறீர்கள்?"
      },
      bn: {
        default: "AidConnect Global সম্পর্কে জানতে আপনাকে সাহায্য করতে আমি এখানে আছি! আমি এই বিষয়গুলোতে প্রশ্নের উত্তর দিতে পারি:\n\n• আমাদের মিশন ও প্রোগ্রাম\n• কীভাবে দান করবেন\n• প্রভাব ও অর্জন\n• স্বেচ্ছাসেবার সুযোগ\n• যোগাযোগের তথ্য\n\nআপনি কী জানতে চান?"
      },
      or: {
        default: "AidConnect Global ବିଷୟରେ ଜାଣିବାରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ମୁଁ ଏଠାରେ ଅଛି! ମୁଁ ଏହି ବିଷୟଗୁଡ଼ିକରେ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇପାରେ:\n\n• ଆମର ମିଶନ ଏବଂ କାର୍ଯ୍ୟକ୍ରମ\n• କିପରି ଦାନ କରିବେ\n• ପ୍ରଭାବ ଏବଂ ସଫଳତା\n• ସ୍ୱେଚ୍ଛାସେବୀ ସୁଯୋଗ\n• ଯୋଗାଯୋଗ ସୂଚନା\n\nଆପଣ କ'ଣ ଜାଣିବାକୁ ଚାହୁଁଛନ୍ତି?"
      }
    };
    return responses[language] || responses.en;
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const localizedResponses = getLocalizedResponses();
    const fallbackResponses = getLocalizedResponses();
    
    // Role-based access control
    if (user?.role === 'donor') {
      // Donors cannot access internal financial data
      if (lowerMessage.includes('total fund') || lowerMessage.includes('all donation') || lowerMessage.includes('staff') || lowerMessage.includes('compliance')) {
        return localizedResponses.accessDenied || fallbackResponses.accessDenied;
      }
      
      // Donor-specific responses
      if (lowerMessage.includes('my donation') || lowerMessage.includes('donation history')) {
        return localizedResponses.donationHistory || `Based on your account:\n\n• **Total Donated**: ₹25,000\n• **Programs Supported**: Education, Healthcare\n• **People Impacted**: ~50 individuals\n• **Certificate Status**: Available for download\n\nYou can download your certificates from the Donor Dashboard.`;
      }
      
      if (lowerMessage.includes('certificate')) {
        return localizedResponses.certificate || "You can download your donation certificates from your Donor Dashboard. Each certificate includes:\n\n• Your name and donation ID\n• Amount and date\n• Program supported\n• 80G tax exemption details\n• Verification reference";
      }
      
      if (lowerMessage.includes('impact') || lowerMessage.includes('help')) {
        return localizedResponses.impact || "Your contributions have made a real difference!\n\n**Your Impact Summary:**\n• 10 students received educational support\n• 15 families received healthcare assistance\n• Your donations have 98% direct utilization\n\nThank you for your continued support!";
      }
    }
    
    if (user?.role === 'staff') {
      // Staff has access to internal data
      if (lowerMessage.includes('fund') || lowerMessage.includes('financial') || lowerMessage.includes('utilization')) {
        return localizedResponses.financial || `**Financial Overview (FY 2024-25):**\n\n• **Total Funds Collected**: ₹2.5 Crores\n• **Utilized**: ₹2.45 Crores (98%)\n• **Program Allocation**:\n  - Education: ₹45 Lakhs\n  - Healthcare: ₹38 Lakhs\n  - Clean Water: ₹52 Lakhs\n  - Emergency Relief: ₹35 Lakhs\n  - Admin: ₹25 Lakhs (10%)\n\nDetailed reports available in the Staff Dashboard.`;
      }
      
      if (lowerMessage.includes('compliance') || lowerMessage.includes('audit')) {
        return localizedResponses.compliance || "**Compliance Status:**\n\n✅ 80G Registration: Active\n✅ FCRA: Renewed (Valid till 2027)\n✅ Annual Audit: Completed (March 2024)\n✅ GuideStar: Platinum Certified\n\nAll compliance documents are available in the Staff Portal.";
      }
      
      if (lowerMessage.includes('aid request') || lowerMessage.includes('request')) {
        return localizedResponses.aidRequests || "**Aid Requests Summary:**\n\n• **Pending**: 45 requests\n• **In Review**: 23 requests\n• **Approved**: 1,250 (this quarter)\n• **Average Processing Time**: 5 days\n\nCategories: Education (40%), Healthcare (30%), Emergency (20%), Water (10%)";
      }
    }
    
    // General public responses
    if (lowerMessage.includes('mission') || lowerMessage.includes('about')) {
      return localizedResponses.about || `**About AidConnect Global**\n\n${websiteData.general.mission}\n\n**Our Focus Areas:**\n• Education & Skill Development\n• Healthcare Services\n• Clean Water Access\n• Emergency Relief\n\nWe've impacted ${websiteData.impact.livesChanged} lives across ${websiteData.impact.communitiesServed} communities.`;
    }
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('contribution')) {
      return localizedResponses.donate || `**How to Donate:**\n\n1. **Online**: Visit our Donate page (UPI, Cards, Net Banking)\n2. **Bank Transfer**: Contact us for details\n3. **Cheque**: Payable to "AidConnect Global"\n\n**Benefits:**\n• ${websiteData.donation.taxBenefits}\n• ${websiteData.donation.certificates}\n• Minimum: ${websiteData.donation.minimumAmount}\n\nEvery rupee makes a difference! 🧡`;
    }
    
    if (lowerMessage.includes('program') || lowerMessage.includes('initiative')) {
      return localizedResponses.programs || `**Our Programs:**\n\n1. **Education** - ${websiteData.programs[0].description}\n2. **Healthcare** - ${websiteData.programs[1].description}\n3. **Clean Water** - ${websiteData.programs[2].description}\n4. **Emergency Relief** - ${websiteData.programs[3].description}\n\nClick on any program on our homepage to donate specifically!`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return localizedResponses.contact || `**Contact Us:**\n\n📧 Email: ${websiteData.general.contact.email}\n📞 Phone: ${websiteData.general.contact.phone}\n📍 Address: ${websiteData.general.contact.address}\n\nOur team responds within 24-48 hours!`;
    }
    
    if (lowerMessage.includes('impact') || lowerMessage.includes('achievement')) {
      return localizedResponses.impactGeneral || `**Our Impact:**\n\n• **${websiteData.impact.livesChanged}** Lives Changed\n• **${websiteData.impact.communitiesServed}** Communities Served\n• **${websiteData.impact.volunteers}** Active Volunteers\n• **${websiteData.impact.fundUtilization}** Fund Utilization Rate\n\nEvery donation creates real, measurable change!`;
    }
    
    if (lowerMessage.includes('volunteer')) {
      return localizedResponses.volunteer || "**Volunteer with Us!**\n\nWe welcome passionate individuals to join our mission:\n\n• Field Volunteers\n• Teaching Assistants\n• Healthcare Support\n• Event Coordinators\n• Digital Marketing\n\nContact us at volunteer@aidconnect.org or visit our Volunteer page!";
    }
    
    if (lowerMessage.includes('tax') || lowerMessage.includes('80g')) {
      return localizedResponses.tax || "**Tax Benefits:**\n\nAll donations to AidConnect Global qualify for **80G tax exemption** under the Income Tax Act.\n\n• You'll receive a certificate with your donation\n• Certificate includes 80G registration number\n• Valid for claiming tax deduction\n\nYour generosity is rewarded! 🧾";
    }
    
    // Default response
    return localizedResponses.default;
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

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

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
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] glass-card overflow-hidden shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AidConnect Assistant</h3>
                  <p className="text-xs text-white/80">
                    {user ? `${user.role === 'staff' ? 'Staff' : 'Donor'} Support` : 'Online'}
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
                      placeholder={t('chat.placeholder')}
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
                    Powered by AI • Data from AidConnect Global
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
