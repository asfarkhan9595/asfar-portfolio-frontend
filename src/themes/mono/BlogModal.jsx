import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Eye, Tag, Share2 } from 'lucide-react';

export default function MonoBlogModal({ post, onClose }) {
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#08090D]/85 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-[#0F1117] dark:bg-[#0F1117] bg-white shadow-2xl p-6 sm:p-8 font-mono"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-[#151821] text-slate-400 hover:text-white border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Category & Date */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-400 border border-cyan-500/20 uppercase">
                {post.category || 'Tech Article'}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                {post.read_time || '5 min read'}
              </span>
              {post.views_count > 0 && (
                <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  {post.views_count} views
                </span>
              )}
            </div>

            {/* Post Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#151821] aspect-video">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-6 p-4 rounded-2xl bg-[#151821] border-l-4 border-cyan-400 text-xs sm:text-sm text-cyan-200 font-sans italic leading-relaxed">
                "{post.excerpt}"
              </div>
            )}

            {/* Article Content */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed space-y-4 mb-8 whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Tags Footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#151821] text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
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

