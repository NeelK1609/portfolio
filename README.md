# Neel Kakadiya · Portfolio

A scroll-driven 3D portfolio built with React, React Three Fiber, drei and Vite. As you scroll, the camera flies through a scene with a different 3D object for each section.

**Live:** https://neelk1609.github.io/portfolio/

## Develop

```bash
npm install
npm run dev
```

## Edit content

All text (bio, experience, projects, skills, links) lives in [`src/content.ts`](src/content.ts).
The 3D scene and per-section objects are in [`src/components/Scene.tsx`](src/components/Scene.tsx).

## Deploy

Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
In the repo settings, set **Pages → Source** to **GitHub Actions**.
