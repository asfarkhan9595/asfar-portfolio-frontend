import { motion, useReducedMotion } from 'framer-motion';
import Container from './Container';
import SectionHeading from './SectionHeading';


export default function About({ profile }) {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = profile?.about ? profile.about.split('\n\n') : [];
  const imageUrl = profile?.profile_image;

  return (
    <section id="about" className="py-20 sm:py-24">
      <Container>
        <SectionHeading title="About" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            className={`relative pl-6 ${imageUrl ? 'lg:col-span-7 sm:lg:col-span-8' : 'lg:col-span-12 max-w-3xl'}`}
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

          {imageUrl && (
            <motion.div
              className="lg:col-span-5 sm:lg:col-span-4 flex justify-center lg:justify-end"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-md transition duration-500 group-hover:opacity-40" />
                <img
                  src={imageUrl}
                  alt={profile?.name || 'Profile'}
                  className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xl"
                />
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
