import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Briefcase, TrendingUp, Users, FileText } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { icon: TrendingUp, label: 'Total Funds', value: '₹2.5 Cr' },
    { icon: Users, label: 'Beneficiaries', value: '50,000+' },
    { icon: FileText, label: 'Aid Requests', value: '45 Pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground">Staff Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 hover-lift">
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Fund Utilization (98%)</h2>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: '98%' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
