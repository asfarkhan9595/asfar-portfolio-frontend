import { useState } from 'react';
import Container from './Container';
import SectionHeading from './SectionHeading';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique categories from projects
  const uniqueCats = projects ? Array.from(new Set(projects.map(p => p.category?.name).filter(Boolean))) : [];
  const projectCategories = ['All', ...uniqueCats];

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.name === activeCategory);

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
          onCategoryChange={setActiveCategory}
        />

        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
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
