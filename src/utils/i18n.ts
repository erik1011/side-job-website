import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '../i18n/ui';
import zh from '../i18n/zh';
import en from '../i18n/en';
import { siteConfig } from '../config/site';

const translations = { zh, en } as const;

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getPageTitle(pageTitle: string, lang: Lang): string {
  return `${pageTitle} | ${siteConfig.name}`;
}

export function localizedUrl(path: string, lang: Lang): string {
  return getRelativeLocaleUrl(lang, path);
}

/** Strip base path and locale prefix, e.g. `/official-website/en/blog` → `/blog` */
export function getLocaleNeutralPath(pathname: string): string {
  let path = pathname;

  const base = import.meta.env.BASE_URL;
  const basePath = base.endsWith('/') ? base.slice(0, -1) : base;
  if (basePath && basePath !== '/' && path.startsWith(basePath)) {
    path = path.slice(basePath.length) || '/';
  }

  if (path === '/en' || path.startsWith('/en/')) {
    path = path.slice(3) || '/';
  }

  return path;
}
