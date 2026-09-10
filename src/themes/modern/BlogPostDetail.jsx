import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Tag, Share2, Check, BookOpen, ExternalLink, List, Copy, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '../../components/Icons';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ModernBlogPostDetail({ slug, posts, profile, settings, onNavigate, currentTheme, onThemeChange }) {
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [codeCopiedIndex, setCodeCopiedIndex] = useState(null);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar profile={profile} settings={settings} onNavigate={onNavigate} currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">Loading Article...</div>
        ) : !post ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold">Article Not Found</h2>
            <p className="text-xs text-slate-500 mt-2 mb-6">The requested publication path could not be located.</p>
            <button onClick={() => onNavigate('/blog')} className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow">
              Browse Articles
            </button>
          </div>
        ) : (
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  {post.category || 'Tech'}
                </span>
                {post.is_trending && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-slate-950" /> Trending
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  {publishedDate}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time || '5 min read'}
                </span>
                {post.views_count > 0 && (
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Eye className="w-3.5 h-3.5 text-emerald-500" />
                    {post.views_count} views
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                    {authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{authorName}</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{authorRole}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.source_url && (
                    <a
                      href={post.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Source Link</span>
                    </a>
                  )}

                  <button
                    onClick={handleShareTwitter}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs transition-colors"
                    title="Share on Twitter"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleShareLinkedin}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs transition-colors"
                    title="Share on LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-emerald-500" />}
                    <span>{copied ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {post.cover_image && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 aspect-video shadow-md">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {post.excerpt && (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-slate-900 border-l-4 border-emerald-500 text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed">
                "{post.excerpt}"
              </div>
            )}

            {/* Table of Contents Box */}
            {headings.length > 0 && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <List className="w-4 h-4" /> Table of Contents
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-2">
                  {headings.map((item, idx) => (
                    <li key={idx} className={`${item.level === 3 ? 'pl-4' : 'font-semibold text-slate-800 dark:text-slate-200'}`}>
                      <a href={`#${item.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        • {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Article Content */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap">
                {post.content}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-500" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                {authorName.charAt(0)}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Written By</span>
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
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500 transition-all group"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Article
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-emerald-600">
                      {prevPost.title}
                    </h4>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => onNavigate(`/blog/${nextPost.slug}`)}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right hover:border-emerald-500 transition-all group"
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-end gap-1">
                      Next Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-emerald-600">
                      {nextPost.title}
                    </h4>
                  </button>
                ) : <div />}
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Read Next</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.slug}
                      onClick={() => onNavigate(`/blog/${rPost.slug}`)}
                      className="cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 hover:border-emerald-500 transition-all shadow-sm group"
                    >
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">{rPost.category || 'Tech'}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors line-clamp-2">
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
