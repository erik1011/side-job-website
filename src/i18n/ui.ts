export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\/(en\/)?/, '/');
  if (lang === 'zh') return cleanPath === '/' ? '/' : cleanPath;
  return cleanPath === '/' ? '/en/' : `/en${cleanPath}`;
}

export function getAlternateLangPath(currentPath: string, currentLang: Lang): string {
  const targetLang: Lang = currentLang === 'zh' ? 'en' : 'zh';
  let path = currentPath;
  if (currentLang === 'en') {
    path = path.replace(/^\/en/, '') || '/';
  }
  return getLocalizedPath(path, targetLang);
}

export const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.ai', path: '/ai-image-generator' },
  { key: 'nav.blog', path: '/blog' },
] as const;
