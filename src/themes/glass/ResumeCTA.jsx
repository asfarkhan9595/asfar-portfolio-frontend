import { motion, useReducedMotion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Container from '../../components/Container';

export default function ResumeCTA({ profile }) {
  const prefersReducedMotion = useReducedMotion();
  const resumeHref = profile?.resume_url || '#';

  return (
    <section id="resume" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-1/3 top-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl dark:bg-purple-600/10" />

      <Container>
        <motion.div
          className="rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-8 text-center sm:p-12 backdrop-blur-2xl shadow-xl shadow-blue-500/5 relative overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/25 backdrop-blur-md">
            <FileText className="h-7 w-7" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            Want to know more about my work?
          </h2>

          <p className="mx-auto mb-6 max-w-md text-slate-600 dark:text-slate-300">
            Download my resume for a detailed look at my skills, projects, and experience.
          </p>

          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3.5 text-base border border-white/20 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] ${
              !profile?.resume_url ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <Download className="h-5 w-5" />
            {profile?.resume_url ? 'Download Resume' : 'Resume Coming Soon'}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

