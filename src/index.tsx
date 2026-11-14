import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { loadFonts } from "./fonts";
import App from "./App";

// The built page arrives already rendered (scripts/prerender.mjs) and is hydrated;
// the dev server serves an empty #root, which is rendered from scratch.
const root = document.getElementById("root")!;
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
loadFonts();
