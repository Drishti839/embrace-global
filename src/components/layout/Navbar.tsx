import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, MessageCircle, Heart } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LoginModal from '@/components/modals/LoginModal';
import { Link, useLocation } from 'react-router-dom';
import hopeHandsLogo from '@/assets/hopehands-logo.jpg';
const languages: {
  code: Language;
  name: string;
  native: string;
}[] = [{
  code: 'en',
  name: 'English',
  native: 'English'
}, {
  code: 'mr',
  name: 'Marathi',
  native: 'मराठी'
}, {
  code: 'hi',
  name: 'Hindi',
  native: 'हिंदी'
}, {
  code: 'te',
  name: 'Telugu',
  native: 'తెలుగు'
}, {
  code: 'ml',
  name: 'Malayalam',
  native: 'മലയാളം'
}, {
  code: 'ta',
  name: 'Tamil',
  native: 'தமிழ்'
}, {
  code: 'bn',
  name: 'Bengali',
  native: 'বাংলা'
}, {
  code: 'or',
  name: 'Odia',
  native: 'ଓଡ଼ିଆ'
}];
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const location = useLocation();
  const navItems = [{
    key: 'nav.home',
    href: '/'
  }, {
    key: 'nav.about',
    href: '/about'
  }, {
    key: 'nav.programs',
    href: '/programs'
  }, {
    key: 'nav.impact',
    href: '/impact'
  }, {
    key: 'nav.chatbot',
    href: '/chatbot'
  }, {
    key: 'nav.contact',
    href: '/contact'
  }];
  return <>
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-wide">
          <div className="flex items-center justify-between h-20 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div whileHover={{
              scale: 1.05
            }} className="w-12 h-12 rounded-xl overflow-hidden shadow-glow">
                <img alt="Hope Hands Logo" className="w-full h-full object-cover" src="/lovable-uploads/f3afffaa-6720-4e64-91a9-7e141247f658.jpg" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold font-serif text-foreground">Hope Hands</h1>
                <p className="text-xs text-muted-foreground">Global</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map(item => <Link key={item.key} to={item.href} className={`relative text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href ? 'text-primary' : 'text-foreground'}`}>
                  {t(item.key)}
                  {location.pathname === item.href && <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </Link>)}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Globe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  {languages.map(lang => <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={language === lang.code ? 'bg-primary/10' : ''}>
                      <span className="mr-2">{lang.native}</span>
                      <span className="text-muted-foreground text-xs">({lang.name})</span>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Donate Button */}
              <Link to="/donate">
                <Button className="hidden sm:flex btn-primary">
                  <Heart className="w-4 h-4 mr-2" />
                  {t('nav.donate')}
                </Button>
              </Link>

              {/* User Menu */}
              {isAuthenticated ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-xl gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card">
                    <DropdownMenuItem asChild>
                      <Link to={user?.role === 'staff' ? '/staff/dashboard' : '/donor/dashboard'}>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> : <Button variant="outline" className="rounded-xl gap-2" onClick={() => setShowLogin(true)}>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('nav.login')}</span>
                </Button>}

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="lg:hidden border-t border-border/50">
              <div className="container-wide py-4 px-4 space-y-2">
                {navItems.map(item => <Link key={item.key} to={item.href} onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-xl text-foreground hover:bg-primary/10 transition-colors">
                    {t(item.key)}
                  </Link>)}
                <Link to="/donate" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-xl gradient-primary text-primary-foreground text-center font-semibold">
                  {t('nav.donate')}
                </Link>
              </div>
            </motion.div>}
        </AnimatePresence>
      </motion.nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>;
};
export default Navbar;