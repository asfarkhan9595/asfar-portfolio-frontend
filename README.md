# Asfar Khan — Portfolio

Personal developer portfolio for **Asfar Khan**, a Python & AI Automation Developer.

Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## How to Edit Content

All portfolio content is stored in **`src/data/`** — no need to touch UI components.

### Profile & Bio

Edit **`src/data/profile.js`**:
- `name`, `primaryRole`, `secondaryRoles`
- `headline`, `tagline`, `about`
- `profileImage` — add your profile photo path
- `resumeUrl` — path to your resume PDF

### Social Links

Edit **`src/data/socialLinks.js`**:
- Replace `#` placeholders with your actual GitHub and LinkedIn URLs
- Replace `mailto:your-email@example.com` with your real email

### Skills

Edit **`src/data/skills.js`**:
- Add, remove, or reorder skill categories and individual skills
- Each skill can have a custom Lucide icon

### Projects

Edit **`src/data/projects.js`**:
- Each project has: `id`, `title`, `category`, `description`, `problem`, `solution`, `architecture`, `features`, `technologies`, `screenshots`, `liveDemoUrl`, `githubUrl`
- Set `liveDemoUrl` and `githubUrl` to enable the buttons (empty string = disabled)
- Add project screenshots to `public/` and reference them in the `screenshots` array
- Add new categories to the `projectCategories` array for filtering

### Experience

Edit **`src/data/experience.js`**:
- Replace the independent projects entry with actual employment entries
- Each entry: `id`, `title`, `company`, `dates`, `description`, `achievements`

### Resume

1. Place your PDF at **`public/resume/asfar-khan-resume.pdf`**
2. The download button will automatically work

### Site Metadata

Edit **`src/data/siteConfig.js`**:
- Update title, description, keywords for SEO
- Add Open Graph image URL
- Add your production site URL

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx
│   ├── ArchitectureDiagram.jsx
│   ├── Button.jsx
│   ├── Contact.jsx
│   ├── Container.jsx
│   ├── Experience.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Icons.jsx           # Custom brand SVG icons
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectFilters.jsx
│   ├── ProjectModal.jsx
│   ├── Projects.jsx
│   ├── ResumeCTA.jsx
│   ├── SectionHeading.jsx
│   ├── Skills.jsx
│   ├── SocialLinks.jsx
│   └── ThemeToggle.jsx
├── data/                # All portfolio content (easy to edit)
│   ├── experience.js
│   ├── profile.js
│   ├── projects.js
│   ├── siteConfig.js
│   ├── skills.js
│   └── socialLinks.js
├── App.jsx              # Root component
├── index.css            # Global styles & theme tokens
└── main.jsx             # Entry point
public/
├── favicon.svg          # AK monogram favicon
└── resume/
    └── README.txt       # Placeholder — add your PDF here
```

---

## Theme & Colors

The website defaults to **dark mode** and supports light mode via the toggle.

To change the accent color globally, edit **`src/index.css`**:

```css
@theme {
  --color-accent: #10b981;      /* emerald-500 — change this */
  --color-accent-hover: #059669; /* emerald-600 */
}
```

Theme preference is persisted in `localStorage` and respects the system preference on first visit.

---

## Future Admin Panel

The portfolio is designed for easy API integration. The planned architecture:

```
React Portfolio (this app)
        ↓
Laravel REST API
        ↓
MySQL Database
        ↓
Admin Panel
```

### Future editable resources via API:

| Resource     | Current Source     | Future API Endpoint    |
|--------------|--------------------|------------------------|
| Profile      | `data/profile.js`  | `GET /api/profile`     |
| Projects     | `data/projects.js` | `GET /api/projects`    |
| Skills       | `data/skills.js`   | `GET /api/skills`      |
| Experience   | `data/experience.js` | `GET /api/experience` |
| Social Links | `data/socialLinks.js` | `GET /api/social`    |
| Settings     | `data/siteConfig.js` | `GET /api/settings`   |
| Contact Form | Client-side only   | `POST /api/contact`    |

To migrate to API data, replace the static imports in components with `fetch()` calls or a data-fetching hook. The UI components receive data as props, so no component changes are needed.

---

## Tech Stack

| Technology     | Purpose               |
|----------------|------------------------|
| React          | UI framework           |
| Vite           | Build tool & dev server |
| Tailwind CSS v4| Styling               |
| Framer Motion  | Animations             |
| Lucide React   | Icons                  |

---

## License

© Asfar Khan. All rights reserved.
