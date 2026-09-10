import { Mail, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, WhatsappIcon } from './Icons';

export function getSocialIcon(link, iconSize = 'h-5 w-5') {
  const key = (link.icon || link.platform || '').toLowerCase();
  if (key.includes('github')) return <GithubIcon className={iconSize} />;
  if (key.includes('linkedin')) return <LinkedinIcon className={iconSize} />;
  if (key.includes('twitter') || key.includes('x')) return <TwitterIcon className={iconSize} />;
  if (key.includes('youtube')) return <YoutubeIcon className={iconSize} />;
  if (key.includes('whatsapp') || key.includes('wa.me')) return <WhatsappIcon className={iconSize} />;
  if (key.includes('mail') || key.includes('email')) return <Mail className={iconSize} />;
  if (key.includes('globe') || key.includes('website') || key.includes('site')) return <Globe className={iconSize} />;
  return <ExternalLink className={iconSize} />;
}

export default function SocialLinks({ socialLinks = [], className = '', iconSize = 'h-5 w-5' }) {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        if (!link.url || link.url === '#') return null;
        const isMail = link.url.startsWith('mailto:');
        return (
          <a
            key={link.id || link.platform}
            href={link.url}
            target={isMail ? undefined : '_blank'}
            rel={isMail ? undefined : 'noopener noreferrer'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:border-emerald-500 hover:text-emerald-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-500 dark:hover:text-emerald-500"
            aria-label={link.platform}
            title={link.platform}
          >
            {getSocialIcon(link, iconSize)}
          </a>
        );
      })}
    </div>
  );
}
