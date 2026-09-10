import { motion } from 'framer-motion';

export default function ProjectFilters({ categories, activeCategory, onCategoryChange, activeClass = "bg-emerald-500" }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className={`absolute inset-0 rounded-xl ${activeClass}`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
