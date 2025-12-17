import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { GraduationCap, HeartPulse, Droplets, AlertTriangle, Users, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import waterImage from '@/assets/water-program.jpg';
import emergencyImage from '@/assets/emergency-program.jpg';

const programsData: Record<string, any> = {
  education: {
    icon: GraduationCap,
    title: 'Education Program',
    subtitle: 'Empowering through knowledge',
    image: educationImage,
    description: 'Our education program provides scholarships, school supplies, and skill development training to underprivileged children and youth.',
    stats: [
      { value: '15,000+', label: 'Students Supported' },
      { value: '500+', label: 'Schools Partnered' },
      { value: '₹45L', label: 'Invested' },
    ],
    activities: ['Scholarships for higher education', 'Digital literacy programs', 'Vocational training', 'After-school tutoring'],
    color: 'from-blue-500 to-cyan-500',
  },
  healthcare: {
    icon: HeartPulse,
    title: 'Healthcare Program',
    subtitle: 'Health for all',
    image: healthcareImage,
    description: 'We conduct medical camps, provide free treatments, and run health awareness programs in underserved communities.',
    stats: [
      { value: '200+', label: 'Health Camps' },
      { value: '50,000+', label: 'Patients Treated' },
      { value: '₹38L', label: 'Invested' },
    ],
    activities: ['Free medical camps', 'Eye care programs', 'Maternal health support', 'Health awareness drives'],
    color: 'from-red-500 to-pink-500',
  },
  water: {
    icon: Droplets,
    title: 'Clean Water Program',
    subtitle: 'Every drop counts',
    image: waterImage,
    description: 'We install water purification systems, bore wells, and promote water conservation in rural areas.',
    stats: [
      { value: '500+', label: 'Wells Installed' },
      { value: '100+', label: 'Villages Covered' },
      { value: '₹52L', label: 'Invested' },
    ],
    activities: ['Bore well installation', 'Water purification systems', 'Rainwater harvesting', 'Community awareness'],
    color: 'from-cyan-500 to-blue-500',
  },
  emergency: {
    icon: AlertTriangle,
    title: 'Emergency Relief',
    subtitle: 'First responders in crisis',
    image: emergencyImage,
    description: 'Rapid response during natural disasters providing food, shelter, medical aid, and rehabilitation support.',
    stats: [
      { value: '50,000+', label: 'People Assisted' },
      { value: '25+', label: 'Disaster Responses' },
      { value: '₹35L', label: 'Invested' },
    ],
    activities: ['Disaster relief kits', 'Temporary shelters', 'Medical first aid', 'Rehabilitation support'],
    color: 'from-orange-500 to-red-500',
  },
  women: {
    icon: Users,
    title: 'Women Empowerment',
    subtitle: 'Building stronger communities',
    image: educationImage,
    description: 'Empowering women through skill training, self-help groups, and entrepreneurship development programs.',
    stats: [
      { value: '5,000+', label: 'Women Trained' },
      { value: '200+', label: 'Self-Help Groups' },
      { value: '₹20L', label: 'Invested' },
    ],
    activities: ['Skill development', 'Microfinance support', 'Leadership training', 'Legal awareness'],
    color: 'from-purple-500 to-pink-500',
  },
  children: {
    icon: Heart,
    title: 'Child Welfare',
    subtitle: 'Nurturing futures',
    image: healthcareImage,
    description: 'Comprehensive child welfare programs including nutrition, education support, and protection services.',
    stats: [
      { value: '10,000+', label: 'Children Supported' },
      { value: '50+', label: 'Centers Operated' },
      { value: '₹30L', label: 'Invested' },
    ],
    activities: ['Nutrition programs', 'Child protection', 'Early education', 'Counseling services'],
    color: 'from-pink-500 to-rose-500',
  },
};

const ProgramPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const program = programsData[programId || 'education'];

  if (!program) {
    return <div>Program not found</div>;
  }

  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-wide pb-12 px-4">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-2">{program.title}</h1>
                <p className="text-xl text-white/80">{program.subtitle}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-accent/30">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6">
              {program.stats.map((stat: any, index: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold font-serif text-foreground mb-4">About This Program</h2>
              <p className="text-lg text-muted-foreground mb-8">{program.description}</p>
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Activities</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {program.activities.map((activity: string) => (
                  <div key={activity} className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{activity}</span>
                  </div>
                ))}
              </div>
              <Link to={`/donate?program=${programId}`}>
                <Button className="btn-primary group">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate to This Program
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default ProgramPage;
