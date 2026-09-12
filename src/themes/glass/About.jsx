import { motion, useReducedMotion } from 'framer-motion';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import { User } from 'lucide-react';

export default function About({ profile }) {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = profile?.about ? profile.about.split('\n\n') : [];
  const imageUrl = profile?.profile_image;

  return (
    <section id="about" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-500/10" />

      <Container>
        <SectionHeading title="About" subtitle="Passionate about AI, automation, and backend systems" />
        <motion.div
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/55 p-8 sm:p-12 backdrop-blur-2xl shadow-xl shadow-blue-500/5"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient Glowing Accent Line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className={`space-y-4 ${imageUrl ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              {paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {p}
                </p>
              ))}
            </div>

            {imageUrl && (
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-md transition duration-500 group-hover:opacity-40" />
                  <img
                    src={imageUrl}
                    alt={profile?.name || 'Profile'}
                    className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl border border-white/40 dark:border-white/10 shadow-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

