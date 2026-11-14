// Puts the page's HTML into build/index.html, so the first paint does not wait for
// the JavaScript. Runs after `vite build` and `vite build --ssr src/entry-server.tsx`
// (see the build script in package.json), then removes the server bundle.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const page = join(root, "build", "index.html");
const server = join(root, "build-ssr", "entry-server.mjs");

const { render } = await import(pathToFileURL(server).href);
const html = render();
const template = readFileSync(page, "utf8");
const empty = '<div id="root"></div>';
if (!template.includes(empty)) throw new Error("build/index.html has no empty #root to fill");

writeFileSync(page, template.replace(empty, `<div id="root">${html}</div>`));
rmSync(join(root, "build-ssr"), { recursive: true, force: true });
console.log(`Prerendered build/index.html (${(html.length / 1024).toFixed(1)} kB of HTML)`);
