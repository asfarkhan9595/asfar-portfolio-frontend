import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon, Terminal, Code } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function MonoProjectModal({ project, onClose }) {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setSelectedImg(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  let archLayers = [];
  if (typeof project.architecture === 'string' && project.architecture.trim().length > 0) {
    archLayers = project.architecture.split('->').map((step) => ({ label: step.trim() }));
  } else if (Array.isArray(project.architecture)) {
    archLayers = project.architecture;
  }

  const whatILearned = project.what_i_learned || project.whatILearned;
  const projectImages = project.images || [];
  const activeMainImg = selectedImg || (projectImages.length > 0 ? projectImages[0].image_path : project.cover_image);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#08090D]/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-[#0F1117] dark:bg-[#0F1117] bg-white shadow-2xl p-6 sm:p-8 font-mono"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-[#151821] text-slate-400 hover:text-white border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header / Category */}
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                  SPEC // INSPECT
                </span>
                {project.category && (
                  <span className="rounded-md bg-[#151821] px-2.5 py-1 text-[10px] font-medium text-slate-400 border border-white/10">
                    {typeof project.category === 'object' ? project.category.name : project.category}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {project.title}
              </h2>
            </div>

            {/* Main Screenshot */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-[#151821]">
              {activeMainImg ? (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={activeMainImg}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center bg-[#151821] text-slate-500">
                  <ImageIcon className="mb-2 h-10 w-10 text-cyan-400/40" />
                  <span className="text-xs">// Screenshot Unavailable</span>
                </div>
              )}

              {/* Gallery Thumbnails */}
              {projectImages.length > 0 && (
                <div className="flex gap-2 p-3 bg-[#0F1117] border-t border-white/10 overflow-x-auto">
                  {projectImages.map((imgObj, i) => (
                    <button
                      key={imgObj.id || i}
                      onClick={() => setSelectedImg(imgObj.image_path)}
                      className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                        activeMainImg === imgObj.image_path
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgObj.image_path} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                // System Summary
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {project.description || project.long_description}
              </p>
            </div>

            {/* Architecture Diagram */}
            {archLayers.length > 0 && (
              <div className="mb-6 rounded-2xl bg-[#151821] p-4 border border-cyan-500/20">
                <h3 className="mb-3 text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Pipeline Architecture</span>
                </h3>
                <ArchitectureDiagram layers={archLayers} />
              </div>
            )}

            {/* Tech Stack Pills */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
                  // Stack Modules
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-[#151821] px-3 py-1 text-xs text-cyan-400 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What I Learned */}
            {whatILearned && (
              <div className="mb-6 rounded-2xl bg-[#151821] p-4 border border-white/10">
                <h3 className="mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  // Technical Highlights & Notes
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {whatILearned}
                </p>
              </div>
            )}

            {/* Links CTA */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#151821] px-4 py-2.5 text-xs font-bold text-white border border-white/10 hover:border-cyan-400 transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Production Demo</span>
                </a>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

