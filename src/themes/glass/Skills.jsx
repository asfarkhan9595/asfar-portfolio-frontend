import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import { Code2, Terminal } from 'lucide-react';

export default function Skills({ categories }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-10 top-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-blue-600/10" />

      <Container>
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies, frameworks, and AI automation tools I work with."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories && categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="group rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 backdrop-blur-2xl shadow-xl shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-500/10"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 p-3 text-cyan-500 border border-cyan-500/20 backdrop-blur-md">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills && category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex cursor-default items-center gap-1.5 rounded-xl bg-white/50 dark:bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/80 dark:hover:bg-white/10"
                  >
                    <Terminal className="h-3.5 w-3.5 text-cyan-500" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

