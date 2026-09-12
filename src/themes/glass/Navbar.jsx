import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import ThemeSelectorPill from '../../components/ThemeSelectorPill';

const navItems = [
  { label: 'Home', href: '#home' },
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

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-3 py-2 sm:py-3 transition-all duration-300">
      <div className={`mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:px-6 rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg shadow-blue-500/5 dark:shadow-cyan-500/10'
          : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-white/5'
      }`}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-2.5 py-1 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm backdrop-blur-md hover:border-cyan-500/30 transition-all group shrink min-w-0 max-w-[70%] sm:max-w-none"
        >
          {settings?.site_logo && !logoError ? (
            <img 
              src={settings.site_logo} 
              alt={settings?.site_name || 'Logo'} 
              onError={() => setLogoError(true)}
              className="h-7 w-7 object-cover rounded-lg border border-white/60 dark:border-white/20 shadow-sm group-hover:scale-105 transition-transform shrink-0" 
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-xs font-extrabold text-white shadow-md shadow-blue-500/20 shrink-0">
              {(profile?.name || settings?.site_name || 'AK').charAt(0).toUpperCase()}
            </span>
          )}
          <span className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-cyan-200 dark:to-blue-300 bg-clip-text text-transparent drop-shadow-sm truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">
              {profile?.name || settings?.site_name || 'Asfar Khan'}
            </span>
            <ThemeSelectorPill currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </span>
        </a>

        {/* Navigation Items */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSectionGlass"
                    className="absolute inset-0 rounded-xl bg-blue-500/10 dark:bg-cyan-500/15 border border-blue-500/20 dark:border-cyan-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle showToggle={showThemeToggle} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 text-slate-700 md:hidden dark:text-slate-300 backdrop-blur-md shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="mt-2 mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-blue-500/15 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 font-semibold border border-blue-500/20 dark:border-cyan-500/30'
                      : 'text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

