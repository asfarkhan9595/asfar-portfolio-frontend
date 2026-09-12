import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../../components/Icons';
import MonoProjectModal from './ProjectModal';

const ITEMS_PER_PAGE = 4;

export default function Projects({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ['All'];
    const set = new Set(['All']);
    projects.forEach((p) => {
      if (p.category) {
        const catName = typeof p.category === 'object' ? p.category.name : p.category;
        if (catName) set.add(catName);
      }
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => {
      const catName = typeof p.category === 'object' ? p.category.name : p.category;
      return catName === selectedCategory;
    });
  }, [projects, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((filteredProjects?.length || 0) / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            // 03. FEATURED PROJECTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            Systems & Live Builds
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-mono no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'bg-[#0F1117] dark:bg-[#0F1117] bg-white text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedProjects.map((project, idx) => (
            <motion.div
              key={project.id || project.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-white/10">
                  { (project.cover_image || (project.images && project.images.length > 0 ? project.images[0].image_path : null)) ? (
                    <img
                      src={project.cover_image || project.images[0].image_path}
                      alt={project.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#151821] font-mono text-xs text-slate-500">
                      <Terminal className="w-8 h-8 text-cyan-400/40" />
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/90 text-slate-950 font-mono text-[10px] font-bold shadow">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 font-mono">
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 mb-2">
                    <span>BUILD // 0{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</span>
                    {project.category && (
                      <span className="text-slate-500 dark:text-slate-400 uppercase">
                        {typeof project.category === 'object' ? project.category.name : project.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-[#151821] text-cyan-400 border border-white/5 text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-white/5 font-mono">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 font-mono">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#0F1117] text-slate-400 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                      : 'bg-[#0F1117] text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {page < 10 ? `0${page}` : page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#0F1117] text-slate-400 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal */}
        <MonoProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
