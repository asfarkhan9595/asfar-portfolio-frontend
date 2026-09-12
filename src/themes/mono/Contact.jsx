import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Terminal } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export default function Contact({ profile, socialLinks, contactSettings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const email = profile?.email || contactSettings?.email || 'asfarkhan9595@gmail.com';
  const location = profile?.location || 'India';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: 'Network error. Please make sure backend API is reachable.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            // 05. CONTACT PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            Initialize Communication
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 ml-4 hidden sm:block"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
          
          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Availability Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>STATUS // Available for select projects</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Let's build together</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                  Have a Python backend API, AI workflow, or custom web extension project? Reach out directly via message or email.
                </p>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#151821] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT EMAIL</span>
                </div>
                <a href={`mailto:${email}`} className="text-xs text-slate-200 hover:text-cyan-400 transition-colors block truncate">
                  {email}
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#151821] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs text-violet-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>LOCATION</span>
                </div>
                <div className="text-xs text-slate-200">{location}</div>
              </div>

            </div>
          </motion.div>

          {/* Right Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-[#0F1117] dark:bg-[#0F1117] bg-white border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-xl">
              
              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Message dispatched successfully! I will respond shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">// YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#151821] dark:bg-[#151821] bg-slate-50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">// EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#151821] dark:bg-[#151821] bg-slate-50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">// SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Microservice Request"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151821] dark:bg-[#151821] bg-slate-50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">// MESSAGE DETAILS</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, tech stack, or timeline..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151821] dark:bg-[#151821] bg-slate-50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-violet-400 hover:from-cyan-300 hover:to-violet-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {status.loading ? (
                    <span>DISPATCHING MESSAGE...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH MESSAGE</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
