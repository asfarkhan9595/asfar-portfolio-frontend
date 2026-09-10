import { motion, useReducedMotion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Container from './Container';
import Button from './Button';

export default function ResumeCTA({ profile }) {
  const prefersReducedMotion = useReducedMotion();
  const resumeHref = profile?.resume_url || '#';

  return (
    <section id="resume" className="py-20 sm:py-24">
      <Container>
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12 dark:border-slate-800 dark:bg-slate-900/50"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            Want to know more about my work?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-slate-600 dark:text-slate-400">
            Download my resume for a detailed look at my skills, projects, and experience.
          </p>
          <Button variant="primary" href={resumeHref} target="_blank" icon={Download} size="lg" disabled={!profile?.resume_url}>
            {profile?.resume_url ? 'Download Resume' : 'Resume Coming Soon'}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
