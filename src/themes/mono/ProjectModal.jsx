import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function MonoProjectModal({ project, onClose }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  // Hook 1: Lock body scroll
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

  // Compute images unconditionally before any return
  const projectImages = project?.images || [];
  const rawAllImages = [];

  if (project?.cover_image) {
    rawAllImages.push({ id: 'cover', image_path: project.cover_image });
  }
  if (projectImages.length > 0) {
    projectImages.forEach((img, idx) => {
      if (img.image_path !== project?.cover_image) {
        rawAllImages.push({ id: img.id || `gallery-${idx}`, image_path: img.image_path });
      }
    });
  }

  const validImages = rawAllImages.filter((img) => !failedImages[img.image_path]);
  const rawActiveImg = selectedImg || (validImages.length > 0 ? validImages[0].image_path : null);
  const activeMainImg = rawActiveImg && !failedImages[rawActiveImg] ? rawActiveImg : (validImages[0]?.image_path || null);
  const currentImgIndex = validImages.findIndex((img) => img.image_path === activeMainImg);

  // Hook 2: Keyboard navigation listener (unconditional)
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && validImages.length > 1) {
        const idx = currentImgIndex < 0 ? 0 : currentImgIndex;
        const prevIdx = (idx - 1 + validImages.length) % validImages.length;
        setSelectedImg(validImages[prevIdx].image_path);
      }
      if (e.key === 'ArrowRight' && validImages.length > 1) {
        const idx = currentImgIndex < 0 ? 0 : currentImgIndex;
        const nextIdx = (idx + 1) % validImages.length;
        setSelectedImg(validImages[nextIdx].image_path);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, validImages.length, currentImgIndex]);

  // Early return after all hooks have been declared
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

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (validImages.length <= 1) return;
    const idx = currentImgIndex < 0 ? 0 : currentImgIndex;
    const prevIdx = (idx - 1 + validImages.length) % validImages.length;
    setSelectedImg(validImages[prevIdx].image_path);
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (validImages.length <= 1) return;
    const idx = currentImgIndex < 0 ? 0 : currentImgIndex;
    const nextIdx = (idx + 1) % validImages.length;
    setSelectedImg(validImages[nextIdx].image_path);
  };

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
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F1117] text-slate-900 dark:text-white shadow-2xl p-6 sm:p-8 font-mono"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#151821] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header / Category */}
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  SPEC // INSPECT
                </span>
                {project.category && (
                  <span className="rounded-md bg-slate-100 dark:bg-[#151821] px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                    {typeof project.category === 'object' ? project.category.name : project.category}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {project.title}
              </h2>
            </div>

            {/* Main Screenshot with Navigation Controls */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#151821]">
              {activeMainImg ? (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 group">
                  <img
                    src={activeMainImg}
                    alt={project.title}
                    onError={() => handleImageError(activeMainImg)}
                    className="h-full w-full object-cover"
                  />

                  {/* Left & Right Slide Buttons */}
                  {validImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1117]/80 text-cyan-400 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1117]/80 text-cyan-400 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center bg-slate-100 dark:bg-[#151821] text-slate-500 py-12">
                  <ImageIcon className="mb-2 h-10 w-10 text-cyan-500/40 dark:text-cyan-400/40" />
                  <span className="text-xs">// Screenshot Showcase Unavailable</span>
                </div>
              )}

              {/* Gallery Thumbnails */}
              {validImages.length > 1 && (
                <div className="flex gap-2 p-3 bg-slate-100/60 dark:bg-[#0F1117] border-t border-slate-200 dark:border-white/10 overflow-x-auto">
                  {validImages.map((imgObj, i) => (
                    <button
                      key={imgObj.id || i}
                      onClick={() => setSelectedImg(imgObj.image_path)}
                      className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                        activeMainImg === imgObj.image_path
                          ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                          : 'border-slate-300 dark:border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgObj.image_path}
                        alt=""
                        onError={() => handleImageError(imgObj.image_path)}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* System Summary / Overview */}
            { (project.short_description || project.description) && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  // System Summary
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {project.short_description || project.description}
                </p>
              </div>
            )}

            {/* Problem */}
            {project.problem && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  // Problem Statement
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  // Proposed Solution
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Architecture Diagram */}
            {archLayers.length > 0 && (
              <div className="mb-6 rounded-2xl bg-slate-50 dark:bg-[#151821] p-4 border border-slate-200 dark:border-cyan-500/20">
                <h3 className="mb-3 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Pipeline Architecture</span>
                </h3>
                <ArchitectureDiagram layers={archLayers} />
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  // Key Features
                </h3>
                <ul className="space-y-2 font-sans">
                  {project.features.map((f, i) => (
                    <li
                      key={f.id || i}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                      {typeof f === 'object' ? (f.feature || f.title || '') : f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {(project.technologies || project.tech_stack) && (project.technologies?.length > 0 || project.tech_stack?.length > 0) && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                  // Stack Modules
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || project.tech_stack).map((tech, idx) => (
                    <span
                      key={tech.id || tech.name || tech || idx}
                      className="rounded-lg bg-slate-100 dark:bg-[#151821] px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/20"
                    >
                      {typeof tech === 'object' ? tech.name : tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Challenges */}
            {project.challenges && (
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  // Key Challenges
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* What I Learned */}
            {whatILearned && (
              <div className="mb-6 rounded-2xl bg-slate-50 dark:bg-[#151821] p-4 border border-slate-200 dark:border-white/10">
                <h3 className="mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  // Technical Highlights & Notes
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {whatILearned}
                </p>
              </div>
            )}

            {/* Links CTA */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <a
                href={project.live_demo_url || project.live_url || '#'}
                target={project.live_demo_url || project.live_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  project.live_demo_url || project.live_url
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20 hover:opacity-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <ExternalLink className="h-4 w-4" />
                <span>{project.live_demo_url || project.live_url ? 'Live Production Demo' : 'Demo Unavailable'}</span>
              </a>

              <a
                href={project.github_url || '#'}
                target={project.github_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${
                  project.github_url
                    ? 'bg-slate-100 dark:bg-[#151821] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-cyan-500'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <GithubIcon className="h-4 w-4" />
                <span>{project.github_url ? 'View Repository' : 'GitHub Unavailable'}</span>
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
