import { Wrench, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenanceMode({ settings, profile }) {
  const adminEmail = settings?.admin_email || 'asfarkhan9595@gmail.com';
  const siteName = settings?.site_name || profile?.full_name || 'Portfolio';

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white px-4 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-pattern opacity-20" />
      <div className="gradient-orb animate-pulse-glow fixed -right-32 -top-32 -z-10 h-96 w-96 bg-amber-500/10" />
      <div className="gradient-orb animate-pulse-glow fixed -bottom-48 -left-48 -z-10 h-[500px] w-[500px] bg-red-500/10" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Maintenance Mode Active
        </div>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-lg shadow-amber-500/10">
          <Wrench className="w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
          {siteName}
        </h1>
        <h2 className="text-lg font-semibold text-amber-400 mb-4">
          Under Scheduled Maintenance
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          We are currently updating our systems and refining project showcases to serve you better. We will be back online shortly. Thank you for your patience!
        </p>

        {/* Direct Contact & Admin Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
          <a
            href={`mailto:${adminEmail}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            Contact Admin
          </a>

          <a
            href="http://localhost:8000/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            <ShieldAlert className="w-4 h-4" />
            Admin Dashboard
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

