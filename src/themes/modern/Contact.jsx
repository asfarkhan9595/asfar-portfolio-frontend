import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import Button from '../../components/Button';
import { getSocialIcon } from '../../components/SocialLinks';
import { API_BASE_URL } from '../../config/api';

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
    <section id="contact" className="py-20 sm:py-24">
      <Container>
        <SectionHeading title="Let's build something useful." subtitle="Feel free to reach out for projects, job opportunities, or collaborations." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              I'm open to opportunities in Python development, AI automation, and backend engineering.
              If you have a project or role in mind, let's connect.
            </p>

            {contactSettings && (
              <div className="mb-6 flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                {contactSettings.availability && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {contactSettings.availability}
                  </span>
                )}
                {contactSettings.location && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 border border-slate-200 dark:border-slate-700">
                    📍 {contactSettings.location}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-3">
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
                      className="flex items-center gap-3 text-slate-600 transition-colors hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-500"
                    >
                      {getSocialIcon(link, "h-5 w-5")}
                      <span className="text-sm">{link.platform}</span>
                    </a>
                  );
                });
              })()}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center backdrop-blur-sm">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
                <p className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Thank you for reaching out. Your message has been sent to Asfar Khan and saved in the inbox.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 inline-flex items-center px-4 py-2 text-sm font-semibold text-emerald-500 hover:text-emerald-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {apiError && (
                  <div className="flex items-center gap-2 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
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
                    className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-600 ${
                      errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
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
                    className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-600 ${
                      errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
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
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-600"
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
                    rows={5}
                    className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-600 ${
                      errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <Button type="submit" variant="primary" icon={Send} size="lg" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

