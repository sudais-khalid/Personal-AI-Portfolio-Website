# sudaiskhalid.com

Personal portfolio site for Sudais Khalid, AI & ML Engineer.

## Structure

```
index.html          Home
work.html            /work        - selected projects
lumen.html           /lumen       - vibe-ship case study
principles.html      /principles  - how he works
about.html           /about       - story, values, people
404.html             custom not-found page
robots.txt
sitemap.xml
vercel.json          clean URLs + caching headers
assets/
  css/main.css
  js/                webflow runtime, gsap, lenis, barba, app.js
  images/
  fonts/
server.js            local-only static server for `npm run dev`
```

## Local development

```
npm run dev
```

Serves the site at `http://localhost:5173` with the same clean-URL behavior
(`/work` → `work.html`, etc.) that Vercel uses in production, so what you see
locally matches what ships.

## Deployment

Push to GitHub and import the repo in Vercel. No build step: it's a static
site, and `vercel.json` sets `"cleanUrls": true` so `/work`, `/lumen`,
`/principles`, and `/about` resolve to their `.html` files automatically.

Point the `sudaiskhalid.com` domain at the Vercel project once deployed, since
canonical URLs, Open Graph tags, and the sitemap are hard-coded to that
domain.
