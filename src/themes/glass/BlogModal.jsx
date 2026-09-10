import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Eye, Tag } from 'lucide-react';

export default function GlassBlogModal({ post, onClose }) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Recently Published';

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" onClick={onClose} />

          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl shadow-2xl p-6 sm:p-8"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-white/40 dark:border-white/10 backdrop-blur-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                {post.category || 'Tech'}
              </span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {post.read_time || '5 min read'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {post.cover_image && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/20 dark:bg-slate-800/40 backdrop-blur-md aspect-video">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {post.excerpt && (
              <div className="mb-6 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border-l-4 border-cyan-400 backdrop-blur-md text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "{post.excerpt}"
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 mb-8 whitespace-pre-wrap">
              {post.content}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="pt-4 border-t border-white/20 dark:border-white/10 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/40 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-white/40 dark:border-white/10 text-xs backdrop-blur-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

