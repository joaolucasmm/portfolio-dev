// @vitest-environment node
// The build renders the page outside the browser (scripts/prerender.mjs). Anything
// that reads window, document or navigator while rendering breaks it; this test
// catches that before the build does.
import { render } from "./entry-server";

test("the page renders to HTML without a browser", () => {
    const html = render();
    expect(html).toContain('class="hero__name"');
    expect(html).toContain('id="experience"');
    expect(html).toContain('id="contact"');
});
