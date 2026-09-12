import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SocialLinks from '../../components/SocialLinks';

const codeLines = [
  { prefix: '>', key: 'role', value: '"python_developer"', color: 'text-amber-300' },
  { prefix: '>', key: 'ai_automation', value: 'true', color: 'text-cyan-300' },
  { prefix: '>', key: 'backend', value: '["laravel", "rest_api", "mysql"]', color: 'text-amber-300' },
  { prefix: '>', key: 'browser', value: '["chrome_extensions"]', color: 'text-amber-300' },
  { prefix: '>', key: 'status', value: '"open_to_opportunities"', color: 'text-emerald-300' },
];

function TypedCodeLine({ line, delay, prefersReducedMotion }) {
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? line.key + ': ' + line.value : '');
  const fullText = line.key + ': ' + line.value;
  const [showCursor, setShowCursor] = useState(!prefersReducedMotion);
  const [started, setStarted] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay, prefersReducedMotion]);

  useEffect(() => {
    if (!started || prefersReducedMotion) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 600);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [started, fullText, prefersReducedMotion]);

  if (!started && !prefersReducedMotion) return <div className="h-6" />;

  return (
    <div className="code-line flex items-center gap-1" style={{ animationDelay: `${delay}ms` }}>
      <span className="text-cyan-400">{line.prefix}</span>
      <span className="text-slate-400">{displayed.split(':')[0]}</span>
      {displayed.includes(':') && (
        <>
          <span className="text-slate-500">:</span>
          <span className={line.color}>{displayed.split(':').slice(1).join(':')}</span>
        </>
      )}
      {showCursor && started && <span className="typing-cursor" />}
    </div>
  );
}

export default function Hero({ profile, settings, socialLinks = [] }) {
  const prefersReducedMotion = useReducedMotion();

  const formatSnake = (str) => {
    if (!str) return '';
    return str.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
  };

  const primaryRoleVal = profile?.primary_role
    ? `"${formatSnake(profile.primary_role)}"`
    : '"python_developer"';

  const secondaryRolesList = Array.isArray(profile?.secondary_roles)
    ? profile.secondary_roles
    : (typeof profile?.secondary_roles === 'string' && profile.secondary_roles.trim()
      ? profile.secondary_roles.split(',').map(s => s.trim()).filter(Boolean)
      : []);

  const secondaryRolesVal = secondaryRolesList.length > 0
    ? `[${secondaryRolesList.map(r => `"${formatSnake(r)}"`).join(', ')}]`
    : null;

  const dynamicCodeLines = [
    { prefix: '>', key: 'role', value: primaryRoleVal, color: 'text-amber-300' },
    ...(secondaryRolesVal
      ? [{ prefix: '>', key: 'secondary_roles', value: secondaryRolesVal, color: 'text-amber-300' }]
      : []),
    { prefix: '>', key: 'ai_automation', value: 'true', color: 'text-cyan-300' },
    { prefix: '>', key: 'backend', value: '["laravel", "rest_api", "mysql"]', color: 'text-amber-300' },
    { prefix: '>', key: 'browser', value: '["chrome_extensions"]', color: 'text-amber-300' },
    { prefix: '>', key: 'status', value: '"open_to_opportunities"', color: 'text-emerald-300' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const codeVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, x: 30, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-20 overflow-hidden">
      {/* Decorative ambient glass mesh orbs */}
      <div className="pointer-events-none absolute left-10 top-20 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-cyan-500/15 animate-pulse-glow" />
      <div className="pointer-events-none absolute right-10 bottom-20 -z-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-600/15 animate-float-delayed" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 -z-10 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl dark:bg-pink-500/10 animate-float" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:border-cyan-500/30 dark:bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-cyan-400 backdrop-blur-md shadow-sm">
                <Sparkles className="h-4 w-4 text-blue-500 dark:text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                {profile?.primary_role || 'Python & AI Automation Developer'}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Hi, I'm {profile?.name}
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {profile?.hero_supporting_text}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 text-base shadow-lg shadow-blue-500/25 border border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                View My Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={profile?.resume_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-medium px-5 py-3 text-base border border-white/80 dark:border-white/10 backdrop-blur-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>

              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-medium px-5 py-3 text-base border border-white/80 dark:border-white/10 backdrop-blur-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialLinks socialLinks={socialLinks} />
            </motion.div>
          </motion.div>

          {/* Right Side — Frosted Glass Code Showcase */}
          <motion.div
            variants={codeVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <div className="group relative">
              {/* Outer ambient glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-2xl transition-all duration-500 group-hover:blur-3xl opacity-80" />

              <div className="relative overflow-hidden rounded-2xl border border-white/70 dark:border-white/15 bg-white/60 dark:bg-slate-900/65 backdrop-blur-2xl shadow-2xl shadow-blue-500/10">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-white/50 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 px-4 py-3 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-blue-500 dark:text-cyan-400" />
                    ~/asfar-khan/config.py
                  </span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-loose">
                  {dynamicCodeLines.map((line, i) => (
                    <TypedCodeLine
                      key={line.key}
                      line={line}
                      delay={800 + i * 500}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ))}
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between border-t border-white/50 dark:border-white/10 bg-white/30 dark:bg-slate-800/30 px-4 py-2 text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Python 3.12 (Glass Engine)</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-500">UTF-8</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

