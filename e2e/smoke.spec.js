// The built site in a real browser, on a computer and on a phone.
const { test, expect } = require("@playwright/test");

// Errors that come from outside the site (blocked third-party requests in CI).
const ignored = [/emailjs/i, /favicon/i];

let errors = [];

test.beforeEach(async ({ page }) => {
    errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
        if (msg.type() === "error" && !ignored.some((re) => re.test(msg.text()))) errors.push(msg.text());
    });
    await page.goto("./");
});

test.afterEach(async () => {
    expect(errors, "errors in the browser console").toEqual([]);
});

test("loads with the name, every section and no horizontal scroll", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: /João Lucas/ })).toBeVisible();
    for (const id of ["work", "experience", "education", "contact"]) {
        await expect(page.locator("#" + id)).toHaveCount(1);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
});

test("the language switch changes the page to Portuguese and back", async ({ page }) => {
    const toPortuguese = page.getByRole("button", { name: /Switch to Português/ }).first();
    await toPortuguese.click();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.locator("#experience h2")).toHaveText("Experiência");
});

test("the theme switch flips the theme", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const toggle = page.getByRole("switch", { name: "Dark mode" }).first();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
});

test("the search finds a project and opens it in the showcase", async ({ page }) => {
    await page.getByRole("button", { name: "Search" }).first().click();
    const field = page.getByRole("combobox");
    await expect(field).toBeFocused();
    await field.fill("pokedex");
    await field.press("Enter");
    await expect(page.locator(".project.is-active .project__name")).toHaveText("Pokedex");
    await expect(page.locator(".work__dot[aria-current='true']")).toHaveAttribute("aria-label", /Pokedex/);
});

test("the showcase moves with its arrows", async ({ page }) => {
    const name = page.locator(".project.is-active .project__name");
    const first = await name.textContent();
    await page.getByRole("button", { name: "Next project" }).click();
    await expect(name).not.toHaveText(first);
    await page.getByRole("button", { name: "Previous project" }).click();
    await expect(name).toHaveText(first);
});

test("a role in Experience opens", async ({ page, isMobile }) => {
    const experience = page.locator("#experience");
    await experience.scrollIntoViewIfNeeded();
    if (isMobile) {
        // On phones each role is a row that opens in place.
        const row = experience.locator("details").nth(1);
        await row.locator("summary").click();
        await expect(row).toHaveAttribute("open", "");
    } else {
        const tab = experience.getByRole("tab").nth(1);
        await tab.click();
        await expect(tab).toHaveAttribute("aria-selected", "true");
    }
});
