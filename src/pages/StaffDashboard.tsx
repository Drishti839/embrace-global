import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { 
  Briefcase, TrendingUp, Users, FileText, Mail, CheckCircle, Clock, 
  Download, Eye, XCircle, ChevronRight, Shield, PieChart, Wallet,
  GraduationCap, Heart, Sprout, AlertTriangle, Settings, IndianRupee
} from 'lucide-react';
import { useMessages, Message } from '@/hooks/useMessages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock data for the dashboard
const programAllocations = [
  { id: 1, name: 'Education', icon: GraduationCap, amount: 850000, percentage: 34, color: 'bg-blue-500' },
  { id: 2, name: 'Healthcare', icon: Heart, amount: 625000, percentage: 25, color: 'bg-rose-500' },
  { id: 3, name: 'Livelihood', icon: Sprout, amount: 500000, percentage: 20, color: 'bg-emerald-500' },
  { id: 4, name: 'Disaster Relief', icon: AlertTriangle, amount: 375000, percentage: 15, color: 'bg-amber-500' },
  { id: 5, name: 'Admin', icon: Settings, amount: 150000, percentage: 6, color: 'bg-slate-500' },
];

const recentTransactions = [
  { id: 'TXN001', donor: 'Rajesh Kumar', amount: 50000, category: 'Education', date: '2024-01-15', method: 'UPI', status: 'Completed' },
  { id: 'TXN002', donor: 'Priya Sharma', amount: 25000, category: 'Healthcare', date: '2024-01-14', method: 'Card', status: 'Completed' },
  { id: 'TXN003', donor: 'Anonymous', amount: 100000, category: 'Disaster Relief', date: '2024-01-13', method: 'Net Banking', status: 'Completed' },
  { id: 'TXN004', donor: 'Amit Patel', amount: 15000, category: 'Livelihood', date: '2024-01-12', method: 'UPI', status: 'Pending' },
  { id: 'TXN005', donor: 'Sneha Reddy', amount: 75000, category: 'Education', date: '2024-01-11', method: 'Card', status: 'Completed' },
];

const aidRequests = [
  { id: 'AID001', name: 'School Supplies for Rural Children', category: 'Education', date: '2024-01-15', amount: 125000, status: 'Pending', beneficiary: 'Rural Education Trust' },
  { id: 'AID002', name: 'Medical Camp Equipment', category: 'Healthcare', date: '2024-01-14', amount: 75000, status: 'Approved', beneficiary: 'Community Health Center' },
  { id: 'AID003', name: 'Flood Relief Materials', category: 'Disaster Relief', date: '2024-01-13', amount: 200000, status: 'Approved', beneficiary: 'Disaster Management Cell' },
  { id: 'AID004', name: 'Skill Training Workshop', category: 'Livelihood', date: '2024-01-12', amount: 45000, status: 'Rejected', beneficiary: 'Youth Empowerment NGO' },
  { id: 'AID005', name: 'Digital Learning Tablets', category: 'Education', date: '2024-01-11', amount: 180000, status: 'Pending', beneficiary: 'Tech4Education Foundation' },
];

const StaffDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { messages, updateMessageStatus } = useMessages();
  const [activeTab, setActiveTab] = useState('fund-management');
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showAidDialog, setShowAidDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof recentTransactions[0] | null>(null);
  const [selectedAid, setSelectedAid] = useState<typeof aidRequests[0] | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  const complianceScore = 94;
  const totalFunds = 2500000;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending</Badge>;
      case 'Approved':
      case 'Completed':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{status}</Badge>;
      case 'Rejected':
        return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMessageStatusBadge = (status: Message['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30">New</Badge>;
      case 'read':
        return <Badge className="bg-slate-500/20 text-slate-400 border border-slate-500/30">Read</Badge>;
      case 'replied':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Replied</Badge>;
    }
  };

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Donor', 'Amount', 'Category', 'Date', 'Method', 'Status'];
    const csvContent = [
      headers.join(','),
      ...recentTransactions.map(t => 
        [t.id, t.donor, t.amount, t.category, t.date, t.method, t.status].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  const filteredTransactions = selectedProgram 
    ? recentTransactions.filter(t => t.category === selectedProgram)
    : recentTransactions;

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <Navbar />
      <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                <Briefcase className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
            </div>
          </div>

          {/* Compliance Score Card */}
          <div 
            onClick={() => setShowComplianceDialog(true)}
            className="mb-8 p-6 rounded-2xl glass-card hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Compliance Score</p>
                  <p className="text-4xl font-bold text-foreground">{complianceScore}%</p>
                  <p className="text-emerald-600 text-sm">System Health: Excellent</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Wallet, label: 'Total Funds', value: '₹25 Lakh', color: 'from-blue-500 to-blue-600' },
              { icon: Users, label: 'Beneficiaries', value: '50,000+', color: 'from-emerald-500 to-emerald-600' },
              { icon: FileText, label: 'Aid Requests', value: '45 Pending', color: 'from-amber-500 to-amber-600' },
              { icon: Mail, label: 'Messages', value: messages.length.toString(), color: 'from-rose-500 to-rose-600' },
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-2xl glass-card hover-lift transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full bg-card border border-border p-1 rounded-xl">
              <TabsTrigger 
                value="fund-management" 
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Fund Management
              </TabsTrigger>
              <TabsTrigger 
                value="program-allocation"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Program Allocation
              </TabsTrigger>
              <TabsTrigger 
                value="aid-requests"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                <FileText className="w-4 h-4 mr-2" />
                Aid Requests
              </TabsTrigger>
            </TabsList>

            {/* Fund Management Tab */}
            <TabsContent value="fund-management" className="space-y-6">
              {/* Fund Utilization */}
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Fund Utilization</h2>
                  <span className="text-emerald-600 font-semibold">98%</span>
                </div>
                <Progress value={98} className="h-3 bg-muted" />
                <p className="text-muted-foreground text-sm mt-2">₹24.5 Lakh utilized out of ₹25 Lakh</p>
              </div>

              {/* Transactions Table */}
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={exportToCSV}
                    className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Donor</TableHead>
                        <TableHead className="text-muted-foreground">Amount</TableHead>
                        <TableHead className="text-muted-foreground">Category</TableHead>
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((txn) => (
                        <TableRow 
                          key={txn.id} 
                          className="border-border hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedTransaction(txn);
                            setShowTransactionDialog(true);
                          }}
                        >
                          <TableCell className="text-foreground font-medium">{txn.donor}</TableCell>
                          <TableCell className="text-emerald-600">₹{txn.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-muted-foreground">{txn.category}</TableCell>
                          <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                          <TableCell>{getStatusBadge(txn.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Messages Section */}
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Contact Messages</h2>
                </div>
                
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.slice().reverse().map((msg) => (
                      <div key={msg.id} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{msg.subject}</h3>
                              {getMessageStatusBadge(msg.status)}
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
                                className="border-border text-muted-foreground hover:bg-muted"
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
                                className="border-border text-muted-foreground hover:bg-muted"
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
            </TabsContent>

            {/* Program Allocation Tab */}
            <TabsContent value="program-allocation" className="space-y-6">
              <div className="p-6 rounded-2xl glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Fund Distribution by Program</h2>
                  <p className="text-muted-foreground">Total: ₹{(totalFunds / 100000).toFixed(1)} Lakh</p>
                </div>
                <div className="space-y-4">
                  {programAllocations.map((program) => (
                    <div 
                      key={program.id}
                      onClick={() => {
                        setSelectedProgram(program.name);
                        setActiveTab('fund-management');
                      }}
                      className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${program.color} flex items-center justify-center`}>
                            <program.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{program.name}</p>
                            <p className="text-sm text-muted-foreground">₹{(program.amount / 100000).toFixed(1)} Lakh</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-foreground">{program.percentage}%</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                      <Progress value={program.percentage} className="h-2 bg-muted" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Distribution */}
              <div className="p-6 rounded-2xl glass-card">
                <h2 className="text-xl font-semibold text-foreground mb-6">Allocation Overview</h2>
                <div className="flex items-center gap-2 h-8 rounded-lg overflow-hidden">
                  {programAllocations.map((program) => (
                    <div 
                      key={program.id}
                      className={`${program.color} h-full transition-all hover:opacity-80`}
                      style={{ width: `${program.percentage}%` }}
                      title={`${program.name}: ${program.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {programAllocations.map((program) => (
                    <div key={program.id} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${program.color}`} />
                      <span className="text-sm text-muted-foreground">{program.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Aid Requests Tab */}
            <TabsContent value="aid-requests" className="space-y-4">
              {aidRequests.map((request) => (
                <div 
                  key={request.id}
                  className={`p-5 rounded-2xl glass-card transition-all cursor-pointer ${
                    request.status === 'Pending' 
                      ? 'border-amber-500/30 hover:border-amber-500/50' 
                      : 'hover:border-primary/30'
                  }`}
                  onClick={() => {
                    setSelectedAid(request);
                    setShowAidDialog(true);
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{request.name}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>ID: {request.id}</span>
                        <span>Category: {request.category}</span>
                        <span>Date: {request.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">Beneficiary: {request.beneficiary}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">₹{request.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Requested Amount</p>
                      </div>
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle approve
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-rose-500/50 text-rose-500 hover:bg-rose-500/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle reject
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Compliance Dialog */}
      <Dialog open={showComplianceDialog} onOpenChange={setShowComplianceDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-600" />
              Compliance Breakdown
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detailed compliance metrics and system health
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Aid Requests Processed</span>
                <span className="text-emerald-600 font-semibold">47/50</span>
              </div>
              <Progress value={94} className="h-2 bg-muted" />
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Transactions Completed</span>
                <span className="text-emerald-600 font-semibold">98/100</span>
              </div>
              <Progress value={98} className="h-2 bg-muted" />
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Documentation Complete</span>
                <span className="text-emerald-600 font-semibold">92%</span>
              </div>
              <Progress value={92} className="h-2 bg-muted" />
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Audit Compliance</span>
                <span className="text-emerald-600 font-semibold">95%</span>
              </div>
              <Progress value={95} className="h-2 bg-muted" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Dialog */}
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <IndianRupee className="w-6 h-6 text-primary" />
              Transaction Details
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Transaction ID</p>
                  <p className="text-foreground font-semibold">{selectedTransaction.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Donor</p>
                  <p className="text-foreground font-semibold">{selectedTransaction.donor}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Amount</p>
                  <p className="text-emerald-600 font-semibold">₹{selectedTransaction.amount.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Category</p>
                  <p className="text-foreground font-semibold">{selectedTransaction.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Payment Method</p>
                  <p className="text-foreground font-semibold">{selectedTransaction.method}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50 col-span-2">
                  <p className="text-muted-foreground text-sm">Date</p>
                  <p className="text-foreground font-semibold">{selectedTransaction.date}</p>
                </div>
              </div>
              <Button className="w-full btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Aid Request Detail Dialog */}
      <Dialog open={showAidDialog} onOpenChange={setShowAidDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Aid Request Details
            </DialogTitle>
          </DialogHeader>
          {selectedAid && (
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <h3 className="text-foreground font-semibold text-lg mb-2">{selectedAid.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedAid.status)}
                  <span className="text-muted-foreground text-sm">ID: {selectedAid.id}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Category</p>
                  <p className="text-foreground font-semibold">{selectedAid.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Request Date</p>
                  <p className="text-foreground font-semibold">{selectedAid.date}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Beneficiary</p>
                  <p className="text-foreground font-semibold">{selectedAid.beneficiary}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">Requested Amount</p>
                  <p className="text-emerald-600 font-semibold">₹{selectedAid.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-muted-foreground text-sm mb-2">Linked Funding Sources</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">General Fund</span>
                    <span className="text-foreground">60%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Program-Specific Fund</span>
                    <span className="text-foreground">40%</span>
                  </div>
                </div>
              </div>
              {selectedAid.status === 'Pending' && (
                <div className="flex gap-3">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" className="flex-1 border-rose-500/50 text-rose-500 hover:bg-rose-500/20">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <ChatbotWidget />
    </div>
  );
};

export default StaffDashboard;
