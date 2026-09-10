import Container from '../../components/Container';
import { getSocialIcon } from '../../components/SocialLinks';

export default function Footer({ profile, settings, socialLinks = [] }) {
  return (
    <footer className="relative border-t border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 py-8 backdrop-blur-xl">
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-900 dark:text-white">{profile?.name || settings?.site_name || 'Asfar Khan'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {profile?.tagline || 'Python • AI • Backend • Automation'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              if (!link.url || link.url === '#') return null;
              const isMail = link.url.startsWith('mailto:');
              return (
                <a
                  key={link.id || link.platform}
                  href={link.url}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-white/60 dark:border-white/10 backdrop-blur-md transition-all hover:scale-110 hover:text-cyan-500 dark:hover:text-cyan-400"
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {getSocialIcon(link, "h-4 w-4")}
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Asfar Khan. All rights reserved. • Built with Glassmorphism System
        </div>
      </Container>
    </footer>
  );
}

