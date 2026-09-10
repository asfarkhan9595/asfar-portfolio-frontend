import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';

export default function About({ profile }) {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = profile?.about ? profile.about.split('\n\n') : [];

  return (
    <section id="about" className="py-20 sm:py-24">
      <Container>
        <SectionHeading title="About" />
        <motion.div
          className="relative max-w-3xl pl-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-emerald-500/30" />
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

