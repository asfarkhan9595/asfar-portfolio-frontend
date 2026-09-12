import { motion } from 'framer-motion';
import { Download, Terminal, ArrowUpRight } from 'lucide-react';

export default function ResumeCTA({ profile }) {
  const resumeUrl = profile?.resume_url || profile?.resume || '#contact';

  const handleClick = (e) => {
    if (resumeUrl === '#contact') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="resume" className="py-16 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-[#0F1117] via-[#151821] to-[#0F1117] border border-cyan-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden font-mono"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs">
                <Terminal className="w-3.5 h-3.5" />
                <span>SPECIFICATION_FILE // PDF</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Download Technical Resume
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
                Review complete technical qualifications, architectural proficiencies, API design background, and enterprise work history.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={resumeUrl}
                onClick={handleClick}
                target={resumeUrl === '#contact' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-violet-400 hover:from-cyan-300 hover:to-violet-300 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Get Full Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
