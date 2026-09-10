import { motion } from 'framer-motion';
import { Terminal, Cpu, Code2, Layers, CheckCircle2, Server, Globe } from 'lucide-react';

export default function About({ profile }) {
  const bio = profile?.bio || profile?.about || 'Backend & Full-Stack Developer specializing in Python, Laravel REST APIs, AI Automation, and modern web applications.';
  const aboutMe = profile?.about_me || profile?.about || bio;

  const primaryRole = profile?.primary_role || 'Backend & Full-Stack Developer';
  const roleSlug = primaryRole.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  const stackTags = profile?.skills || profile?.top_skills || ['Python', 'FastAPI', 'Laravel', 'React', 'MySQL', 'AI Automation'];

  const features = [
    {
      icon: Server,
      title: 'Backend API Engineering',
      description: 'Building robust, high-performance RESTful APIs & microservices using Python FastAPI, Laravel PHP, MySQL, and Redis.',
    },
    {
      icon: Globe,
      title: 'Full-Stack Web Development',
      description: 'Crafting responsive end-to-end web applications with React, Vite, Tailwind CSS, and seamless API integrations.',
    },
    {
      icon: Cpu,
      title: 'AI Agents & Automation',
      description: 'Designing intelligent scrapers, custom AI agent workflows, OpenAI API integrations, and automated pipeline runners.',
    },
    {
      icon: Layers,
      title: 'Chrome Extensions & Bots',
      description: 'Creating custom browser extensions, DOM manipulators, data extraction scripts, and automated web bots.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            // 01. ABOUT ME
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            System Architecture & Background
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
        </div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Bio text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>whoami // {roleSlug}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {aboutMe}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {stackTags.map((tech) => {
                  const tagText = typeof tech === 'object' ? tech.name : tech;
                  return (
                    <span
                      key={tagText}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#151821] dark:bg-[#151821] bg-slate-100 text-cyan-400 dark:text-cyan-400 border border-cyan-500/20"
                    >
                      #{tagText}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono">
              <div className="bg-[#151821] dark:bg-[#151821] bg-slate-50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {profile?.experience_years ? `${profile.experience_years}+ YRS` : '100%'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-1">
                  {profile?.experience_years ? 'EXPERIENCE' : 'CODE QUALITY'}
                </div>
              </div>
              <div className="bg-[#151821] dark:bg-[#151821] bg-slate-50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                <div className="text-2xl font-bold text-violet-400">
                  {profile?.projects_completed ? `${profile.projects_completed}+` : '24/7'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mt-1">
                  {profile?.projects_completed ? 'PROJECTS DONE' : 'RELIABILITY'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-5 hover:border-cyan-500/40 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>MODULE_0{index + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
