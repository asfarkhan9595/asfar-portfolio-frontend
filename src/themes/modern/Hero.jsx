import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SocialLinks from '../../components/SocialLinks';

const codeLines = [
  { prefix: '>', key: 'role', value: '"python_developer"', color: 'text-amber-300' },
  { prefix: '>', key: 'ai_automation', value: 'true', color: 'text-blue-400' },
  { prefix: '>', key: 'backend', value: '["laravel", "rest_api", "mysql"]', color: 'text-amber-300' },
  { prefix: '>', key: 'browser', value: '["chrome_extensions"]', color: 'text-amber-300' },
  { prefix: '>', key: 'status', value: '"open_to_opportunities"', color: 'text-emerald-400' },
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
      <span className="text-emerald-500">{line.prefix}</span>
      <span className="text-slate-500">{displayed.split(':')[0]}</span>
      {displayed.includes(':') && (
        <>
          <span className="text-slate-600">:</span>
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
    { prefix: '>', key: 'ai_automation', value: 'true', color: 'text-blue-400' },
    { prefix: '>', key: 'backend', value: '["laravel", "rest_api", "mysql"]', color: 'text-amber-300' },
    { prefix: '>', key: 'browser', value: '["chrome_extensions"]', color: 'text-amber-300' },
    { prefix: '>', key: 'status', value: '"open_to_opportunities"', color: 'text-emerald-400' },
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
    <section id="home" className="relative flex min-h-screen items-center pt-16 overflow-hidden">
      <div className="gradient-orb animate-float absolute left-1/4 top-1/4 -z-10 h-64 w-64 bg-emerald-500/10 dark:bg-emerald-500/5" />
      <div className="gradient-orb animate-float-delayed absolute bottom-1/4 right-1/3 -z-10 h-48 w-48 bg-teal-500/8 dark:bg-teal-500/[0.03]" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile?.primary_role || 'Python & AI Automation Developer'}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm {profile?.name}
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {profile?.hero_supporting_text}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                href="#projects"
                icon={ArrowRight}
                onClick={handleProjectsClick}
                className="btn-shimmer"
              >
                View My Projects
              </Button>
              <Button
                variant="secondary"
                href={profile?.resume_url || '#'} target='_blank'
                icon={Download}
              >
                Download Resume
              </Button>
              <Button
                variant="secondary"
                href="#contact"
                onClick={handleContactClick}
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialLinks socialLinks={socialLinks} />
            </motion.div>
          </motion.div>

          <motion.div
            variants={codeVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-500/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/80">
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-500">~/asfar-khan/config.py</span>
                </div>

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

                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-1.5 text-xs dark:border-slate-700/50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-500">Python 3.12</span>
                  </div>
                  <span className="text-slate-500">UTF-8</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

