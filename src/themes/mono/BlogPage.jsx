import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Eye, Tag, ArrowRight, ArrowLeft, Terminal, Newspaper, BookOpen, Flame, ExternalLink, Star, X } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const STANDARD_CATEGORIES = [
  'All',
  '🔥 Trending',
  'AI & GenAI',
  'AI Tools',
  'Developer Tools',
  'Apps & Software',
  'Tech Trends',
  'Web Development',
  'Programming',
  'Developer Productivity',
  'Tutorials & How-To',
  'Reviews & Comparisons',
  'Developer Career'
];

export default function MonoBlogPage({ posts, profile, settings, onNavigate, currentTheme, onThemeChange }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredPost = (posts || []).find(p => p.is_featured);

  const filteredPosts = (posts || []).filter(post => {
    let matchesCategory = true;
    if (selectedCategory === '🔥 Trending') {
      matchesCategory = Boolean(post.is_trending);
    } else if (selectedCategory !== 'All') {
      matchesCategory = (post.category || 'Tech') === selectedCategory;
    }

    const matchesSearch = search.trim() === '' ||
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-slate-100 font-mono flex flex-col transition-colors duration-300">
      <Navbar profile={profile} settings={settings} onNavigate={onNavigate} currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        
        {/* Top Navigation / Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#0F1117] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-500 text-xs font-semibold transition-all shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Portfolio</span>
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline-block">
            PUBLICATION // {posts?.length || 0} ARTICLES
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>TECH & AI DEVELOPER KNOWLEDGE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            Engineering Blog & Architecture Notes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-2xl mx-auto"
          >
            Daily insights on Python backend microservices, async architecture, custom web scrapers, AI agent workflows, and full-stack systems.
          </motion.p>
        </div>

        {/* Sleek Mono Search & Category Filter */}
        <div className="mb-10 space-y-5">
          {/* Terminal Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-cyan-500 dark:text-cyan-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="grep --search 'keywords, tags, categories'..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white dark:bg-[#0F1117] text-slate-900 dark:text-white text-xs sm:text-sm border border-slate-200 dark:border-white/10 shadow-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mono Category Pills Track */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-1">
            {STANDARD_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 shadow-sm font-bold scale-[1.02]'
                      : 'bg-white dark:bg-[#0F1117] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Banner (Mono Style) */}
        {featuredPost && selectedCategory === 'All' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
            className="mb-10 group cursor-pointer rounded-3xl bg-[#0F1117] p-6 sm:p-8 border border-cyan-500/30 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Star className="w-64 h-64 text-cyan-400" />
            </div>

            {featuredPost.cover_image && (
              <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-[#151821] flex-shrink-0 border border-white/10">
                <img src={featuredPost.cover_image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}

            <div className="w-full md:w-1/2 space-y-3 z-10">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 font-mono">
                  <Star className="w-3 h-3 fill-slate-950" /> FEATURED ARTICLE
                </span>
                {featuredPost.is_trending && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold flex items-center gap-1 font-mono">
                    <Flame className="w-3 h-3 text-amber-400" /> TRENDING
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                {featuredPost.title}
              </h2>

              {featuredPost.excerpt && (
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                  {featuredPost.excerpt}
                </p>
              )}

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-400 font-mono">
                <span>READ FEATURED STORY →</span>
                <span className="text-slate-400 text-[11px]">{featuredPost.read_time || '6 min read'}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, idx) => {
              const publishedDate = post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : 'Recently Published';

              return (
                <motion.article
                  key={post.id || post.slug || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer rounded-3xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/10">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-[#151821] text-slate-400 dark:text-slate-500">
                          <Newspaper className="w-8 h-8 text-cyan-500/40" />
                        </div>
                      )}

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-white/90 dark:bg-[#0F1117]/90 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold border border-slate-200 dark:border-cyan-500/30 backdrop-blur-md">
                          {post.category || 'Tech'}
                        </span>
                        {post.is_trending && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-mono text-[10px] font-bold shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-slate-950" /> TRENDING
                          </span>
                        )}
                      </div>

                      {post.source_url && (
                        <a
                          href={post.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 p-1.5 rounded-md bg-[#0F1117]/80 hover:bg-[#0F1117] text-white border border-white/10 backdrop-blur shadow transition-colors"
                          title="External Reference Source"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                          {publishedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-violet-500 dark:text-violet-400" />
                          {post.read_time || '5 min read'}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
                          {post.excerpt}
                        </p>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#151821] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/5 text-[10px]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read Article Button */}
                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-[#0F1117] rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
            <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Matching Articles</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search query or selected category filter.</p>
          </div>
        )}

      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
