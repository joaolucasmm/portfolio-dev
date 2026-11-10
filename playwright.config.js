// Smoke tests on the production build, served under /portfolio-dev as on GitHub Pages.
// Locally: npm run build && npm run e2e
const { defineConfig, devices } = require("@playwright/test");

const PORT = Number(process.env.E2E_PORT) || 4317;

module.exports = defineConfig({
    testDir: "e2e",
    timeout: 30_000,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
    use: {
        baseURL: `http://localhost:${PORT}/portfolio-dev/`,
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"] } },
        { name: "phone", use: { ...devices["Pixel 7"] } },
    ],
    webServer: {
        command: `node scripts/serve-build.js ${PORT}`,
        url: `http://localhost:${PORT}/portfolio-dev/`,
        reuseExistingServer: !process.env.CI,
    },
});
