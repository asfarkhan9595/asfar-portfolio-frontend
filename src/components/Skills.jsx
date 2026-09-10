import { motion, useReducedMotion } from 'framer-motion';
import Container from './Container';
import SectionHeading from './SectionHeading';
import { Code2, Terminal, Code, Cpu } from 'lucide-react';

export default function Skills({ categories }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories && categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="animated-border group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-400 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900/50"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:shadow-md group-hover:shadow-emerald-500/10">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills && category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="skill-tag inline-flex cursor-default items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <Terminal className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-emerald-500" />
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
