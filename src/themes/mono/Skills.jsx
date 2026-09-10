import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Skills({ categories }) {
  if (!categories || categories.length === 0) return null;

  // Check if categories is grouped (has .skills array) or a flat array of skill objects
  const isGrouped = Array.isArray(categories) && categories[0] && Array.isArray(categories[0].skills);

  const parsedCategories = isGrouped
    ? categories
    : [{ name: 'Full-Stack Technical Stack', skills: categories }];

  return (
    <section id="skills" className="py-20 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            // 02. SKILLS & STACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            Technical Stack & Architecture
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parsedCategories.map((cat, idx) => (
            <motion.div
              key={cat.id || cat.name || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold border border-cyan-500/20">
                    0{idx + 1}
                  </div>
                  <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white">
                    {cat.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {cat.skills?.length || 0} Modules
                </span>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills && cat.skills.map((skill) => (
                  <div
                    key={skill.id || skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151821] dark:bg-[#151821] bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 transition-colors"
                  >
                    {skill.icon ? (
                      <span className="text-cyan-400 text-sm">{skill.icon}</span>
                    ) : (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span>{skill.name || skill}</span>
                    {skill.proficiency && (
                      <span className="text-[10px] text-cyan-400/80 font-bold ml-1">
                        {skill.proficiency}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
