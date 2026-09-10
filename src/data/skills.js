import {
  Code2,
  Server,
  Brain,
  Globe2 as BrowserIcon,
  Wrench,
  FileCode,
  Database,
  Globe,
  Bot,
  Cpu,
  GitBranch,
  Terminal,
  Puzzle,
  Cog,
} from 'lucide-react';

export const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: [
      { name: 'Python', icon: FileCode },
      { name: 'JavaScript', icon: Code2 },
      { name: 'PHP', icon: FileCode },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Laravel', icon: Server },
      { name: 'REST APIs', icon: Globe },
      { name: 'MySQL', icon: Database },
    ],
  },
  {
    title: 'AI',
    icon: Brain,
    skills: [
      { name: 'LLM APIs', icon: Bot },
      { name: 'OpenAI API Integration', icon: Cpu },
      { name: 'AI Automation', icon: Cog },
      { name: 'Prompt Engineering', icon: Terminal },
    ],
  },
  {
    title: 'Browser / Automation',
    icon: BrowserIcon,
    skills: [
      { name: 'Chrome Extensions', icon: Puzzle },
      { name: 'Browser Automation', icon: BrowserIcon },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitBranch },
      { name: 'VS Code', icon: Code2 },
    ],
  },
];
