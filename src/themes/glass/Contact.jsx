import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import { getSocialIcon } from '../../components/SocialLinks';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function Contact({ profile, socialLinks = [], contactSettings = null }) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setApiError(null);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const resData = await response.json();
        if (response.ok && resData.success) {
          setSubmitted(true);
        } else {
          setApiError(resData.message || 'Failed to send message. Please try again.');
        }
      } catch (err) {
        setApiError('Network error. Please check your connection and try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative">
      <div className="pointer-events-none absolute left-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-purple-600/10" />

      <Container>
        <SectionHeading title="Let's build something useful." subtitle="Feel free to reach out for projects, job opportunities, or collaborations." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-8 backdrop-blur-2xl shadow-xl shadow-blue-500/5 flex flex-col justify-between"
          >
            <div>
              <p className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                I'm open to opportunities in Python development, AI automation, and backend engineering.
                If you have a project or role in mind, let's connect.
              </p>

              {contactSettings && (
                <div className="mb-6 flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {contactSettings.availability && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-3 py-1.5 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25 backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      {contactSettings.availability}
                    </span>
                  )}
                  {contactSettings.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 dark:bg-white/5 px-3 py-1.5 border border-white/60 dark:border-white/10 backdrop-blur-md">
                      📍 {contactSettings.location}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/40 dark:border-white/10">
              {(() => {
                const activeItems = [];
                if (contactSettings) {
                  const { email, whatsapp, linkedin, github, twitter, visibility = {} } = contactSettings;
                  if (visibility.show_email !== false && email) {
                    activeItems.push({ id: 'cs-email', platform: 'Email', url: email.startsWith('mailto:') ? email : `mailto:${email}`, icon: 'mail' });
                  }
                  if (visibility.show_whatsapp !== false && whatsapp) {
                    const waUrl = whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`;
                    activeItems.push({ id: 'cs-wa', platform: 'WhatsApp', url: waUrl, icon: 'whatsapp' });
                  }
                  if (visibility.show_linkedin && linkedin) {
                    activeItems.push({ id: 'cs-linkedin', platform: 'LinkedIn', url: linkedin.startsWith('http') ? linkedin : `https://${linkedin}`, icon: 'linkedin' });
                  }
                  if (visibility.show_github && github) {
                    activeItems.push({ id: 'cs-github', platform: 'GitHub', url: github.startsWith('http') ? github : `https://${github}`, icon: 'github' });
                  }
                  if (visibility.show_twitter && twitter) {
                    activeItems.push({ id: 'cs-twitter', platform: 'X / Twitter', url: twitter.startsWith('http') ? twitter : `https://${twitter}`, icon: 'twitter' });
                  }
                } else {
                  socialLinks.forEach(link => {
                    if (link.url && link.url !== '#') activeItems.push(link);
                  });
                }

                return activeItems.map((link) => {
                  const isMail = link.url.startsWith('mailto:');
                  return (
                    <a
                      key={link.id || link.platform}
                      href={link.url}
                      target={isMail ? undefined : '_blank'}
                      rel={isMail ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400 p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/5"
                    >
                      {getSocialIcon(link, "h-5 w-5")}
                      <span className="text-sm font-medium">{link.platform}</span>
                    </a>
                  );
                });
              })()}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-8 backdrop-blur-2xl shadow-xl shadow-blue-500/5"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-cyan-400 mb-3" />
                <p className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Thank you for reaching out. Your message has been sent to Asfar Khan and saved in the inbox.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-500 hover:text-cyan-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {apiError && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{apiError}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500 backdrop-blur-md ${
                      errors.name ? 'border-red-500' : 'border-white/80 dark:border-white/10'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500 backdrop-blur-md ${
                      errors.email ? 'border-red-500' : 'border-white/80 dark:border-white/10'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500 backdrop-blur-md"
                    placeholder="Project / Job Opportunity / Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-slate-800/60 dark:text-white dark:placeholder:text-slate-500 backdrop-blur-md ${
                      errors.message ? 'border-red-500' : 'border-white/80 dark:border-white/10'
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-base shadow-lg shadow-blue-500/25 border border-white/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

