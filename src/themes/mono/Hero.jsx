import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { SocialIcon } from '../../components/Icons';

export default function Hero({ profile, settings, socialLinks }) {
  const name = profile?.name || settings?.site_name || 'Asfar Khan';

  const secondaryRolesList = Array.isArray(profile?.secondary_roles)
    ? profile.secondary_roles
    : (typeof profile?.secondary_roles === 'string' && profile.secondary_roles.trim()
      ? profile.secondary_roles.split(',').map(s => s.trim()).filter(Boolean)
      : []);

  const roles = [
    profile?.primary_role,
    ...secondaryRolesList
  ].filter(Boolean);

  const tagline = roles.length > 0
    ? roles.join(' • ')
    : (profile?.tagline || 'Backend & Full-Stack Developer • Python & AI Automation Specialist');

  const bio = profile?.bio || profile?.about || 'Building high-performance backend APIs, full-stack web applications, custom Chrome extensions, and intelligent AI automation systems.';

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-violet-500/10 dark:bg-violet-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* Tech Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 bg-cyan-50 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">{tagline}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.15]"
          >
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">{name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed font-sans"
          >
            {bio}
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-violet-400 hover:from-cyan-300 hover:to-violet-300 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-slate-900 dark:text-white bg-[#0F1117]/80 dark:bg-[#0F1117]/80 bg-white hover:bg-slate-100 dark:hover:bg-[#151821] border border-slate-300 dark:border-white/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Social Icons Bar */}
          {socialLinks && socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-3"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.id || link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-sm"
                  title={link.platform}
                >
                  <SocialIcon platform={link.platform} className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          )}

          {/* Terminal / Spec Mockup Box inspired by Monorepo theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 w-full max-w-3xl rounded-2xl bg-[#0F1117] dark:bg-[#0F1117] bg-slate-900 border border-slate-200/20 dark:border-white/10 shadow-2xl p-4 sm:p-6 text-left font-mono"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs text-slate-400">architecture-config.json</span>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                ● ACTIVE PIPELINE
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p><span className="text-cyan-400">$</span> <span className="text-violet-400">python</span> --version && <span className="text-violet-400">fastapi</span> dev</p>
              <p className="text-slate-400 text-xs">// Scalable REST APIs, Full-Stack applications & AI workflows</p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#151821] p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-cyan-400 uppercase tracking-wide font-bold">Backend Development</div>
                  <div className="text-xs text-white mt-1 font-semibold">Python, FastAPI, Laravel</div>
                </div>
                <div className="bg-[#151821] p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-violet-400 uppercase tracking-wide font-bold">Full-Stack Frontend</div>
                  <div className="text-xs text-white mt-1 font-semibold">React, Vite, Tailwind CSS</div>
                </div>
                <div className="bg-[#151821] p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wide font-bold">AI & Automation</div>
                  <div className="text-xs text-white mt-1 font-semibold">LLMs, Web Scraping, Extensions</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
