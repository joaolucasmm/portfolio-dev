import { act, fireEvent, render, screen } from "@testing-library/react";
import content from "../../content";
import Search from "./Search";

const t = content.english;

function renderSearch(props = {}) {
    const setOpen = jest.fn();
    const utils = render(
        <Search
            t={t}
            open
            setOpen={setOpen}
            toggleTheme={jest.fn()}
            language="english"
            setLanguage={jest.fn()}
            {...props}
        />
    );
    return { ...utils, setOpen, input: screen.getByRole("combobox") };
}

const options = () => screen.queryAllByRole("option").map((o) => o.querySelector(".search__title").textContent);

beforeAll(() => {
    // jsdom has no layout, so nothing scrolls.
    Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => jest.useRealTimers());

describe("Search", () => {
    test("while empty, lists the actions and the sections", () => {
        renderSearch();
        const shown = options();
        expect(shown).toContain(t.search.actions.theme[0]);
        expect(shown).toContain(t.nav.experience);
        expect(shown).toContain(t.nav.work);
    });

    test("finds a project by name and marks the match", () => {
        renderSearch();
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "pokedex" } });
        expect(options()).toContain("Pokedex");
        expect(screen.getByRole("listbox").querySelector("mark")).toHaveTextContent(/pokedex/i);
    });

    test("finds roles through the tools they used", () => {
        renderSearch();
        const tool = t.experience.items[0].tools.split(", ")[0];
        fireEvent.change(screen.getByRole("combobox"), { target: { value: tool } });
        expect(options().length).toBeGreaterThan(0);
    });

    test("says so when nothing matches", () => {
        renderSearch();
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "zzqqxx" } });
        expect(options()).toEqual([]);
        expect(screen.getByText(t.search.empty)).toBeInTheDocument();
    });

    test("Enter on a project closes the search and opens that project", () => {
        jest.useFakeTimers();
        const target = document.createElement("li");
        const index = t.work.items.findIndex((p) => p.name === "Pokedex");
        target.id = "project-" + index;
        document.body.appendChild(target);
        const opened = jest.fn();
        window.addEventListener("portfolio:open-project", opened);

        const { setOpen, input } = renderSearch();
        fireEvent.change(input, { target: { value: "pokedex" } });
        // The first result row is the project (no action matches the word).
        fireEvent.keyDown(input, { key: "Enter" });
        expect(setOpen).toHaveBeenCalledWith(false);
        act(() => jest.runAllTimers());
        expect(opened).toHaveBeenCalledTimes(1);
        expect(opened.mock.calls[0][0].detail).toBe(index);

        window.removeEventListener("portfolio:open-project", opened);
        target.remove();
    });

    test("the arrows move the active row and wrap", () => {
        const { input } = renderSearch();
        const active = () => screen.getAllByRole("option").findIndex((o) => o.getAttribute("aria-selected") === "true");
        expect(active()).toBe(0);
        fireEvent.keyDown(input, { key: "ArrowDown" });
        expect(active()).toBe(1);
        fireEvent.keyDown(input, { key: "ArrowUp" });
        fireEvent.keyDown(input, { key: "ArrowUp" });
        expect(active()).toBe(screen.getAllByRole("option").length - 1);
    });

    test("Escape closes it", () => {
        const { setOpen } = renderSearch();
        fireEvent.keyDown(window, { key: "Escape" });
        expect(setOpen).toHaveBeenCalledWith(false);
    });
});
