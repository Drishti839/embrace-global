import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Heart, Check, Shield, TrendingUp, Users, GraduationCap, HeartPulse, Droplets, AlertTriangle, CreditCard, Building, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router-dom';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';
import emergencyImage from '@/assets/emergency-program.jpg';
const DonatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedProgram = searchParams.get('program') || '';
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(preselectedProgram || 'general');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const amounts = [500, 1000, 2500, 5000, 10000, 25000];
  const programs = [{
    id: 'general',
    name: 'Where Most Needed',
    icon: Heart,
    color: 'bg-primary',
    description: 'Let us allocate your donation where it\'s needed most'
  }, {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    color: 'bg-blue-500',
    description: 'Support scholarships & school supplies',
    image: educationImage
  }, {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    color: 'bg-red-500',
    description: 'Fund medical camps & treatments',
    image: healthcareImage
  }, {
    id: 'water',
    name: 'Clean Water',
    icon: Droplets,
    color: 'bg-cyan-500',
    description: 'Install wells & purification systems',
    image: waterImage
  }, {
    id: 'emergency',
    name: 'Emergency Relief',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    description: 'Rapid disaster response',
    image: emergencyImage
  }];
  const fundUtilization = [{
    label: 'Education Programs',
    percentage: 27,
    color: 'bg-blue-500'
  }, {
    label: 'Healthcare Services',
    percentage: 23,
    color: 'bg-red-500'
  }, {
    label: 'Clean Water Projects',
    percentage: 31,
    color: 'bg-cyan-500'
  }, {
    label: 'Emergency Relief',
    percentage: 21,
    color: 'bg-orange-500'
  }, {
    label: 'Administrative',
    percentage: 2,
    color: 'bg-gray-400'
  }];
  const impactExamples = [{
    amount: 500,
    impact: 'Provides school supplies for 2 children'
  }, {
    amount: 1000,
    impact: 'Funds a health checkup for 5 families'
  }, {
    amount: 2500,
    impact: 'Supplies clean water for a week to a village'
  }, {
    amount: 5000,
    impact: 'Sponsors a child\'s education for 3 months'
  }, {
    amount: 10000,
    impact: 'Funds a complete medical camp'
  }, {
    amount: 25000,
    impact: 'Installs a water purification unit'
  }];
  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const currentImpact = impactExamples.find(i => i.amount === finalAmount)?.impact || (finalAmount && finalAmount > 0 ? `Makes a meaningful difference in communities` : '');
  return <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-accent/50 to-background">
          <div className="container-wide">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Heart className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">Make a Change
              </h1>
              <p className="text-lg text-muted-foreground">
                Your generosity transforms lives. 98% of every rupee goes directly to programs that create lasting change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Donation Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Donation Type */}
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Donation Type</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setDonationType('one-time')} className={`p-4 rounded-xl border-2 transition-all ${donationType === 'one-time' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <p className="font-semibold text-foreground">One-time</p>
                      <p className="text-sm text-muted-foreground">Single contribution</p>
                    </button>
                    <button onClick={() => setDonationType('monthly')} className={`p-4 rounded-xl border-2 transition-all ${donationType === 'monthly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <p className="font-semibold text-foreground">Monthly</p>
                      <p className="text-sm text-muted-foreground">Recurring support</p>
                    </button>
                  </div>
                </motion.div>

                {/* Select Amount */}
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }} className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Select Amount</h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {amounts.map(amount => <button key={amount} onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }} className={`p-4 rounded-xl border-2 transition-all ${selectedAmount === amount && !customAmount ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <p className="font-bold text-foreground">₹{amount.toLocaleString()}</p>
                      </button>)}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
                    <Input type="number" placeholder="Enter custom amount" value={customAmount} onChange={e => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }} className="pl-8 rounded-xl h-12" />
                  </div>
                  {currentImpact && finalAmount && finalAmount > 0 && <motion.div initial={{
                  opacity: 0,
                  scale: 0.95
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} className="mt-4 p-4 bg-primary/10 rounded-xl">
                      <p className="text-sm text-primary font-medium">
                        💡 Your ₹{finalAmount?.toLocaleString()} {currentImpact}
                      </p>
                    </motion.div>}
                </motion.div>

                {/* Select Program */}
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Choose Where Your Donation Goes</h2>
                  <div className="space-y-3">
                    {programs.map(program => <button key={program.id} onClick={() => setSelectedProgram(program.id)} className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${selectedProgram === program.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <div className={`w-12 h-12 rounded-xl ${program.color} flex items-center justify-center flex-shrink-0`}>
                          <program.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{program.name}</p>
                          <p className="text-sm text-muted-foreground">{program.description}</p>
                        </div>
                        {selectedProgram === program.id && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>}
                      </button>)}
                  </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="glass-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <button 
                      onClick={() => setSelectedPayment('upi')}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${selectedPayment === 'upi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <Smartphone className={`w-8 h-8 mx-auto mb-2 ${selectedPayment === 'upi' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="font-medium text-foreground">UPI</p>
                      <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
                    </button>
                    <button 
                      onClick={() => setSelectedPayment('card')}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${selectedPayment === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <CreditCard className={`w-8 h-8 mx-auto mb-2 ${selectedPayment === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="font-medium text-foreground">Card</p>
                      <p className="text-xs text-muted-foreground">Debit / Credit</p>
                    </button>
                    <button 
                      onClick={() => setSelectedPayment('netbanking')}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${selectedPayment === 'netbanking' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <Building className={`w-8 h-8 mx-auto mb-2 ${selectedPayment === 'netbanking' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="font-medium text-foreground">Net Banking</p>
                      <p className="text-xs text-muted-foreground">All major banks</p>
                    </button>
                  </div>

                  <Button className="w-full btn-primary h-14 text-lg" disabled={!finalAmount || finalAmount <= 0}>
                    <Heart className="w-5 h-5 mr-2" />
                    Donate ₹{finalAmount?.toLocaleString() || 0} {donationType === 'monthly' ? '/month' : ''}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    🔒 Secure payment powered by Razorpay. Your data is encrypted and safe.
                  </p>
                </motion.div>
              </div>

              {/* Sidebar - Transparency */}
              <div className="space-y-6">
                {/* Fund Utilization */}
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Where Your Money Goes</h3>
                  </div>
                  <div className="space-y-4">
                    {fundUtilization.map(item => <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${item.percentage}%`
                      }} transition={{
                        duration: 1,
                        delay: 0.5
                      }} className={`h-full ${item.color} rounded-full`} />
                        </div>
                      </div>)}
                  </div>
                  <div className="mt-4 p-3 bg-green-500/10 rounded-xl">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ 98% goes directly to programs
                    </p>
                  </div>
                </motion.div>

                {/* Tax Benefits */}
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.1
              }} className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Tax Benefits</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>80G tax exemption certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Instant donation receipt via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>FCRA registered for foreign donations</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Impact Stats */}
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.2
              }} className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Your Impact</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-primary">50K+</p>
                      <p className="text-xs text-muted-foreground">Lives Changed</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-primary">250+</p>
                      <p className="text-xs text-muted-foreground">Communities</p>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.3
              }} className="glass-card p-6">
                  <p className="text-sm font-medium text-foreground mb-3">Trusted & Verified</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">80G Certified</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">FCRA Registered</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">GuideStar Platinum</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>;
};
export default DonatePage;