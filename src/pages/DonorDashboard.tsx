import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Heart, Download, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DonorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'donor') {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { icon: Heart, label: 'Total Donated', value: '₹25,000' },
    { icon: Users, label: 'People Helped', value: '50+' },
    { icon: Award, label: 'Certificates', value: '3' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground">Donor Dashboard</h1>
              <p className="text-muted-foreground">Thank you for your support, {user?.name}</p>
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
            <h2 className="text-xl font-semibold mb-4">Donation Certificates</h2>
            <div className="space-y-3">
              {['Education Fund - ₹10,000', 'Healthcare Camp - ₹10,000', 'Emergency Relief - ₹5,000'].map((donation) => (
                <div key={donation} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <span>{donation}</span>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              All displayed data is donor-specific and regularly updated.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
