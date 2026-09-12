import React, { useState, useEffect } from 'react';

// Modern Theme Components
import ModernNavbar from './modern/Navbar';
import ModernHero from './modern/Hero';
import ModernAbout from './modern/About';
import ModernExperience from './modern/Experience';
import ModernSkills from './modern/Skills';
import ModernProjects from './modern/Projects';
import ModernBlog from './modern/Blog';
import ModernBlogPage from './modern/BlogPage';
import ModernBlogPostDetail from './modern/BlogPostDetail';
import ModernContact from './modern/Contact';
import ModernFooter from './modern/Footer';

// Glassmorphism Theme Components
import GlassNavbar from './glass/Navbar';
import GlassHero from './glass/Hero';
import GlassAbout from './glass/About';
import GlassExperience from './glass/Experience';
import GlassSkills from './glass/Skills';
import GlassProjects from './glass/Projects';
import GlassBlog from './glass/Blog';
import GlassBlogPage from './glass/BlogPage';
import GlassBlogPostDetail from './glass/BlogPostDetail';
import GlassContact from './glass/Contact';
import GlassFooter from './glass/Footer';
import GlassResumeCTA from './glass/ResumeCTA';

// Mono Tech Theme Components
import MonoNavbar from './mono/Navbar';
import MonoHero from './mono/Hero';
import MonoAbout from './mono/About';
import MonoExperience from './mono/Experience';
import MonoSkills from './mono/Skills';
import MonoProjects from './mono/Projects';
import MonoBlog from './mono/Blog';
import MonoBlogPage from './mono/BlogPage';
import MonoBlogPostDetail from './mono/BlogPostDetail';
import MonoContact from './mono/Contact';
import MonoFooter from './mono/Footer';
import MonoResumeCTA from './mono/ResumeCTA';

// Shared Component
import ResumeCTA from '../components/ResumeCTA';

const themes = {
  modern: {
    Navbar: ModernNavbar,
    Hero: ModernHero,
    About: ModernAbout,
    Experience: ModernExperience,
    Skills: ModernSkills,
    Projects: ModernProjects,
    Blog: ModernBlog,
    BlogPage: ModernBlogPage,
    BlogPostDetail: ModernBlogPostDetail,
    ResumeCTA: ResumeCTA,
    Contact: ModernContact,
    Footer: ModernFooter,
  },
  glass: {
    Navbar: GlassNavbar,
    Hero: GlassHero,
    About: GlassAbout,
    Experience: GlassExperience,
    Skills: GlassSkills,
    Projects: GlassProjects,
    Blog: GlassBlog,
    BlogPage: GlassBlogPage,
    BlogPostDetail: GlassBlogPostDetail,
    ResumeCTA: GlassResumeCTA,
    Contact: GlassContact,
    Footer: GlassFooter,
  },
  mono: {
    Navbar: MonoNavbar,
    Hero: MonoHero,
    About: MonoAbout,
    Experience: MonoExperience,
    Skills: MonoSkills,
    Projects: MonoProjects,
    Blog: MonoBlog,
    BlogPage: MonoBlogPage,
    BlogPostDetail: MonoBlogPostDetail,
    ResumeCTA: MonoResumeCTA,
    Contact: MonoContact,
    Footer: MonoFooter,
  },
};

import NotFound from '../components/NotFound';

export default function ThemeRenderer({ activeTheme = 'modern', data, onThemeChange }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    const targetPathName = newPath.split('#')[0] || '/';
    setPath(targetPathName);

    const hash = newPath.includes('#') ? newPath.split('#')[1] : null;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedKey = themes[activeTheme] ? activeTheme : 'modern';
  const ActiveComponents = themes[selectedKey];

  const {
    profile,
    settings,
    skills,
    projects,
    experience,
    socialLinks,
    contactSettings,
    posts,
  } = data;

  // Single Article Reader Route: /blog/:slug
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').trim();
    const DetailComponent = ActiveComponents.BlogPostDetail;
    return (
      <div className={`theme-${selectedKey} min-h-screen flex flex-col overflow-x-hidden max-w-full`}>
        <DetailComponent
          slug={slug}
          posts={posts}
          profile={profile}
          settings={settings}
          onNavigate={navigate}
          currentTheme={selectedKey}
          onThemeChange={onThemeChange}
        />
      </div>
    );
  }

  // Dedicated Blog Index Page Route: /blog
  if (path === '/blog') {
    const PageComponent = ActiveComponents.BlogPage;
    return (
      <div className={`theme-${selectedKey} min-h-screen flex flex-col overflow-x-hidden max-w-full`}>
        <PageComponent
          posts={posts}
          profile={profile}
          settings={settings}
          onNavigate={navigate}
          currentTheme={selectedKey}
          onThemeChange={onThemeChange}
        />
      </div>
    );
  }

  // Main Portfolio Single Page Application Route: /
  if (path === '/' || path === '') {
    const { Navbar, Hero, About, Experience, Skills, Projects, Blog, ResumeCTA: ActiveResumeCTA, Contact, Footer } = ActiveComponents;

    return (
      <div className={`theme-${selectedKey} min-h-screen flex flex-col overflow-x-hidden max-w-full relative`}>
        <Navbar profile={profile} settings={settings} onNavigate={navigate} currentTheme={selectedKey} onThemeChange={onThemeChange} />

        <main className="flex-1 overflow-x-hidden max-w-full">
          <Hero profile={profile} settings={settings} socialLinks={socialLinks} />
          <About profile={profile} />
          <Skills categories={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Blog posts={posts} onNavigate={navigate} />
          <ActiveResumeCTA profile={profile} />
          <Contact profile={profile} socialLinks={socialLinks} contactSettings={contactSettings} />
        </main>

        <Footer profile={profile} settings={settings} socialLinks={socialLinks} />
      </div>
    );
  }

  // Fallback 404 Page for any unrecognized route
  return <NotFound onNavigate={navigate} />;
}
