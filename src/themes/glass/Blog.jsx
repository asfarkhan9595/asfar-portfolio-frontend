import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, ArrowRight, Newspaper } from 'lucide-react';

export default function Blog({ posts, onNavigate }) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 4);

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:border-cyan-500/30 dark:bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-cyan-400 backdrop-blur-md">
              <Sparkles className="h-3.5 h-3.5 text-cyan-400" />
              Daily Technical Notes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3">
              Engineering Articles & Insights
            </h2>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg hover:opacity-95 transition-all w-fit group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayPosts.map((post, idx) => {
            const publishedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : 'Recently Published';

            return (
              <motion.article
                key={post.id || post.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
                className="group cursor-pointer rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-white/10 overflow-hidden shadow-lg shadow-blue-500/5 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950/20">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Newspaper className="w-10 h-10 text-cyan-400/40" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-md text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-white/40 dark:border-white/10">
                      {post.category || 'Tech'}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {post.read_time || '5 min read'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
