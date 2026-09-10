export default function Footer({ profile, settings }) {
  const currentYear = new Date().getFullYear();
  const name = profile?.name || settings?.site_name || 'Portfolio';

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-white/10 relative font-mono">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>© {currentYear} {name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
              PORTFOLIO // MONO TECH UI
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
