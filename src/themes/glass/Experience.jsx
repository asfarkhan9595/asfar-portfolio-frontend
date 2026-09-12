import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';

function formatDateRange(exp) {
  if (exp.dates) return exp.dates;
  if (!exp.start_date) return null;
  try {
    const start = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (exp.is_current || !exp.end_date) {
      return `${start} — Present`;
    }
    const end = new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} — ${end}`;
  } catch (e) {
    return exp.start_date;
  }
}

export default function Experience({ experience }) {
  const prefersReducedMotion = useReducedMotion();

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute left-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-purple-600/10" />

      <Container>
        <SectionHeading title="Experience" subtitle="My professional journey and career highlights" />
        
        <div className="relative mx-auto max-w-4xl">
          {/* Glowing Glass Axis Line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 rounded-full opacity-60 dark:opacity-40" />

          <div className="space-y-8 sm:space-y-10">
            {experience.map((exp, index) => {
              const dateRange = formatDateRange(exp);
              const techList = Array.isArray(exp.technologies) 
                ? exp.technologies 
                : (typeof exp.technologies === 'string' ? exp.technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

              return (
                <motion.div
                  key={exp.id || index}
                  className="relative pl-10 sm:pl-16 group"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Glowing Node Circle */}
                  <div className="absolute left-1.5 sm:left-[23px] top-6 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-cyan-400 bg-white dark:bg-slate-900 shadow-lg shadow-cyan-500/30 group-hover:scale-125 transition-all duration-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Glass Card */}
                  <div className="relative rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 sm:p-8 shadow-xl shadow-blue-500/5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
                    
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/40 dark:border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl font-bold capitalize tracking-tight text-slate-900 dark:text-white">
                            {exp.title}
                          </h3>
                          {exp.is_current && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md animate-pulse">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                              Present
                            </span>
                          )}
                        </div>

                        {exp.company && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <Building2 className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                            <span className="capitalize">{exp.company}</span>
                          </div>
                        )}
                      </div>

                      {/* Date & Location Meta Badges */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 sm:justify-end">
                        {dateRange && (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/50 dark:bg-slate-800/60 px-3 py-1.5 border border-white/60 dark:border-white/10 backdrop-blur-md">
                            <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                            {dateRange}
                          </span>
                        )}
                        {exp.location && (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/50 dark:bg-slate-800/60 px-3 py-1.5 border border-white/60 dark:border-white/10 backdrop-blur-md capitalize">
                            <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    {exp.description && (
                      <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>
                    )}

                    {/* Achievements List */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/40 dark:border-white/10">
                        <ul className="space-y-2">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Badges */}
                    {techList.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-white/40 dark:border-white/10">
                        {techList.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-white/50 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10 backdrop-blur-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

