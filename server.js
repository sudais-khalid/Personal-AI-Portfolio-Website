// Local static file server for previewing the site the same way Vercel will
// serve it in production (see vercel.json: "cleanUrls": true). Not used in
// deployment — Vercel serves the static files directly.
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT = __dirname;
const PORT = process.env.PORT || 5173;

const REDIRECTS = {
    "/lumen": "/vibe-ship",
};

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".otf": "font/otf",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".txt": "text/plain; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
};

function send(res, status, body, headers) {
    res.writeHead(status, headers);
    res.end(body);
}

function safeJoin(root, pathname) {
    const filePath = path.normalize(path.join(root, pathname));
    if (filePath !== root && !filePath.startsWith(root + path.sep)) return null;
    return filePath;
}

function tryReadFile(filePath) {
    return new Promise((resolve) => {
        fs.readFile(filePath, (err, data) => resolve(err ? null : data));
    });
}

const server = http.createServer(async (req, res) => {
    let pathname = decodeURIComponent(url.parse(req.url).pathname);
    if (pathname === "/") pathname = "/index.html";

    // Mirrors vercel.json "redirects".
    if (REDIRECTS[pathname]) {
        return send(res, 301, "", { Location: REDIRECTS[pathname] });
    }

    const direct = safeJoin(ROOT, pathname);
    if (!direct) return send(res, 403, "Forbidden");

    // 1. Exact file match (assets, images, robots.txt, sitemap.xml, ...).
    let data = await tryReadFile(direct);
    let filePath = direct;

    // 2. Clean URLs: /work -> work.html (mirrors vercel.json's "cleanUrls": true).
    if (!data && !path.extname(direct)) {
        const withHtml = direct + ".html";
        data = await tryReadFile(withHtml);
        if (data) filePath = withHtml;
    }

    // 3. Fall back to a branded 404 page.
    if (!data) {
        const notFound = safeJoin(ROOT, "/404.html");
        data = notFound ? await tryReadFile(notFound) : null;
        if (data) {
            return send(res, 404, data, { "Content-Type": "text/html; charset=utf-8" });
        }
        return send(res, 404, "Not found: " + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { "Content-Type": MIME[ext] || "application/octet-stream" });
});

server.listen(PORT, () => {
    console.log(`sudaiskhalid.com (local preview) running at http://localhost:${PORT}/`);
});
