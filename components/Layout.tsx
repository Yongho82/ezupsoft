
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, MonitorPlay, FileText, Crop, Globe, LogOut, Loader2, ChevronDown, MessageCircle } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../types';
import { LegalModal } from './LegalModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
  }, [location]);

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
        // Fetch user info using the access token
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await response.json();
        
        // Update Auth Context
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isMobileMenuOpen && 'rounded-br-[30px]'} ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-md' : 'bg-black border-b border-white/5 py-4'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo (Left) */}
          <div className="flex-shrink-0 w-48">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-[#6C5CE7] flex items-center justify-center shadow-lg shadow-purple-500/20 transition-all group-hover:scale-105">
                <Terminal className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">EZUP<span className="text-[#6C5CE7]">.</span></span>
            </NavLink>
          </div>

          {/* Navigation (Center) */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-10">
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

          {/* Right Actions (Language + Auth) */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 min-w-[200px]">
            <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 text-white font-bold text-sm transition-colors"
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
            
            {/* Contact Link */}
            <NavLink 
               to="/contact"
               className={({ isActive }) => 
                 `flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-sm transition-colors ${isActive ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' : 'hover:bg-white/10 text-white'}`
               }
            >
               <MessageCircle size={18} />
               <span>{t('nav.contact')}</span>
            </NavLink>

            {user ? (
               <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-600" />
                  <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 rounded-full transition-colors">
                    <LogOut size={18} />
                  </button>
               </div>
            ) : (
              <Button onClick={() => googleLogin()} variant="primary" size="sm" className="bg-[#6C5CE7] font-bold shadow-none border-none text-white hover:bg-[#5a4bd4]" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : t('nav.login')}
              </Button>
            )}
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-4 shadow-xl max-h-[80vh] overflow-y-auto rounded-b-[30px]">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="flex items-center gap-3 p-3 text-white font-bold hover:bg-white/5 rounded-lg">
                <link.icon size={20} />
                {link.name}
              </NavLink>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <NavLink 
              to="/contact"
              className="flex items-center gap-3 p-3 text-white font-bold w-full text-left hover:bg-white/5 rounded-lg"
            >
               <MessageCircle size={20} />
               {t('nav.contact')}
            </NavLink>
            <div className="h-px bg-white/10 my-2" />
            <div className="grid grid-cols-2 gap-2 p-2">
              {languages.map(lang => (
                <button 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 rounded-lg text-sm text-left font-medium ${language === lang.code ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' : 'text-slate-300 hover:bg-white/5'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            {user ? (
              <button onClick={logout} className="w-full mt-4 p-3 bg-red-900/20 text-red-400 rounded-lg font-bold hover:bg-red-900/30">{t('nav.logout')}</button>
            ) : (
              <Button onClick={() => googleLogin()} variant="primary" className="w-full mt-4 justify-center bg-[#6C5CE7] text-white">{t('nav.login')}</Button>
            )}
          </nav>
        </div>
      )}
    </header>
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
  const isAppPage = location.pathname.endsWith('/app') || location.pathname === '/contact';
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
