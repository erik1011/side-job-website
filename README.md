# PhotoStudio 官网

基于 Astro + Tailwind CSS + GSAP 构建的现代化双语静态网站。

## 功能特性

- 中英文双语切换（`/`` 中文，`/en/` 英文）
- 高端深色 SaaS 视觉风格
- 首页 GSAP 动画（入场动画、滚动揭示、数字计数、粒子背景）
- GitHub Pages 自动部署

## 页面路由

| 页面 | 中文 | 英文 |
|------|------|------|
| 首页 | `/` | `/en/` |
| 关于我们 | `/about` | `/en/about` |
| AI 生图 | `/ai-image-generator` | `/en/ai-image-generator` |
| 博客 | `/blog` | `/en/blog` |

## 本地开发

```bash
cd source
npm install
npm run dev
```

访问 http://localhost:4321/official-website/

## 构建

```bash
npm run build
npm run preview
```

## 品牌定制

修改 `src/config/site.ts` 即可更换品牌名、Logo、描述等：

```ts
export const siteConfig = {
  name: 'YourBrand',
  logo: '/images/logo.svg',
  // ...
};
```

## GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings → Pages 中，Source 选择 **GitHub Actions**
3. 修改 `astro.config.mjs` 中的 `site` 和 `base`：

```js
site: 'https://<username>.github.io',
base: '/<repo-name>/',  // user.github.io 仓库则设为 '/'
```

4. 推送至 `main` 分支后自动部署

## 技术栈

- [Astro 4](https://astro.build) — 静态站点生成
- [Tailwind CSS 3](https://tailwindcss.com) — 样式
- [GSAP](https://gsap.com) — 动画
- GitHub Actions — CI/CD 部署
