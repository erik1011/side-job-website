export const siteConfig = {
  name: 'PhotoStudio',
  logo: '/images/logo.png',
  description: {
    zh: '一站式在线照片编辑与 AI 创作平台，让每个人都能轻松创作精美视觉作品。',
    en: 'All-in-one online photo editing and AI creation platform for stunning visuals.',
  },
  url: 'https://your-username.github.io/official-website',
  social: {
    twitter: '',
    github: '',
    instagram: '',
  },
  cta: {
    zh: '立即开始创作',
    en: 'Get Started',
  },
} as const;

export type SiteConfig = typeof siteConfig;
