// Serves build/ at /portfolio-dev/, the path GitHub Pages uses, so the
// production build runs locally as published. Used by Playwright and Lighthouse.
// Usage: node scripts/serve-build.js [port]
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.argv[2]) || 4317;
const base = "/portfolio-dev";
const root = path.join(__dirname, "..", "build");

const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".ttf": "font/ttf",
    ".woff2": "font/woff2",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".map": "application/json",
};

http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    if (url === "/" || url === base) {
        res.writeHead(302, { Location: base + "/" });
        return res.end();
    }
    if (!url.startsWith(base + "/")) {
        res.writeHead(404);
        return res.end("Not found");
    }
    let file = path.normalize(path.join(root, url.slice(base.length)));
    if (!file.startsWith(root)) {
        res.writeHead(403);
        return res.end();
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not found");
        }
        res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
        res.end(data);
    });
}).listen(port, () => console.log(`Serving build/ at http://localhost:${port}${base}/`));
