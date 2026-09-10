export const projects = [
  {
    id: 'ai-job-assistant',
    title: 'AI Job Assistant',
    category: 'AI',
    featured: true,
    description:
      'An AI-powered job assistance platform/Chrome extension designed to help analyze job opportunities and assist with job applications.',
    problem:
      'Job seekers often struggle to quickly understand whether a job opportunity is a good fit and need help streamlining application workflows across different platforms.',
    solution:
      'A platform combining a Chrome extension frontend with a Laravel backend and AI APIs to analyze job postings, provide profile-based assistance, and streamline the application process.',
    architecture: [
      { label: 'Chrome Extension', description: 'User-facing browser interface' },
      { label: 'REST API', description: 'Communication layer' },
      { label: 'Laravel Backend', description: 'Business logic and data management' },
      { label: 'MySQL', description: 'Persistent data storage' },
      { label: 'AI APIs', description: 'Intelligence and analysis layer' },
    ],
    features: [
      'Job analysis and opportunity evaluation',
      'Resume/profile-based assistance',
      'AI-powered insights and recommendations',
      'Backend REST API architecture',
      'Chrome extension workflow integration',
    ],
    technologies: ['Laravel', 'PHP', 'REST API', 'AI APIs', 'Chrome Extension', 'MySQL'],
    screenshots: [],
    liveDemoUrl: '',
    githubUrl: '',
    challenges: '', // Add your challenges here
    whatILearned: '', // Add what you learned here
  },
  {
    id: 'ai-provider-management',
    title: 'Dynamic AI Provider Management Backend',
    category: 'Backend',
    featured: true,
    description:
      'A backend system for managing multiple AI providers and API keys securely.',
    problem:
      'Applications that integrate with multiple AI providers need a robust way to manage API keys, handle provider switching, and track usage without hardcoding provider configurations.',
    solution:
      'A Laravel-based backend system with encrypted API key storage, configurable default/fallback providers, and comprehensive usage tracking — all accessible through a clean REST API.',
    architecture: [
      { label: 'Client Application', description: 'Any frontend or service consumer' },
      { label: 'REST API', description: 'Standardized interface layer' },
      { label: 'Laravel Backend', description: 'Provider management and routing logic' },
      { label: 'AI Provider Management', description: 'Key encryption, fallback, and selection' },
      { label: 'MySQL', description: 'Provider configs, keys, and usage data' },
    ],
    features: [
      'AI provider management and configuration',
      'Encrypted API key storage',
      'Configurable default provider',
      'Fallback provider support',
      'Usage tracking and analytics',
      'Token/usage management',
      'API-based architecture',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'AI APIs'],
    screenshots: [],
    liveDemoUrl: '',
    githubUrl: '',
    challenges: '',
    whatILearned: '',
  },
  {
    id: 'chrome-extension-projects',
    title: 'Chrome Extension Projects',
    category: 'Chrome Extension',
    featured: false,
    description:
      'Browser-extension development focused on practical workflows, API integration, automation, and user-friendly extension interfaces.',
    problem:
      'Many repetitive browser-based tasks can be automated and enhanced through well-designed browser extensions that integrate with external APIs.',
    solution:
      'Building Chrome extensions that combine clean user interfaces with backend API integrations and browser automation capabilities to create practical workflow improvements.',
    architecture: [
      { label: 'Chrome Extension UI', description: 'Popup and content scripts' },
      { label: 'Background Service Worker', description: 'Event handling and state management' },
      { label: 'REST APIs', description: 'External service integration' },
      { label: 'Browser APIs', description: 'Tabs, storage, and automation' },
    ],
    features: [
      'Chrome Extension architecture',
      'API integration with external services',
      'Browser automation capabilities',
      'User-friendly extension interfaces',
    ],
    technologies: ['JavaScript', 'Chrome Extensions', 'REST APIs', 'Automation'],
    screenshots: [],
    liveDemoUrl: '',
    githubUrl: '',
    challenges: '',
    whatILearned: '',
  },
  {
    id: 'website-development',
    title: 'Website Development Projects',
    category: 'Web Development',
    featured: false,
    description:
      'Professional website development work focused on clean interfaces, responsive layouts, and practical business-oriented web experiences.',
    problem:
      'Businesses and individuals need professional, responsive web presences that effectively communicate their value and provide good user experiences across all devices.',
    solution:
      'Building clean, responsive websites with attention to design quality, performance, and practical functionality tailored to specific needs.',
    architecture: [
      { label: 'Frontend', description: 'HTML, CSS, JavaScript' },
      { label: 'Responsive Layout', description: 'Mobile-first design approach' },
      { label: 'Performance', description: 'Optimized loading and rendering' },
    ],
    features: [
      'Clean, modern interfaces',
      'Responsive layouts across all devices',
      'Performance-optimized builds',
      'Business-oriented functionality',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    screenshots: [],
    liveDemoUrl: '',
    githubUrl: '',
    challenges: '',
    whatILearned: '',
  },
];

export const projectCategories = ['All', 'AI', 'Backend', 'Chrome Extension', 'Web Development'];
