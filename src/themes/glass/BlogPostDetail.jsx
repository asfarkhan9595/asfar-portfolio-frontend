import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Tag, Share2, Check, BookOpen, ExternalLink, List, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '../../components/Icons';
import Navbar from './Navbar';
import Footer from './Footer';

export default function GlassBlogPostDetail({ slug, posts, profile, settings, onNavigate, currentTheme, onThemeChange }) {
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
      fetch(`http://localhost:8000/api/v1/posts/${slug}`)
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute left-10 top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 -z-10 h-96 w-96 rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl" />

      <Navbar profile={profile} settings={settings} onNavigate={onNavigate} currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/20 backdrop-blur-md hover:border-cyan-500 text-xs font-semibold shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400 text-sm">Loading Article...</div>
        ) : !post ? (
          <div className="py-20 text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/15 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-6">The requested publication path could not be located.</p>
            <button onClick={() => onNavigate('/blog')} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg">
              Browse Articles
            </button>
          </div>
        ) : (
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  {post.category || 'Tech'}
                </span>
                {post.is_trending && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-slate-950" /> Trending
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  {publishedDate}
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                  {post.read_time || '5 min read'}
                </span>
                {post.views_count > 0 && (
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-cyan-500" />
                    {post.views_count} views
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{authorName}</div>
                    <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">{authorRole}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.source_url && (
                    <a
                      href={post.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold backdrop-blur-md hover:bg-cyan-500/20 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}

                  <button
                    onClick={handleShareTwitter}
                    className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-xs transition-colors"
                    title="Share on Twitter"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleShareLinkedin}
                    className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-xs transition-colors"
                    title="Share on LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 backdrop-blur-md text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
                    <span>{copied ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {post.cover_image && (
              <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-xl aspect-video shadow-md">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {post.excerpt && (
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 border-l-4 border-cyan-500 backdrop-blur-md text-slate-800 dark:text-slate-300 italic text-sm leading-relaxed shadow-sm">
                "{post.excerpt}"
              </div>
            )}

            {/* Table of Contents Box */}
            {headings.length > 0 && (
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/15 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  <List className="w-4 h-4" /> Table of Contents
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

            {/* Content Box */}
            <div className="rounded-3xl bg-white/80 dark:bg-slate-900/75 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap">
                {post.content}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs backdrop-blur-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Card */}
            <div className="rounded-3xl bg-white/80 dark:bg-slate-900/75 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg flex-shrink-0">
                {authorName.charAt(0)}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-widest">Author Profile</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{authorName}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{authorBio}</p>
              </div>
            </div>

            {/* Prev / Next Article Navigation Bar */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {prevPost ? (
                  <button
                    onClick={() => onNavigate(`/blog/${prevPost.slug}`)}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/75 border border-slate-200 dark:border-white/10 text-left hover:border-cyan-500 transition-all group backdrop-blur-xl"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Article
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-cyan-500">
                      {prevPost.title}
                    </h4>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => onNavigate(`/blog/${nextPost.slug}`)}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/75 border border-slate-200 dark:border-white/10 text-right hover:border-cyan-500 transition-all group backdrop-blur-xl"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-end gap-1">
                      Next Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-cyan-500">
                      {nextPost.title}
                    </h4>
                  </button>
                ) : <div />}
              </div>
            )}

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Read Next</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.slug}
                      onClick={() => onNavigate(`/blog/${rPost.slug}`)}
                      className="cursor-pointer rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-5 hover:border-cyan-500/40 transition-all shadow-sm group"
                    >
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase">{rPost.category || 'Tech'}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
