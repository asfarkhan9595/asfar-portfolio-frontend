import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, Newspaper, BookOpen, Flame, ExternalLink, Sparkles, Star, X } from 'lucide-react';
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

export default function ModernBlogPage({ posts, profile, settings, onNavigate, currentTheme, onThemeChange }) {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar profile={profile} settings={settings} onNavigate={onNavigate} currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:text-emerald-600 text-xs font-semibold shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            {posts?.length || 0} Articles Published
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-300/60 dark:border-emerald-800/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Tech & AI Knowledge Platform
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Insights & Articles
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical tutorials, AI tool benchmarks, developer productivity guides, and architectural notes.
          </p>
        </div>

        {/* Sleek Redesigned Search & Category Filter Section */}
        <div className="mb-10 space-y-5">
          {/* Sleek Floating Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, AI tool, or keyword..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
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

          {/* Clean Flex-Wrapped Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-1">
            {STANDARD_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Top Banner (When All selected and no search) */}
        {featuredPost && selectedCategory === 'All' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
            className="mb-10 group cursor-pointer rounded-3xl bg-gradient-to-r from-emerald-900/90 via-slate-900 to-slate-950 p-6 sm:p-8 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Star className="w-64 h-64 text-emerald-400" />
            </div>

            {featuredPost.cover_image && (
              <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                <img src={featuredPost.cover_image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}

            <div className="w-full md:w-1/2 space-y-3 z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" /> Featured Article
                </span>
                {featuredPost.is_trending && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> Trending
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                {featuredPost.title}
              </h2>

              {featuredPost.excerpt && (
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              )}

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>Read Full Featured Story →</span>
                <span className="text-slate-400 text-[11px]">{featuredPost.read_time || '6 min read'}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <Newspaper className="w-10 h-10" />
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-700">
                          {post.category || 'Tech'}
                        </span>
                        {post.is_trending && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-slate-950" /> Trending
                          </span>
                        )}
                      </div>

                      {post.source_url && (
                        <a
                          href={post.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur shadow transition-colors"
                          title="External Reference Source"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                          {publishedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {post.read_time || '5 min read'}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold">No Matching Articles Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another category or refining your search term.</p>
          </div>
        )}

      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
