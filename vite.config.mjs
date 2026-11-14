import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves each repository under its own name: this one at
// /portfolio-dev/, production (joaolucasmm/portfolio, which builds this same
// code) at /portfolio/. In GitHub Actions the name comes from the repository
// being built; locally it is the preview's.
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "portfolio-dev";

export default defineConfig({
    base: `/${repository}/`,
    plugins: [react()],
    // The EmailJS keys keep the names the Actions secrets already have.
    envPrefix: ["VITE_", "REACT_APP_"],
    build: {
        // Where Pages, Playwright, Lighthouse and the size check look for the site.
        outDir: "build",
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "src/setupTests.js",
        // An axe run over the whole page takes about 2 s, more on a cold first run.
        testTimeout: 15_000,
        include: ["src/**/*.test.{js,jsx}"],
        coverage: { include: ["src/**/*.{js,jsx}"] },
    },
});
