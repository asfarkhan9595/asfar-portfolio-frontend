import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function GlassProjectModal({ project, onClose }) {
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
          {/* Glass Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Glass Modal Box */}
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/70 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/50 text-slate-600 border border-white/60 hover:bg-white/80 dark:bg-white/10 dark:text-slate-300 dark:border-white/10 backdrop-blur-md transition-all"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      Featured
                    </span>
                  )}
                  {project.category && (
                    <span className="rounded-full bg-white/50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-white/60 dark:border-white/10 backdrop-blur-md">
                      {typeof project.category === 'object' ? project.category.name : project.category}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  {project.title}
                </h2>
              </div>

              {/* Main Screenshot Display */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
                {activeMainImg ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={activeMainImg}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageIcon className="h-10 w-10 text-cyan-500/50" />
                    <span className="text-sm">No preview image available</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  About the Project
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {project.description || project.short_description}
                </p>
              </div>

              {/* Tech Stack */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.id || tech.name}
                        className="rounded-xl bg-white/50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10 backdrop-blur-md"
                      >
                        {typeof tech === 'object' ? tech.name : tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Diagram */}
              {archLayers.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    System Architecture
                  </h3>
                  <ArchitectureDiagram layers={archLayers} />
                </div>
              )}

              {/* What I Learned */}
              {whatILearned && (
                <div className="mb-6 rounded-2xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 backdrop-blur-md">
                  <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                    💡 Key Takeaways
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {whatILearned}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/40 dark:border-white/10">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium px-5 py-2.5 text-sm border border-white/10 shadow-md hover:bg-slate-800 transition-all"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub Repo
                  </a>
                )}
                {project.live_demo_url && (
                  <a
                    href={project.live_demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-5 py-2.5 text-sm border border-white/20 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

