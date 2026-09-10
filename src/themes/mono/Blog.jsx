import { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Blog({ posts, onNavigate }) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 4);

  return (
    <section id="blog" className="py-20 relative font-mono">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
              // 05. DAILY ARTICLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              Engineering Insights & Notes
            </h2>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 text-xs font-bold transition-all w-fit shadow-sm group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group cursor-pointer rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-white/10">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#151821] font-mono text-xs text-slate-500">
                        <Newspaper className="w-8 h-8 text-cyan-400/40" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#0F1117]/90 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/30 backdrop-blur-md">
                        {post.category || 'Tech'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-violet-400" />
                        {post.read_time || '5 min read'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-white/5 font-mono text-xs text-cyan-400 font-bold group-hover:text-cyan-300">
                  <span>Read Article Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All CTA Footer */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1117] dark:bg-[#0F1117] bg-white text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold transition-all shadow-lg"
          >
            <span>Explore All Blog Publications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
