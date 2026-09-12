import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import ArchitectureDiagram from './ArchitectureDiagram';
import Button from './Button';

export default function ProjectModal({ project, onClose }) {
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                      Featured
                    </span>
                  )}
                  {project.category && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-500">
                      {typeof project.category === 'object' ? project.category.name : project.category}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  {project.title}
                </h2>
              </div>

              {/* Screenshots gallery */}
              <div className="mb-8 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 relative">
                {activeMainImg ? (
                  <div className="space-y-3 p-3">
                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-slate-900 border border-slate-200 dark:border-slate-800 group">
                      <img
                        src={activeMainImg}
                        alt={project.title}
                        onError={() => handleImageError(activeMainImg)}
                        className="h-full w-full object-contain"
                      />

                      {/* Left & Right Slide Buttons */}
                      {validImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={handlePrevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20 hover:bg-emerald-600 transition-all shadow-lg"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>

                          <button
                            type="button"
                            onClick={handleNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20 hover:bg-emerald-600 transition-all shadow-lg"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                    </div>
                    {validImages.length > 1 && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {validImages.map((img, idx) => (
                          <button
                            key={img.id || idx}
                            type="button"
                            onClick={() => setSelectedImg(img.image_path)}
                            className={`aspect-video overflow-hidden rounded-md border-2 transition-all ${activeMainImg === img.image_path ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                          >
                            <img
                              src={img.image_path}
                              alt="Thumbnail"
                              onError={() => handleImageError(img.image_path)}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="h-10 w-10 text-slate-400 dark:text-slate-600" />
                      <span className="text-sm font-medium text-slate-400 dark:text-slate-600">
                        Project Showcase
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {/* Overview */}
                {project.short_description && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Overview
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>
                )}

                {/* Problem */}
                {project.problem && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Problem
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {project.solution && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Solution
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}

                {/* Architecture */}
                {archLayers.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Architecture
                    </h3>
                    <ArchitectureDiagram layers={archLayers} />
                  </div>
                )}

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((f, i) => (
                        <li
                          key={f.id || i}
                          className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                          {typeof f === 'object' ? (f.feature || f.title || '') : f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id || tech.name}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {typeof tech === 'object' ? tech.name : tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {project.challenges && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Challenges
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {/* What I Learned */}
                {whatILearned && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      What I Learned
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {whatILearned}
                    </p>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                  <Button
                    variant={project.live_demo_url ? 'primary' : 'secondary'}
                    href={project.live_demo_url || undefined}
                    disabled={!project.live_demo_url}
                    icon={ExternalLink}
                    size="sm"
                  >
                    {project.live_demo_url ? 'Live Demo' : 'Demo Unavailable'}
                  </Button>
                  <Button
                    variant={project.github_url ? 'secondary' : 'secondary'}
                    href={project.github_url || undefined}
                    disabled={!project.github_url}
                    icon={GithubIcon}
                    size="sm"
                  >
                    {project.github_url ? 'GitHub' : 'GitHub Unavailable'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
