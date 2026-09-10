import Container from './Container';
import { getSocialIcon } from './SocialLinks';

export default function Footer({ profile, settings, socialLinks = [] }) {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-slate-900 dark:text-white">{profile?.name || settings?.site_name || 'Asfar Khan'}</p>
            <p className="text-sm text-slate-500">
              {profile?.tagline || 'Python • AI • Backend • Automation'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              if (!link.url || link.url === '#') return null;
              const isMail = link.url.startsWith('mailto:');
              return (
                <a
                  key={link.id || link.platform}
                  href={link.url}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-500"
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {getSocialIcon(link, "h-4 w-4")}
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Asfar Khan. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
