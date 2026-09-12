import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import ThemeSelectorPill from '../../components/ThemeSelectorPill';

const navItems = [
  { label: 'Start', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile, settings, onNavigate, currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    typeof window !== 'undefined' && window.location.pathname.startsWith('/blog') ? 'blog' : 'home'
  );
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const showThemeToggle = settings ? (settings.enable_dark_mode !== '0' && settings.enable_dark_mode !== false) : true;

  const initialLetter = (profile?.name || settings?.site_name || 'AK').charAt(0).toUpperCase();

  useEffect(() => {
    setLogoError(false);
  }, [settings?.site_logo]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog')) {
      setActiveSection('blog');
      return;
    }

    const sections = navItems.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);

    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      const targetPath = (href === '#blog' || id === 'blog') ? '/blog' : ('/' + href);
      if (onNavigate) {
        onNavigate(targetPath);
      } else {
        window.location.href = targetPath;
      }
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 70;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-300">
      <div className={`mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-5 rounded-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F1117]/90 dark:bg-[#0F1117]/90 bg-white/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-cyan-500/5'
          : 'bg-[#0F1117]/75 dark:bg-[#0F1117]/75 bg-white/75 backdrop-blur-lg border border-slate-200/80 dark:border-white/10 shadow-lg'
      }`}>
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="flex items-center gap-1.5 sm:gap-2.5 group text-slate-900 dark:text-white shrink min-w-0"
        >
          {settings?.site_logo && !logoError ? (
            <img 
              src={settings.site_logo} 
              alt={settings?.site_name || 'Logo'} 
              onError={() => setLogoError(true)}
              className="h-8 w-8 object-cover rounded-lg border border-cyan-500/30 shadow-sm shrink-0" 
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#151821] dark:bg-[#151821] text-cyan-400 font-mono font-bold text-xs border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shrink-0">
              {initialLetter}
            </span>
          )}
          <span className="font-mono text-xs sm:text-sm font-bold tracking-wide text-slate-900 dark:text-white truncate max-w-[90px] xs:max-w-[140px] sm:max-w-none">
            {profile?.name || settings?.site_name || 'Asfar Khan'}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-0.5 md:flex bg-[#151821]/50 dark:bg-[#151821]/50 bg-slate-100/80 p-1 rounded-full border border-slate-200 dark:border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-3 py-1.5 text-[11px] lg:text-xs font-mono font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 font-semibold bg-[#0F1117] dark:bg-[#0F1117] shadow border border-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Action & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <ThemeSelectorPill currentTheme={currentTheme} onThemeChange={onThemeChange} />
          {showThemeToggle && <ThemeToggle />}
          
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all shadow-sm whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Connect</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mt-2 mx-auto max-w-5xl rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-5 shadow-2xl md:hidden font-mono"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#151821] text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#151821]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="text-[10px] text-cyan-400">// active</span>}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
