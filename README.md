## Weather App (Vite + React)

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

### Install & Run
- Install deps:
  ```
  npm install
  ```
- Dev server:
  ```
  npm run dev
  ```
- Build:
  ```
  npm run build
  ```
- Preview production build:
  ```
  npm run preview
  ```

### Deploy (choose one)

1) Render (Static Site)
- Push this repo to GitHub/GitLab
- In Render: New → Static Site
  - Build Command: `npm install; npm run build`
  - Publish Directory: `dist`
  - Redirects/Rewrites: add `/*` → `/index.html` (Rewrite)
- Optional: Use `render.yaml` (Blueprint) in this repo to auto-configure

2) Vercel (CLI)
```
npm i -g vercel
vercel login
npm run build
vercel deploy dist --prod
```

3) Netlify (CLI)
```
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

4) GitHub Pages (gh-pages)
```
npm i -g gh-pages
npm run build
gh-pages -d dist
```
Note: If using a project subpath (e.g., USERNAME.github.io/REPO), set a base in `vite.config.ts`:
```ts
export default defineConfig({
  base: '/REPO_NAME/',
  plugins: [react()],
})
```

### Notes
- Static output is emitted to `dist/`
- SPA routing handled by a rewrite to `/index.html` (configure on your host)
- Image alt and meta set for `src/assets/weather-hero.jpg`

