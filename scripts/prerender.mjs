// Puts the page's HTML into build/index.html, so the first paint does not wait for
// the JavaScript. Runs after `vite build` and `vite build --ssr src/entry-server.tsx`
// (see the build script in package.json), then removes the server bundle.
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
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

// The faces of the first screen are preloaded, so they are usually there in time for
// font-display: optional (src/Assets/style/base/_fonts.scss): the name, the role,
// the text and the button. The monospace ones only label keys and may wait a visit.
const firstScreen = [
    "montserrat-latin-700-normal",
    "montserrat-latin-700-italic",
    "roboto-latin-400-normal",
    "roboto-latin-500-normal",
];
const assets = readdirSync(join(root, "build", "assets"));
const base = template.match(/<script type="module" crossorigin src="([^"]*)assets\//)?.[1];
if (base === undefined) throw new Error("build/index.html has no module script under assets/");
const preloads = firstScreen.map((face) => {
    const file = assets.find((name) => name.startsWith(`${face}-`) && name.endsWith(".woff2"));
    if (!file) throw new Error(`no ${face} font in build/assets`);
    return `<link rel="preload" href="${base}assets/${file}" as="font" type="font/woff2" crossorigin>`;
});

writeFileSync(
    page,
    template
        .replace("</head>", `${preloads.join("")}</head>`)
        .replace(empty, `<div id="root">${html}</div>`),
);
rmSync(join(root, "build-ssr"), { recursive: true, force: true });
console.log(`Prerendered build/index.html (${(html.length / 1024).toFixed(1)} kB of HTML)`);
