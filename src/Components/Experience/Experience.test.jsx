import { act, fireEvent, render, screen } from "@testing-library/react";
import content from "../../content";
import Experience from "./Experience";

const t = content.english.experience;

const selected = () => screen.getAllByRole("tab").findIndex((tab) => tab.getAttribute("aria-selected") === "true");

describe("Experience", () => {
    test("shows the first role, with one tab per role", () => {
        render(<Experience t={t} />);
        expect(screen.getAllByRole("tab")).toHaveLength(t.items.length);
        expect(selected()).toBe(0);
        expect(screen.getByRole("tabpanel")).toHaveTextContent(t.items[0].title);
    });

    test("clicking a role shows it", () => {
        render(<Experience t={t} />);
        fireEvent.click(screen.getAllByRole("tab")[2]);
        expect(selected()).toBe(2);
        expect(screen.getByRole("tabpanel")).toHaveTextContent(t.items[2].title);
        expect(screen.getByRole("tabpanel")).toHaveTextContent(t.items[2].place);
    });

    test("arrow keys move through the roles and wrap, Home and End jump", () => {
        render(<Experience t={t} />);
        const tabs = () => screen.getAllByRole("tab");
        fireEvent.keyDown(tabs()[0], { key: "ArrowDown" });
        expect(selected()).toBe(1);
        expect(tabs()[1]).toHaveFocus();
        fireEvent.keyDown(tabs()[1], { key: "End" });
        expect(selected()).toBe(t.items.length - 1);
        fireEvent.keyDown(tabs()[t.items.length - 1], { key: "ArrowDown" });
        expect(selected()).toBe(0);
        fireEvent.keyDown(tabs()[0], { key: "ArrowUp" });
        expect(selected()).toBe(t.items.length - 1);
    });

    test("only the chosen tab is in the tab order", () => {
        render(<Experience t={t} />);
        const order = screen.getAllByRole("tab").map((tab) => tab.tabIndex);
        expect(order.filter((i) => i === 0)).toHaveLength(1);
        expect(order[0]).toBe(0);
    });

    test("the search opens a role through portfolio:open-experience", () => {
        render(<Experience t={t} />);
        act(() => {
            window.dispatchEvent(new CustomEvent("portfolio:open-experience", { detail: 3 }));
        });
        expect(selected()).toBe(3);
    });

    test("dates and length read in the role's language", () => {
        const pt = content.portuguese.experience;
        render(<Experience t={pt} />);
        // A finished role shows a range and its length in months or years.
        const done = pt.items.findIndex((i) => i.dates[1]);
        fireEvent.click(screen.getAllByRole("tab")[done]);
        expect(screen.getByRole("tabpanel").querySelector(".experience__when").textContent).toMatch(
            new RegExp(pt.units.month.join("|") + "|" + pt.units.year.join("|"))
        );
    });
});
