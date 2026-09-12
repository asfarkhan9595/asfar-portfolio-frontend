import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, GitCommit } from 'lucide-react';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            // 04. EXPERIENCE & HISTORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            Pipeline Execution History
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
        </div>

        {/* Pipeline Axis */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-10 font-mono">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id || item.company_name || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Git commit node icon on axis */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0F1117] border-2 border-cyan-400 text-cyan-400 shadow-md group-hover:scale-125 transition-transform">
                <GitCommit className="w-3.5 h-3.5" />
              </div>

              {/* Experience Card */}
              <div className="rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-xl hover:border-cyan-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                      PIPELINE_STEP // 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {item.title || item.position}
                    </h3>
                    <div className="text-xs text-violet-400 font-semibold mt-0.5">
                      {item.company || item.company_name}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-[#151821] px-3 py-1 rounded-full border border-white/5 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period || item.duration || `${item.start_date} - ${item.end_date || 'Present'}`}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>

                {/* Achievements List */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {item.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies used */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[#151821] text-cyan-400 text-[10px] font-mono border border-cyan-500/20"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

