import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Briefcase, Heart, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useLanguage();
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'staff' as UserRole,
      icon: Briefcase,
      title: t('login.staff'),
      description: 'NGO staff and administrators',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'donor' as UserRole,
      icon: Heart,
      title: t('login.donor'),
      description: 'Supporters and contributors',
      color: 'from-primary to-orange-400',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      let success: boolean;
      if (isRegister) {
        success = await register(email, password, name, selectedRole);
      } else {
        success = await login(email, password, selectedRole);
      }

      if (success) {
        toast.success(isRegister ? 'Account created successfully!' : 'Welcome back!');
        onClose();
        navigate(selectedRole === 'staff' ? '/staff/dashboard' : '/donor/dashboard');
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setName('');
    setIsRegister(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => { onClose(); resetForm(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass-card p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />

            {/* Close Button */}
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative">
              {!selectedRole ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
                      {t('nav.login')}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Choose your account type to continue
                    </p>
                  </div>

                  <div className="space-y-4">
                    {roles.map((role) => (
                      <motion.button
                        key={role.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedRole(role.id)}
                        className="w-full p-4 rounded-2xl border-2 border-border hover:border-primary bg-card hover:bg-accent transition-all duration-300 text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-soft`}>
                            <role.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {role.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                  >
                    ← Back to role selection
                  </button>

                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
                      {isRegister ? 'Create Account' : t('login.signin')}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedRole === 'staff' ? t('login.staff') : t('login.donor')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="pl-10 rounded-xl"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t('login.email')}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t('login.password')}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 rounded-xl"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary h-12"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Please wait...' : (isRegister ? t('login.register') : t('login.signin'))}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {isRegister
                        ? 'Already have an account? Sign in'
                        : "Don't have an account? Register"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
