import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Heart, Download, Users, Award, GraduationCap, Stethoscope, Droplets, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

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

  const donations = [
    { 
      id: 'DON-2024-001', 
      program: 'Education Fund', 
      amount: '₹10,000', 
      date: '2024-01-15',
      icon: GraduationCap,
      beneficiaries: [
        { name: 'Ravi Kumar', impact: 'School supplies & fees for 1 year' },
        { name: 'Priya Sharma', impact: 'School supplies & fees for 1 year' },
        { name: 'Amit Patel', impact: 'School supplies & fees for 1 year' },
      ]
    },
    { 
      id: 'DON-2024-002', 
      program: 'Healthcare Camp', 
      amount: '₹10,000', 
      date: '2024-02-20',
      icon: Stethoscope,
      beneficiaries: [
        { name: 'Sunita Devi', impact: 'Free medical checkup & medicines' },
        { name: 'Rajesh Singh', impact: 'Eye surgery' },
        { name: 'Meena Bai', impact: 'Diabetes treatment for 6 months' },
        { name: 'Gopal Das', impact: 'Heart medication for 3 months' },
      ]
    },
    { 
      id: 'DON-2024-003', 
      program: 'Emergency Relief', 
      amount: '₹5,000', 
      date: '2024-03-10',
      icon: AlertTriangle,
      beneficiaries: [
        { name: 'Flood Relief - Rampur Village', impact: '5 families received food & shelter kits' },
      ]
    },
  ];

  const generatePDF = (donation: typeof donations[0]) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(255, 140, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AidConnect Global', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Donation Certificate', 105, 32, { align: 'center' });
    
    // Body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    doc.text('This is to certify that', 105, 60, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(user?.name || 'Donor', 105, 75, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('has generously contributed to our mission', 105, 90, { align: 'center' });
    
    // Details box
    doc.setFillColor(255, 248, 240);
    doc.roundedRect(30, 100, 150, 70, 5, 5, 'F');
    
    doc.setFontSize(11);
    doc.text(`Donation ID: ${donation.id}`, 40, 115);
    doc.text(`Program: ${donation.program}`, 40, 130);
    doc.text(`Amount: ${donation.amount}`, 40, 145);
    doc.text(`Date: ${new Date(donation.date).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 40, 160);
    
    // Impact section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Impact Created:', 30, 185);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let yPos = 195;
    donation.beneficiaries.forEach((b, i) => {
      doc.text(`${i + 1}. ${b.name} - ${b.impact}`, 35, yPos);
      yPos += 8;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('This certificate is digitally generated and verified by AidConnect Global.', 105, 260, { align: 'center' });
    doc.text(`Verification Reference: ${donation.id}-${Date.now()}`, 105, 268, { align: 'center' });
    
    // Save PDF
    doc.save(`AidConnect_Certificate_${donation.id}.pdf`);
  };

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

          {/* Donation Impact Details */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Where Your Money Is Used</h2>
            <div className="space-y-6">
              {donations.map((donation) => (
                <div key={donation.id} className="border border-border rounded-xl p-5 bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <donation.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{donation.program}</h3>
                        <p className="text-sm text-muted-foreground">{donation.amount} • {new Date(donation.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={() => generatePDF(donation)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground mb-2">Beneficiaries Helped ({donation.beneficiaries.length}):</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {donation.beneficiaries.map((beneficiary, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-background rounded-lg">
                          <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{beneficiary.name}</p>
                            <p className="text-xs text-muted-foreground">{beneficiary.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
