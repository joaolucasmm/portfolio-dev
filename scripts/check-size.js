// Fails when the built JavaScript or CSS grows past its budget (gzip sizes, as
// the browser downloads them). Run after `npm run build`: `npm run size`.
// Raise a budget on purpose, in the same change that needs it.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const budgets = {
    // About 30% above the build in November 2026 (70 kB of JS, 11 kB of CSS).
    js: 90 * 1024,
    css: 15 * 1024,
};

const root = path.join(__dirname, "..", "build", "static");
let failed = false;

for (const [type, budget] of Object.entries(budgets)) {
    const dir = path.join(root, type);
    if (!fs.existsSync(dir)) {
        console.error(`No build/static/${type}. Run npm run build first.`);
        process.exit(1);
    }
    const files = fs.readdirSync(dir).filter((f) => f.endsWith("." + type));
    const total = files.reduce((sum, f) => sum + zlib.gzipSync(fs.readFileSync(path.join(dir, f))).length, 0);
    const kb = (n) => (n / 1024).toFixed(1) + " kB";
    const over = total > budget;
    failed = failed || over;
    console.log(`${over ? "✗" : "✓"} ${type}: ${kb(total)} of ${kb(budget)} (gzip, ${files.length} files)`);
}

if (failed) {
    console.error("Over budget. Look for a heavy import, or raise the budget in scripts/check-size.js if it is worth it.");
    process.exit(1);
}
