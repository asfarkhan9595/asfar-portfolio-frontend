import { motion } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';

export default function Preloader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center max-w-sm">
        {/* Animated Logo Ring */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-emerald-400 opacity-75 blur-md animate-pulse" />
          <div className="relative w-full h-full rounded-2xl bg-slate-900 border border-white/15 flex items-center justify-center shadow-2xl">
            <Code className="w-9 h-9 text-cyan-400 animate-bounce" />
          </div>
        </div>

        {/* Branding & Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center justify-center gap-2">
            <span>Asfar Khan</span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono tracking-wider">
            Initializing Portfolio Systems...
          </p>
        </div>

        {/* Animated Gradient Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
