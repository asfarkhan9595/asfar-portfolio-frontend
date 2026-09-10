import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Tag, Share2, Check, BookOpen, ExternalLink, List, ChevronLeft, ChevronRight, Flame, Terminal } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '../../components/Icons';
import { API_BASE_URL } from '../../config/api';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MonoBlogPostDetail({ slug, posts, profile, settings, onNavigate, currentTheme, onThemeChange }) {
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const found = posts?.find(p => p.slug === slug);
    if (found) {
      setPost(found);
      setLoading(false);
    } else {
      fetch(`${API_BASE_URL}/posts/${slug}`)
        .then(res => res.json())
        .then(resData => {
          if (resData.success && resData.data) {
            setPost(resData.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug, posts]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || 'Check out this article!');
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
  };

  const handleShareLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  // Prev / Next Navigation
  const prevPost = post?.prev_post || (posts && post ? posts[posts.findIndex(p => p.slug === post.slug) - 1] : null);
  const nextPost = post?.next_post || (posts && post ? posts[posts.findIndex(p => p.slug === post.slug) + 1] : null);

  const relatedPosts = posts
    ? posts.filter(p => p.slug !== slug).slice(0, 2)
    : [];

  // Extract Table of Contents from headings
  const headings = (post?.content || '').match(/^#{2,3}\s+(.+)$/gm)?.map(h => {
    const level = h.startsWith('###') ? 3 : 2;
    const text = h.replace(/^#{2,3}\s+/, '').trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return { level, text, id };
  }) || [];

  const authorName = profile?.name || settings?.site_name || 'Asfar Khan';
  const authorRole = profile?.primary_role || 'Python & AI Automation Specialist';
  const authorBio = profile?.bio || profile?.about || 'Building high-performance backend APIs, full-stack web applications, custom Chrome extensions, and intelligent AI automation systems.';

  const publishedDate = post?.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently Published';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-slate-100 font-mono flex flex-col transition-colors duration-300">
      <Navbar profile={profile} settings={settings} onNavigate={onNavigate} currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#0F1117] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-500 text-xs font-semibold transition-all shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to All Articles</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400 text-sm">
            <Terminal className="w-8 h-8 text-cyan-500 dark:text-cyan-400 mx-auto mb-3 animate-pulse" />
            <span>Loading Article Specification...</span>
          </div>
        ) : !post ? (
          <div className="py-20 text-center bg-white dark:bg-[#0F1117] rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-6">The requested publication path could not be located.</p>
            <button
              onClick={() => onNavigate('/blog')}
              className="px-6 py-2.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-bold"
            >
              Browse Articles
            </button>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Article Header Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase">
                  {post.category || 'Tech'}
                </span>
                {post.is_trending && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 font-mono">
                    <Flame className="w-3.5 h-3.5 fill-slate-950" /> TRENDING
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  {publishedDate}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                  <Clock className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                  {post.read_time || '5 min read'}
                </span>
                {post.views_count > 0 && (
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Eye className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    {post.views_count} views
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {post.title}
              </h1>

              {/* Author Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#151821] border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    {authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{authorName}</div>
                    <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">{authorRole}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.source_url && (
                    <a
                      href={post.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}

                  <button
                    onClick={handleShareTwitter}
                    className="p-2 rounded-full bg-slate-100 dark:bg-[#151821] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-xs transition-colors"
                    title="Share on Twitter"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleShareLinkedin}
                    className="p-2 rounded-full bg-slate-100 dark:bg-[#151821] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-xs transition-colors"
                    title="Share on LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#151821] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-xs transition-colors"
                    title="Share article link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
                    <span>{copied ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#151821] shadow-xl aspect-video">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Excerpt Callout */}
            {post.excerpt && (
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#0F1117] border-l-4 border-cyan-500 text-slate-800 dark:text-slate-300 font-sans italic text-sm sm:text-base leading-relaxed shadow-sm">
                "{post.excerpt}"
              </div>
            )}

            {/* Table of Contents Box */}
            {headings.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 shadow-sm space-y-3 font-mono">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  <List className="w-4 h-4" /> // TABLE OF CONTENTS
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-2">
                  {headings.map((item, idx) => (
                    <li key={idx} className={`${item.level === 3 ? 'pl-4' : 'font-semibold text-slate-800 dark:text-slate-200'}`}>
                      <a href={`#${item.id}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        • {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Main Body */}
            <div className="rounded-3xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Tags Footer */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-[#151821] text-cyan-600 dark:text-cyan-400 text-xs font-mono border border-slate-200 dark:border-cyan-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Bio Box */}
            <div className="rounded-3xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-cyan-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#151821] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/30 flex items-center justify-center font-bold text-xl flex-shrink-0">
                {authorName.charAt(0)}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-widest">// AUTHOR PROFILE</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{authorName}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">{authorBio}</p>
              </div>
            </div>

            {/* Prev / Next Article Navigation Bar */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono">
                {prevPost ? (
                  <button
                    onClick={() => onNavigate(`/blog/${prevPost.slug}`)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 text-left hover:border-cyan-500 transition-all group shadow-sm"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> PREVIOUS ARTICLE
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-cyan-500">
                      {prevPost.title}
                    </h4>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => onNavigate(`/blog/${nextPost.slug}`)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 text-right hover:border-cyan-500 transition-all group shadow-sm"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-end gap-1">
                      NEXT ARTICLE <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-cyan-500">
                      {nextPost.title}
                    </h4>
                  </button>
                ) : <div />}
              </div>
            )}

            {/* Read Next Section */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                    // READ NEXT
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">Related Engineering Articles</h3>
                  <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.slug}
                      onClick={() => onNavigate(`/blog/${rPost.slug}`)}
                      className="cursor-pointer rounded-2xl bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 p-5 hover:border-cyan-500/40 transition-all group flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase">{rPost.category || 'Tech'}</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {rPost.title}
                        </h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                        <span>Read Article</span>
                        <span>→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.article>
        )}
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
