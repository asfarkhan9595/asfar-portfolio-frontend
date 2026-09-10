import { useState, useEffect } from 'react';
import ThemeRenderer from './themes/ThemeRenderer';
import MaintenanceMode from './components/MaintenanceMode';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function App() {
  const [data, setData] = useState({ profile: null, skills: null, projects: null, experience: null, socialLinks: [], contactSettings: null, settings: null, posts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/profile`).then(res => res.json()),
      fetch(`${API_BASE_URL}/skills`).then(res => res.json()),
      fetch(`${API_BASE_URL}/projects`).then(res => res.json()),
      fetch(`${API_BASE_URL}/experience`).then(res => res.json()),
      fetch(`${API_BASE_URL}/social-links`).then(res => res.json()),
      fetch(`${API_BASE_URL}/contact-settings`).then(res => res.json()),
      fetch(`${API_BASE_URL}/posts`).then(res => res.json()).catch(() => ({ data: [] })),
      fetch(`${API_BASE_URL}/settings`).then(res => res.json()).catch(() => ({ data: null }))
    ]).then(([profileRes, skillsRes, projectsRes, expRes, socialRes, contactSettingsRes, postsRes, settingsRes]) => {
      const siteSettings = settingsRes?.data || null;

      if (siteSettings) {
        // Apply document title
        if (siteSettings.site_name) {
          document.title = siteSettings.site_name;
        }

        // Apply meta description
        if (siteSettings.site_description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', siteSettings.site_description);
          }
        }

        // Apply favicon
        if (siteSettings.site_favicon) {
          let faviconLink = document.querySelector("link[rel*='icon']");
          if (faviconLink) {
            faviconLink.href = siteSettings.site_favicon;
          }
        }

        // Apply primary color accent variable if provided
        if (siteSettings.primary_color) {
          document.documentElement.style.setProperty('--primary-color', siteSettings.primary_color);
        }

        // Set active theme attribute (modern, glass, or mono)
        const activeTheme = siteSettings.active_theme || 'modern';
        document.documentElement.setAttribute('data-theme', activeTheme);

        // Apply default theme mode if no local preference exists
        const storedTheme = localStorage.getItem('theme');
        if (!storedTheme && siteSettings.default_theme) {
          if (siteSettings.default_theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-mode', 'dark');
          } else if (siteSettings.default_theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-mode', 'light');
          } else if (siteSettings.default_theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
            document.documentElement.setAttribute('data-mode', prefersDark ? 'dark' : 'light');
          }
        } else {
          const currentDark = document.documentElement.classList.contains('dark');
          document.documentElement.setAttribute('data-mode', currentDark ? 'dark' : 'light');
        }
      }

      setData({
        profile: profileRes.data,
        skills: skillsRes.data,
        projects: projectsRes.data,
        experience: expRes.data,
        socialLinks: socialRes.data || [],
        contactSettings: contactSettingsRes.data || null,
        posts: postsRes.data || [],
        settings: siteSettings
      });
      setLoading(false);
    }).catch(err => {
      console.error("API error, falling back to static data", err);
      document.documentElement.setAttribute('data-theme', 'modern');
      setLoading(false);
    });
  }, []);

  const [themeKey, setThemeKey] = useState(() => {
    return localStorage.getItem('frontend_active_theme') || null;
  });

  const handleThemeChange = (newTheme) => {
    setThemeKey(newTheme);
    localStorage.setItem('frontend_active_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-medium">Loading portfolio...</div>;
  }

  const isMaintenanceMode = data.settings?.maintenance_mode === '1' || data.settings?.maintenance_mode === 'true' || data.settings?.maintenance_mode === true;
  const isPreview = new URLSearchParams(window.location.search).get('preview') === '1';

  if (isMaintenanceMode && !isPreview) {
    return <MaintenanceMode settings={data.settings} />;
  }

  const effectiveTheme = themeKey || data.settings?.active_theme || 'modern';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <ThemeRenderer activeTheme={effectiveTheme} data={data} onThemeChange={handleThemeChange} />
    </div>
  );
}
