
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, MonitorPlay, FileText, Crop, Globe, LogOut, Loader2, ChevronDown, MessageCircle, ChevronRight, User } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../types';
import { LegalModal } from './LegalModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls the Side Drawer
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, login, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangDropdownOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Google Login Hook
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await response.json();
        
        login({
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const languages: { code: Language, label: string }[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '简体中文' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];

  const navLinks = [
    { name: t('nav.html'), path: '/live-html', icon: MonitorPlay },
    { name: t('nav.pdf'), path: '/live-pdf', icon: FileText },
    { name: t('nav.catch'), path: '/catch-capture', icon: Crop },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-bl-[30px] rounded-br-[30px] md:rounded-bl-none md:rounded-br-[50px] ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-md' : 'bg-black border-b border-white/5 py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo (Left) */}
            <div className="flex-shrink-0 w-auto md:w-48 relative z-50">
              <NavLink to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#6C5CE7] flex items-center justify-center shadow-lg shadow-purple-500/20 transition-all group-hover:scale-105">
                  <Terminal className="text-white" size={16} />
                </div>
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">EZUP<span className="text-[#6C5CE7]">.</span></span>
              </NavLink>
            </div>

            {/* Navigation (Center - Desktop Only) */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center gap-2 text-[15px] font-bold transition-all duration-200 ${isActive ? 'text-[#6C5CE7]' : 'text-slate-300 hover:text-white'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions (Language + Auth + Menu Button) */}
            <div className="flex-shrink-0 flex items-center justify-end gap-2 md:gap-3 md:min-w-[200px]">
              
              {/* Language Selector (Desktop) */}
              <div className="relative hidden md:block" ref={langRef}>
                  <button 
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 text-white font-bold text-[15px] transition-colors"
                  >
                    <Globe size={18} />
                    <span className="uppercase">{language}</span>
                    <ChevronDown size={14} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLangDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${language === lang.code ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
              
              {/* Contact Link (Desktop) */}
              <NavLink 
                 to="/contact"
                 className={({ isActive }) => 
                   `hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-[15px] transition-colors ${isActive ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' : 'hover:bg-white/10 text-white'}`
                 }
              >
                 <MessageCircle size={18} />
                 <span>{t('nav.contact')}</span>
              </NavLink>

              {/* Auth Buttons */}
              {user ? (
                 <div className="hidden md:flex items-center gap-2">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-600" />
                    <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 rounded-full transition-colors">
                      <LogOut size={18} />
                    </button>
                 </div>
              ) : (
                <Button onClick={() => googleLogin()} variant="primary" size="sm" className="hidden md:flex bg-[#6C5CE7] font-bold shadow-none border-none text-white hover:bg-[#5a4bd4]" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" size={16} /> : t('nav.login')}
                </Button>
              )}

              {/* Full Menu Toggle Button (Visible on ALL screens) */}
              <button 
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors z-50 relative" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Drawer (Slide-in from Right) */}
      <div 
        className={`fixed inset-0 z-[60] transition-visibility duration-300 ${isMenuOpen ? 'visible' : 'invisible delay-300'}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-slate-900 border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
            
            {/* Mobile User Profile Section */}
            <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                {user ? (
                   <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[#6C5CE7]" />
                      <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">{user.name}</p>
                          <p className="text-slate-400 text-xs truncate">{user.email}</p>
                      </div>
                      <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                          <LogOut size={18} />
                      </button>
                   </div>
                ) : (
                   <div className="text-center">
                      <p className="text-slate-400 text-xs mb-3">Login to save your progress</p>
                      <Button onClick={() => googleLogin()} variant="primary" className="w-full bg-[#6C5CE7] text-white font-bold text-sm py-2">
                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : t('nav.login')}
                      </Button>
                   </div>
                )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 flex-1">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Menu</p>
               {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    className={({ isActive }) => 
                       `flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-[#6C5CE7] text-white shadow-lg shadow-purple-900/50' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                    }
                  >
                    <div className="flex items-center gap-3 font-bold text-sm">
                       <link.icon size={18} />
                       {link.name}
                    </div>
                    <ChevronRight size={14} className="opacity-50" />
                  </NavLink>
               ))}

               <div className="h-px bg-white/10 my-4" />
               
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Support</p>
               <NavLink 
                  to="/contact"
                  className={({ isActive }) => 
                     `flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-[#6C5CE7] text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                  }
               >
                  <div className="flex items-center gap-3 font-bold text-sm">
                     <MessageCircle size={18} />
                     {t('nav.contact')}
                  </div>
               </NavLink>

               <div className="h-px bg-white/10 my-4" />

               {/* Language Selector (Mobile Styled) */}
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Language</p>
               <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                        language === lang.code 
                          ? 'bg-[#6C5CE7]/20 text-[#6C5CE7] border border-[#6C5CE7]/30' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
               </div>
            </nav>

            <div className="mt-6 text-center">
               <p className="text-slate-600 text-[10px]">
                 © 2024 EZUP. All rights reserved.
               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#6C5CE7] flex items-center justify-center">
               <Terminal className="text-white" size={16} />
            </div>
            <span className="text-xl font-bold text-slate-900">EZUP.</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onOpenLegal('terms')}
              className="text-sm font-medium text-slate-500 hover:text-[#6C5CE7] transition-colors"
            >
              {t('footer.terms')}
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')}
              className="text-sm font-bold text-slate-700 hover:text-[#6C5CE7] transition-colors"
            >
              {t('footer.privacy')}
            </button>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col items-center">
          <p className="text-slate-400 text-sm text-center">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p className="text-slate-300 text-xs mt-2 text-center max-w-lg mx-auto">
            EZUP is a project for demo purposes. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAppPage = location.pathname.endsWith('/app');
  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Header />
      <main className={`flex-grow flex flex-col pt-[80px] ${isAppPage ? 'h-screen overflow-hidden !pt-[72px]' : 'w-full'}`}>
        {children}
      </main>
      {!isAppPage && <Footer onOpenLegal={setActiveLegalDoc} />}
      
      {activeLegalDoc && (
        <LegalModal 
          type={activeLegalDoc} 
          onClose={() => setActiveLegalDoc(null)} 
        />
      )}
    </div>
  );
};
