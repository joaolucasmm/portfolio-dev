import content, { links, projectLinks } from "./content";

// Every path to a value in an object, arrays included by index:
// "nav.work", "work.items.0.name", …
function paths(value, prefix = "") {
    if (value === null || typeof value !== "object") return [prefix];
    return Object.keys(value).flatMap((key) => paths(value[key], prefix ? prefix + "." + key : key));
}

function valueAt(object, path) {
    return path.split(".").reduce((v, key) => v[key], object);
}

describe("content", () => {
    const { english, portuguese } = content;

    test("both languages have the same keys and list lengths", () => {
        const en = paths(english).sort();
        const pt = paths(portuguese).sort();
        expect(pt.filter((p) => !en.includes(p))).toEqual([]);
        expect(en.filter((p) => !pt.includes(p))).toEqual([]);
    });

    // Some texts are empty on purpose (a figure with no unit), so only a text empty in
    // one language and written in the other counts: that is a missing translation.
    test("no text is translated in one language and empty in the other", () => {
        const blank = (v) => v === "";
        const missing = paths(english).filter(
            (p) => blank(valueAt(english, p)) !== blank(valueAt(portuguese, p))
        );
        expect(missing).toEqual([]);
    });

    test("each value has the same type in both languages", () => {
        const differ = paths(english).filter((p) => typeof valueAt(english, p) !== typeof valueAt(portuguese, p));
        expect(differ).toEqual([]);
    });

    test("every project has its links, in the order of work.items", () => {
        expect(projectLinks).toHaveLength(english.work.items.length);
        projectLinks.forEach((link) => {
            expect(link.repo).toMatch(/^https:\/\//);
            expect(link.year).toMatch(/^\d{4}$/);
        });
        // A project that runs on the page needs its live address.
        projectLinks.filter((link) => link.run).forEach((link) => expect(link.url).toMatch(/^https:\/\//));
    });

    test("experience dates are months, each role ending after it starts", () => {
        const month = /^\d{4}-\d{2}$/;
        const wrong = Object.values(content)
            .flatMap((copy) => copy.experience.items)
            .filter(({ dates: [from, to] }) => !month.test(from) || (to !== null && (!month.test(to) || to < from)))
            .map((item) => item.title);
        expect(wrong).toEqual([]);
        // Stages and the gaps between roles follow the same rules, and stages sit inside their role.
        const ranges = Object.values(content).flatMap((copy) => [
            ...copy.experience.items.flatMap((item) =>
                (item.stages || []).map((stage) => ({ title: stage.title, dates: stage.dates, within: item.dates }))
            ),
            ...copy.experience.between.map((gap) => ({ title: gap.text, dates: gap.dates })),
        ]);
        const bad = ranges
            .filter(({ dates: [from, to], within }) =>
                !month.test(from) || !month.test(to) || to < from || (within && (from < within[0] || to > within[1]))
            )
            .map((r) => r.title);
        expect(bad).toEqual([]);
        // Both languages list the same roles on the same dates.
        expect(portuguese.experience.items.map((i) => i.dates)).toEqual(english.experience.items.map((i) => i.dates));
    });

    test("contact links are well formed", () => {
        expect(links.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
        expect(links.phoneHref).toMatch(/^tel:\+\d+$/);
        expect(links.github).toMatch(/^https:\/\/github\.com\//);
        expect(links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    });
});
