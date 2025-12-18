import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Briefcase, TrendingUp, Users, FileText, Mail, CheckCircle, Clock } from 'lucide-react';
import { useMessages, Message } from '@/hooks/useMessages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StaffDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { messages, updateMessageStatus } = useMessages();

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { icon: TrendingUp, label: 'Total Funds', value: '₹2.5 Cr' },
    { icon: Users, label: 'Beneficiaries', value: '50,000+' },
    { icon: FileText, label: 'Aid Requests', value: '45 Pending' },
    { icon: Mail, label: 'Messages', value: messages.length.toString() },
  ];

  const getStatusBadge = (status: Message['status']) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge className="bg-green-500 text-white">Replied</Badge>;
    }
  };

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

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 hover-lift">
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Fund Utilization (98%)</h2>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: '98%' }} />
            </div>
          </div>

          {/* Messages Section */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Contact Messages</h2>
            </div>
            
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {messages.slice().reverse().map((msg) => (
                  <div key={msg.id} className="border border-border rounded-xl p-4 bg-muted/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{msg.subject}</h3>
                          {getStatusBadge(msg.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          From: {msg.name} ({msg.email})
                        </p>
                        <p className="text-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {msg.status === 'new' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateMessageStatus(msg.id, 'read')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        {msg.status === 'read' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateMessageStatus(msg.id, 'replied')}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            Mark Replied
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
