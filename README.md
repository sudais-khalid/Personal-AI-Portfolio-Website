# sudaiskhalid.com

Personal portfolio site for Sudais Khalid, AI & ML Engineer and speaker.

## Structure

```text
index.html           Home
work.html            /work        - selected projects
vibe-ship.html       /vibe-ship   - vibe-ship case study (/lumen redirects here)
prodpilot.html       /prodpilot   - ProdPilot case study (Final Year Project)
facefind.html        /facefind    - FaceFind case study
notesync.html        /notesync    - NoteSync case study
speaking.html        /speaking    - talks, seminars, workshops
principles.html      /principles  - how he works
about.html           /about       - story, values, people
404.html             custom not-found page
robots.txt           crawl rules, including AI search and assistant crawlers
sitemap.xml          all pages, with image entries
llms.txt             plain-text summary of the person and projects for LLMs
site.webmanifest
vercel.json          clean URLs, redirects, caching headers
assets/
  css/main.css
  js/                webflow runtime, gsap, lenis, barba, app.js
  images/            includes og-*.jpg social cards per page
  fonts/
server.js            local-only static server for `npm run dev`
```

## Local development

```sh
npm run dev
```

Serves the site at `http://localhost:5173` with the same clean-URL behavior
(`/work` → `work.html`, etc.) and redirects that Vercel uses in production, so
what you see locally matches what ships.

## SEO and structured data

Every page carries a JSON-LD `@graph` with the same `Person`
(`https://sudaiskhalid.com/#person`), `WebSite`, and organization nodes, plus
the page's own entity (`ProfilePage`, `SoftwareSourceCode`, `Service`, ...).
Keep facts in the JSON-LD, the visible copy, and `llms.txt` in sync when
something changes, and bump `lastmod` in `sitemap.xml`.

## Deployment

Push to GitHub and import the repo in Vercel. No build step: it's a static
site, and `vercel.json` sets `"cleanUrls": true` so every page resolves to its
`.html` file automatically.

Point the `sudaiskhalid.com` domain at the Vercel project once deployed, since
canonical URLs, Open Graph tags, and the sitemap are hard-coded to that
domain.
