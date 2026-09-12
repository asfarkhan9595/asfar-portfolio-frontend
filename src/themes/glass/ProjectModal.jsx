import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function GlassProjectModal({ project, onClose }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setSelectedImg(null);
      setFailedImages({});
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

  const handleImageError = (imgKey) => {
    setFailedImages((prev) => ({ ...prev, [imgKey]: true }));
  };

  let archLayers = [];
  if (typeof project.architecture === 'string' && project.architecture.trim().length > 0) {
    archLayers = project.architecture.split('->').map((step) => ({ label: step.trim() }));
  } else if (Array.isArray(project.architecture)) {
    archLayers = project.architecture;
  }

  const whatILearned = project.what_i_learned || project.whatILearned;
  const projectImages = project.images || [];
  const rawAllImages = [];

  if (project.cover_image) {
    rawAllImages.push({ id: 'cover', image_path: project.cover_image });
  }
  if (projectImages.length > 0) {
    projectImages.forEach((img, idx) => {
      if (img.image_path !== project.cover_image) {
        rawAllImages.push({ id: img.id || `gallery-${idx}`, image_path: img.image_path });
      }
    });
  }

  // Filter out broken / failed images
  const validImages = rawAllImages.filter((img) => !failedImages[img.image_path]);

  const rawActiveImg = selectedImg || (validImages.length > 0 ? validImages[0].image_path : null);
  const activeMainImg = rawActiveImg && !failedImages[rawActiveImg] ? rawActiveImg : (validImages[0]?.image_path || null);

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
              <div className="mb-4 overflow-hidden rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
                {activeMainImg ? (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950/40">
                    <img
                      src={activeMainImg}
                      alt={project.title}
                      onError={() => handleImageError(activeMainImg)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-slate-400 py-12">
                    <ImageIcon className="h-10 w-10 text-cyan-500/50" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Project Screenshot Showcase</span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails Selector */}
              {validImages.length > 1 && (
                <div className="mb-6 flex gap-2.5 overflow-x-auto pb-2">
                  {validImages.map((img, idx) => {
                    const isSelected = activeMainImg === img.image_path;
                    return (
                      <button
                        key={img.id || idx}
                        type="button"
                        onClick={() => setSelectedImg(img.image_path)}
                        className={`relative flex-shrink-0 h-16 w-24 overflow-hidden rounded-xl border-2 transition-all backdrop-blur-md ${
                          isSelected
                            ? 'border-cyan-500 ring-2 ring-cyan-500/30 scale-105 opacity-100'
                            : 'border-white/40 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-cyan-400/50'
                        }`}
                      >
                        <img
                          src={img.image_path}
                          alt={`Thumbnail ${idx + 1}`}
                          onError={() => handleImageError(img.image_path)}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Description / Overview */}
              {project.short_description && (
                <div className="mb-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Overview
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {project.short_description}
                  </p>
                </div>
              )}

              {/* Problem */}
              {project.problem && (
                <div className="mb-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Problem
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="mb-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Solution
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Architecture Diagram */}
              {archLayers.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    System Architecture
                  </h3>
                  <ArchitectureDiagram layers={archLayers} />
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((f, i) => (
                      <li
                        key={f.id || i}
                        className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-sm"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                        {typeof f === 'object' ? (f.feature || f.title || '') : f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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

              {/* Challenges */}
              {project.challenges && (
                <div className="mb-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Challenges
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    {project.challenges}
                  </p>
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
                <a
                  href={project.live_demo_url || project.live_url || '#'}
                  target={project.live_demo_url || project.live_url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl font-medium px-5 py-2.5 text-sm transition-all ${
                    project.live_demo_url || project.live_url
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border border-white/20 shadow-lg shadow-cyan-500/20 hover:scale-[1.02]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ExternalLink className="h-4 w-4" />
                  {project.live_demo_url || project.live_url ? 'Live Demo' : 'Demo Unavailable'}
                </a>

                <a
                  href={project.github_url || '#'}
                  target={project.github_url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl font-medium px-5 py-2.5 text-sm transition-all ${
                    project.github_url
                      ? 'bg-slate-900 dark:bg-slate-800 text-white border border-white/10 shadow-md hover:bg-slate-800'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <GithubIcon className="h-4 w-4" />
                  {project.github_url ? 'GitHub Repo' : 'GitHub Unavailable'}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
