import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import ProjectFilters from '../../components/ProjectFilters';
import GlassProjectModal from './ProjectModal';

function GlassProjectCard({ project, onViewDetails, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const maxTags = 5;
  const technologies = project.technologies || [];
  const visibleTags = technologies.slice(0, maxTags);
  const remainingCount = technologies.length - maxTags;

  const categoryName = typeof project.category === 'object' ? project.category?.name : project.category;
  const firstGalleryImg = project.images && project.images.length > 0 ? project.images[0].image_path : null;
  const rawCover = project.cover_image || firstGalleryImg || null;
  const coverImg = !imgError && rawCover ? rawCover : null;

  return (
    <motion.div
      onClick={() => onViewDetails(project)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-xl shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-cyan-500/15 cursor-pointer"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex aspect-video items-center justify-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-md overflow-hidden relative border-b border-white/40 dark:border-white/10">
        {coverImg ? (
          <img
            src={coverImg}
            alt={project.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-8 w-8 text-cyan-500/60" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Project Screenshot</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              Featured
            </span>
          )}
          {categoryName && (
            <span className="rounded-full bg-white/50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-white/60 dark:border-white/10 backdrop-blur-md">
              {categoryName}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.short_description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {visibleTags.map((tech) => (
            <span
              key={tech.id || tech.name}
              className="rounded-xl bg-white/50 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10 backdrop-blur-md"
            >
              {typeof tech === 'object' ? tech.name : tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-xl bg-white/50 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 border border-white/60 dark:border-white/10 backdrop-blur-md">
              +{remainingCount} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/40 dark:border-white/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 transition-colors group-hover:text-cyan-300">
            View Details
            <ArrowRight className="h-4 w-4" />
          </span>

          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 backdrop-blur-md transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const uniqueCats = projects ? Array.from(new Set(projects.map(p => p.category?.name).filter(Boolean))) : [];
  const projectCategories = ['All', ...uniqueCats];

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.name === activeCategory);

  return (
    <section id="projects" className="py-20 sm:py-24 relative">
      <div className="pointer-events-none absolute left-1/3 top-10 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-purple-600/10" />

      <Container>
        <SectionHeading
          title="Selected Projects"
          subtitle="Practical software projects focused on AI, backend systems, APIs, browser extensions, and automation."
        />

        <ProjectFilters
          categories={projectCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeClass="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/20 border border-white/20"
        />

        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((project, index) => (
              <GlassProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
            No projects found in this category.
          </div>
        )}

        <GlassProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
}
