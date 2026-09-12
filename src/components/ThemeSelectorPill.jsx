import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const availableThemes = [
  { id: 'modern', label: 'Modern UI', icon: '✨' },
  { id: 'glass', label: 'Glass UI', icon: '💎' },
  { id: 'mono', label: 'Mono UI', icon: '💻' },
];

export default function ThemeSelectorPill({ currentTheme = 'modern', onThemeChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const active = availableThemes.find(t => t.id === currentTheme) || availableThemes[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 dark:border-cyan-500/30 hover:bg-cyan-500/20 dark:hover:bg-cyan-400/25 transition-all shadow-sm cursor-pointer whitespace-nowrap"
        title="Click to switch theme"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
        <span>{active.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 sm:left-0 mt-2 w-36 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 text-xs font-semibold">
          <div className="px-3 py-1 text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
            Switch Theme
          </div>
          {availableThemes.map((theme) => {
            const isSelected = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onThemeChange) {
                    onThemeChange(theme.id);
                  }
                  setOpen(false);
                }}
                className={`w-full px-3 py-1.5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left ${
                  isSelected ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{theme.icon}</span>
                  <span>{theme.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

