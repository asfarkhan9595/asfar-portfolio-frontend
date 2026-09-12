import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import ProjectFilters from '../../components/ProjectFilters';
import ProjectCard from '../../components/ProjectCard';
import ProjectModal from '../../components/ProjectModal';

const ITEMS_PER_PAGE = 4;

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueCats = projects ? Array.from(new Set(projects.map(p => p.category?.name).filter(Boolean))) : [];
  const projectCategories = ['All', ...uniqueCats];

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.name === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((filtered?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProjects = filtered ? filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          title="Selected Projects"
          subtitle="Practical software projects focused on AI, backend systems, APIs, browser extensions, and automation."
        />

        <ProjectFilters
          categories={projectCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {paginatedProjects && paginatedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {paginatedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded-xl p-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-9 min-w-[36px] px-3 rounded-xl text-sm font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center rounded-xl p-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-500">
            No projects found in this category.
          </div>
        )}

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
}
