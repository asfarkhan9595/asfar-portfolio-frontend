import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, onViewDetails, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const maxTags = 5;
  const technologies = project.technologies || [];
  const visibleTags = technologies.slice(0, maxTags);
  const remainingCount = technologies.length - maxTags;

  const categoryName = typeof project.category === 'object' ? project.category?.name : project.category;
  
  // Prioritize uploaded gallery images first (same logic as ProjectModal), then cover_image fallback
  const firstGalleryImg = project.images && project.images.length > 0 ? project.images[0].image_path : null;
  const rawCover = firstGalleryImg || project.cover_image || null;
  const coverImg = !imgError && rawCover ? rawCover : null;

  return (
    <motion.div
      onClick={() => onViewDetails(project)}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900/50 cursor-pointer"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Screenshot or Cover Image */}
      <div className="flex aspect-video items-center justify-center bg-slate-100 dark:bg-slate-800/50 overflow-hidden relative">
        {coverImg ? (
          <img
            src={coverImg}
            alt={project.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-8 w-8 text-slate-400 dark:text-slate-600" />
            <span className="text-sm text-slate-400 dark:text-slate-600">Project Screenshot</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
              Featured
            </span>
          )}
          {categoryName && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-500">
              {categoryName}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.short_description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {visibleTags.map((tech) => (
            <span
              key={tech.id || tech.name}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {typeof tech === 'object' ? tech.name : tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-500">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <span
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 transition-colors group-hover:text-emerald-400"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </span>

          {project.live_demo_url ? (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-slate-400 dark:text-slate-600">
              <ExternalLink className="h-3.5 w-3.5" />
              Unavailable
            </span>
          )}

          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-slate-400 dark:text-slate-600">
              <GithubIcon className="h-3.5 w-3.5" />
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
